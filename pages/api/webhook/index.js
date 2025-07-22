import createMollieClient from '@mollie/api-client';
import axios from 'axios';
import { query } from '/lib/Database';
import { orderConfirmation } from '/lib/MailTemplates';
import { sendMail } from '/lib/Mailing';

const handler = async (req, res) => {
  const payment_reference = req.body.id;

  return new Promise((resolve) => {
    try {
      const mollieClient = createMollieClient({
        apiKey: process.env.NEXT_PUBLIC_Test_API_key,
      });

      mollieClient.payments
        .get(payment_reference)
        .then(async (payment) => {
          if (payment.status == 'paid') {
            const str = payment.description.split(/(?<=^\S+)\s/);
            const orderId = str[0].replace('#', '');

            if (orderId) {
              const obj = await query(
                `SELECT * FROM orders WHERE order_id = ? AND status = ?`,
                [orderId, 'open']
              );

              if (obj.length == 0) {
                res
                  .status(500)
                  .json({ message: 'Failed to locate order in DB' });
                resolve();
              } else {
                const campaigns = obj[0].body.campaigns;

                campaigns.map((service) => {
                  service.total > 0 &&
                    service.campaigns.map((campaign) => {
                      campaign.id = '#' + orderId + '-' + campaign.id;
                    });
                });

                const orderObject = {
                  ...obj[0].body,
                  campaigns: campaigns,
                  tstamp: Math.floor(Date.now() / 1000),
                  order_id: orderId,
                  totalPriceDetails: {
                    ...obj[0].body.totalPriceDetails,
                    paymentReference: payment_reference,
                    molliePaymentObject: payment,
                  },
                };

                //Checking if coupon has been used
                if (orderObject.totalPriceDetails.coupons.length > 0) {
                  orderObject.totalPriceDetails.coupons.map((coupon) => {
                    query(
                      `UPDATE coupon_codes SET used = used +1 WHERE name = ?`,
                      [coupon.result.name]
                    );
                  });
                }

                //Updating DB entry with payment info
                const result = await query(
                  `UPDATE orders SET payment_reference = ?, status = ?, body = ? WHERE order_id = ?`,
                  [
                    payment_reference,
                    payment.status,
                    JSON.stringify(orderObject),
                    orderId,
                  ]
                );

                //Send Orderconfirmation
                const { contact_name, contact_email, body } = obj[0];
                const email = await orderConfirmation(
                  orderId,
                  contact_name,
                  body
                );

                const subject =
                  '🎉 Your DaimoonMedia Order Is Confirmed! - [#' +
                  orderId +
                  ']';
                //Customer email
                sendMail(email, contact_email, subject);

                //Daimoon copy email
                const DaimoonSubject =
                  '🎉 New order has been made - [#' + orderId + ']';
                sendMail(email, 'support@daimoon.media', DaimoonSubject);

                const config = {
                  headers: {
                    Authorization:
                      'Bearer ' + process.env.NEXT_PUBLIC_OMS_BEARER,
                  },
                };

                //Post to OMS
                const url =
                  process.env.NEXT_PUBLIC_OMS_API_URL + 'api/v1/campaigns';

                process.env.NEXT_PUBLIC_ENV != 'development' &&
                  (await axios.post(url, orderObject, config));

                //Klaviyo Track Placed Order Metric
                campaigns.map((service) => {
                  service.total > 0 &&
                    service.campaigns.map((campaign) => {
                      let value = 0;
                      campaign.campaignObject.campaign.map((item) => {
                        value = value + item.value.costEUR;
                      });

                      const options = {
                        method: 'POST',
                        headers: {
                          Accept: 'text/html',
                          'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                          data: `{"token": "${process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY}", "event": "Placed order", "customer_properties": {"$email": "${contact_email}", "$first_name": "${orderObject.customerDetails.fname}", "$last_name": "${orderObject.customerDetails.lname}", "$city": "${orderObject.customerDetails.city}","$region": "${orderObject.customerDetails.region}", "$country": "${orderObject.customerDetails.country.countryCode}", "$zip": "${orderObject.customerDetails.postal_code}"}, "properties": {"$event_id": "${campaign.id}","$value": "${value}","service": "${campaign.service}","genre1": "${campaign.campaignObject.genre.main}","genre2": "${campaign.campaignObject.genre.sub}"}}`,
                        }),
                      };

                      fetch('https://a.klaviyo.com/api/track', options);
                    });
                });
              }
              res.status(200).json('Succes!');
            }
            resolve();
          } else {
            res.status(200).json('payment has not been payed');
            resolve();
          }
        })
        .catch((error) => {
          res.status(200).json('error', error);
        });
    } catch (e) {
      res.status(200).json({ message: e.message });
      return resolve();
    }
  });
};

export default handler;
