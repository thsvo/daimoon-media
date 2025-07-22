const orderConfirmation = (order_id, contact_name, body) => {
  let orderString = '';
  const order = body;
  let currency = order.currency.code;
  let conversion = order.currency.conversionrate;
  let vat = order.totalPriceDetails.VAT == 1 ? '0%' : '21%';
  let totalCost = order.totalPriceDetails.amount_local_incl_vat;
  let orderNumber = '#' + order_id;
  const couponArray = order.totalPriceDetails.coupons;
  const personalDetails = order.customerDetails;
  let couponString = '';

  couponArray.length != 0 &&
    couponArray.map((coupon) => {
      couponString += `<tr>
      <td
    style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
    width="20">&nbsp;</td>
  <td
    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
    <p
      style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: left; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
      <b>${coupon.result.name}</b></p>
  </td>
  <td
    style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
    width="20">&nbsp;</td>
  <td
    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
    <p
      style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: right; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
      <b>- ${coupon.result.discount + ' ' + currency}</b></p>
  </td>
  <td
    style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
    width="20">&nbsp;</td>
</tr>`;
    });

  order.campaigns.map((service) => {
    service.campaigns.length != 0 &&
      service.campaigns.map((campaign) => {
        let campaignString = '';
        let campaignCost = 0;
        campaign.campaignObject.campaign.map((campaign) => {
          campaignCost += campaign.value.cost;
          let targetString = '';
          campaign.value.targets &&
            campaign.value.targets.map((target) => {
              targetString += `<tr>
              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                &nbsp;
              </td>
              <td style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;'>
                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                  <span>${target.text}</span>
                </p>
              </td>
              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                &nbsp;
              </td>
              <td style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;'>
                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                  ${Math.round(target.costExcl * conversion * 100) / 100}
                </p>
              </td>
              <td style="width: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
              </td>
              <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                  ${currency}
                </p>
              </td>
            </tr>`;
            });
          campaignString += `<tr>
            <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
            <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
              <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                ${campaign.label} - ${campaign.value.text}
              </p>
            </td>
            <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
            <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
              <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                 ${Math.round(campaign.value.cost * conversion * 100) / 100}
              </p>
            </td>
            <td style="width: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
            <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
              <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                 ${currency}
              </p>
            </td>
            <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
          </tr>
          ${
            campaign.value.targets &&
            campaign.value.targets.length != 0 &&
            `
          <tr>
            <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
            <td style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;'>
              <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                <span>Base campaign:</span>
              </p>
            </td>
            <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
            <td style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;'>
              <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                <span>${
                  Math.round(campaign.value.baseCostExcl * conversion * 100) /
                  100
                }</span>
              </p>
            </td>
            <td style="width: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
            <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
              <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                 ${currency}
              </p>
            </td>
          </tr>
          <tr>
            <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
            <td style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;'>
              <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                <span>Targets included:</span>
              </p>
            </td>
            <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
            <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
              &nbsp;
            </td>
          </tr>
          ${targetString}
          `
          }`;
        });

        let color =
          service.service == 'spotify'
            ? '#3cbb56'
            : service.service == 'soundcloud'
            ? '#FF5502'
            : service.service == 'youtube' && '#FF0000';
        orderString += `
        <tr>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
             <td colspan="3" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
          <fieldset style="border-color: ${color}">
            <legend style="text-transform: capitalize; color: ${color}">
              ${service.service}
            </legend>
            <table cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#242424" style="width: 100%;background: #242424;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
              <tr>
                <td colspan="3" style="height: 20px;mso-line-height-rule: exactly;line-height: 1px;font-size: 0px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" height="20">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                  &nbsp;
                </td>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                  <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 14px;text-align: left;color: #fff;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                   
        <b>
        ${
          campaign.campaignObject.artist[0] !== undefined
            ? campaign.campaignObject.artist[0].name + ' - '
            : ''
        } ${campaign.campaignObject.track}
          
        </b>

                  </p>
                </td>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                  &nbsp;
                </td>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt" width="20">
                  &nbsp;
                </td>
              </tr>

               ${
                 campaign.campaignObject.release &&
                 `
              <tr>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                  &nbsp;
                </td>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                  <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 14px;text-align: left;color: #fff;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                    <b>
                    ${campaign.campaignObject.release.text}
                    </b>
                  </p>
                </td>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                  &nbsp;
                </td>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt" width="20">
                  &nbsp;
                </td>
              </tr>
              `
               }
              <tr>
                <td colspan="3" style="height: 5px;mso-line-height-rule: exactly;line-height: 1px;font-size: 0px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" height="20">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                  &nbsp;
                </td>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                  <p style="font-style: 'italic';margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 14px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                    <b>${campaign.id}</b>
                  </p>
                </td>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                  &nbsp;
                </td>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt" width="20">
                  &nbsp;
                </td>
              </tr>
              <tr>
                <td colspan="3" style="height: 5px;mso-line-height-rule: exactly;line-height: 1px;font-size: 0px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" height="20">
                  &nbsp;
                </td>
              </tr>
              ${campaignString}
              <tr>
                <td colspan="3" style="height: 20px;mso-line-height-rule: exactly;line-height: 1px;font-size: 0px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" height="20">
                  &nbsp;
                </td>
              </tr>
              
              <tr>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                  &nbsp;
                </td>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                  &nbsp;
                </td>
                <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                  &nbsp;
                </td>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                  <p style="margin: 0px; font-family: 'Montserrat',sans-serif; font-size: 14px; text-align: right;color: #fff;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                    <b>${Math.round(campaignCost * conversion * 100) / 100}</b>
                  </p>
                </td>
                <td style=" width: 5px;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">
                   &nbsp;
                </td>
                <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                  <p style="margin: 0px; font-family: 'Montserrat',sans-serif; font-size: 14px; text-align: right;color: #fff;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                    <b>${currency}</b>
                  </p>
                </td>
              </tr>
              <tr>
                <td colspan="3" style="height: 20px; mso-line-height-rule: exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; " height="20">
        &nbsp;
                </td>
              </tr>
            </table>
          </fieldset>
        </td>
        <td
            style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
            width="20">&nbsp;</td>
        </tr>
              `;
      });
  });

  let emailString = `<!DOCTYPE html>
  <html lang="it">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="date=no">
    <meta name="format-detection" content="address=no">
    <meta name="format-detection" content="email=no">
    <meta name="color-scheme" content="only">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <title> </title>
    <style>
      body,
      table,
      td,
      a {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table {
        border-collapse: collapse;
      }
      table,
      td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
      }
      table {
        border-collapse: collapse !important;
      }
      body {
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      @media only screen and (max-width: 450px) {
        .break {
          width: 100% !important;
          text-align: center !important;
          display: block !important;
        }
      }
      @media only screen and (max-width: 600px) {
        .full_width {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body
    style="margin: 0px; padding: 0px; font-family: arial; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;"
    bgcolor="#fff">
    <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#fff"
      style="width: 100%; background: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
      <tr>
        <td
          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          <center>
            <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#000" align="center"
              style="margin: 0 auto; width: 600px; background: #000; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tr>
                <td
                  style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#000"
                    style="width: 600px; background: #000; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                    <tr>
                      <td
                        style="background: #000; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                        bgcolor="#000">
                        <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="#000"
                          style="width: 600px; background: #000; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tr>
                            <td
                              style="width: 40px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                              width="40">&nbsp;</td>
                            <td
                              style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="520"
                                bgcolor="#000"
                                style="width: 520px; background-repeat: no-repeat; background-position: top left; background-size: 300px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                <tr>
                                  <td
                                    style="height: 40px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="40">&nbsp;</td>
                                </tr>
                                <tr>
                                  
                                </tr>
                                <tr>
                                  <td
                                    style="height: 40px; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="40">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="20">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                    <p
                                      style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 30px; text-align: center; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                      <b>Congratulations!</b>
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="20">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                    <p
                                      style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 14px; text-align: left; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                      We’ve received your promotion and are getting started right away. Within 3 days, you’ll start receiving campaign updates via email and your personal dashboard will be updated at all times. While starting your campaign, consider reading into some of our free expert music marketing and industry articles & studies linked below.</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="20">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td align="center"
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="520"
                                      bgcolor="#000"
                                      style="width: 520px; background: #000; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td width="40"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <span
                                            style="height: 40px; width: 40px; border-radius: 50px; background: #b064ed; display: table-cell; color: #fff; text-align: center; vertical-align: middle;"><b>&#10003;</b></span>
                                        </td>
                                        <td align="center"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <span
                                            style="height: 2px; width: 100%; background: #ddd; display: block;">&nbsp;</span>
                                        </td>
                                        <td width="40"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <span
                                            style="height: 40px; width: 40px; border-radius: 50px; background: #000; border: 3px dashed #b064ed; display: inline-block; color: #fff; text-align: center; vertical-align: middle;"><b>&nbsp;</b></span>
                                        </td>
                                        <td align="center"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <span
                                            style="height: 2px; width: 100%; background: #ddd; display: block;">&nbsp;</span>
                                        </td>
                                        <td width="40"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <span
                                            style="height: 20px; width: 20px; border-radius: 50px; background: #fff; display: inline-block;">&nbsp;</span>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="20">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td align="center"
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="520"
                                      bgcolor="#000"
                                      style="width: 520px; background: #000; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: left; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            Received your <br /> campaign(s)</p>
                                        </td>
                                        <td align="center"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          &nbsp;
                                        </td>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: center; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                             Listening & taking first steps</p>
                                        </td>
                                        <td align="center"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          &nbsp;
                                        </td>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: right; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            Experience your music growth</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 40px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="40">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                    <p
                                      style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 20px; text-align: center; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                      <b>You’ll receive updates <br>in your Dashboard</b>
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="20">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td align="center"
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                    <center>
                                      <table cellpadding="0" cellspacing="0" bgcolor="#b064ed"
                                        style="background: #b064ed; border-radius: 30px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td colspan="3"
                                            style="height: 8px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            height="8">&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td
                                            style="width: 30px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="30">&nbsp;</td>
                                          <td
                                            style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                            <a href="https://daimoon.media/contact?key=customer&form=faq"
                                              style=" font-family: arial; font-size: 15px; color: #fff; text-decoration: none; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;"
                                              target="_blank"><b>Question? We’ll help you here.</b></a>
                                          </td>
                                          <td
                                            style="width: 30px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="30">&nbsp;</td>
                                        </tr>
                                        <tr>
                                          <td colspan="3"
                                            style="height: 8px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            height="8">&nbsp;</td>
                                        </tr>
                                      </table>
                                    </center>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 40px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="40">&nbsp;</td>
                                </tr>
                                
                                <tr>
                                  <td
                                    style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="20">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                    <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="520"
                                      bgcolor="#000"
                                      style="width: 520px; background: #000; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="20">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                    <p
                                      style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 14px; text-align: center; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                      We'll remind you of our new growth content every week 🎁</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 50px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="50">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                    <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="520"
                                      bgcolor="#242424"
                                      style="width: 520px; background: #242424; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td colspan="5"
                                          style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          height="20">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td colspan="3"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 30px; text-align: center; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>Your Order</b></p>
                                          <br>
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 15px; text-align: center; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>${orderNumber}</b></p>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td colspan="5"
                                          style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          height="20">&nbsp;</td>
                                      </tr>
                                       ${orderString}
                                      <tr>
                                        <td colspan="5"
                                          style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          height="20">&nbsp;</td>
                                      </tr>
                                      ${
                                        couponArray.length != 0 &&
                                        `<tr>
                                          <td
                                            style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="20">&nbsp;</td>
                                          <td
                                            style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                            <p
                                              style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: left; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                              <b>Discounts:</b></p>
                                          </td>
                                          <td
                                            style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="20">&nbsp;</td>
                                        </tr>`
                                      }
                                      ${couponString}
                                      <tr>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: left; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>VAT</b></p>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: right; color: #777; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>${vat}</b></p>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                      </tr>

                                      ${
                                        order.totalPriceDetails.discountInUSD >
                                          0 &&
                                        `
                                        <tr>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          
                                          
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 14px; text-align: left; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>Your discount 💸</b></p>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 14px; text-align: right; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>- ${
                                              Math.round(
                                                order.totalPriceDetails
                                                  .discountInUSD *
                                                  conversion *
                                                  100
                                              ) / 100
                                            }</b></p>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                      </tr>
                                      `
                                      }

                                      <tr>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          
                                          
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 14px; text-align: left; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>Total Investment</b></p>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 14px; text-align: right; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>${
                                              Math.round(
                                                totalCost * conversion * 100
                                              ) / 100
                                            }</b></p>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td colspan="5"
                                          style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          height="20">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td colspan="3"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 14px; text-align: center; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <a href="" style="color: #b064ed; text-decoration: none;"><b>Thank you for
                                                your order</b></a></p>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td colspan="5"
                                          style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          height="20">&nbsp;</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 25px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="50">&nbsp;</td>
                                </tr>


                                <tr>
                                  <td
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                    <table class="full_width" cellspacing="0" cellpadding="0" border="0" width="520"
                                      bgcolor="#242424"
                                      style="width: 520px; background: #242424; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td colspan="5"
                                          style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          height="20">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                        <td colspan="3"
                                          style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-line-height-rule:exactly;">
                                          <p
                                            style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 30px; text-align: center; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                            <b>Your details</b></p>
                                          <br>
                                        </td>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td colspan="5"
                                          style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          height="20">&nbsp;</td>
                                      </tr>

                                      <tr>
                                        <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                          <td colspan="3" style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                        <fieldset>

                                          <table cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="#242424" style="width: 100%;background: #242424;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;">
                                            <tr>
                                              <td colspan="3" style="height: 20px;mso-line-height-rule: exactly;line-height: 1px;font-size: 0px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" height="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>

                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt" width="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colspan="3" style="height: 20px;mso-line-height-rule: exactly;line-height: 1px;font-size: 0px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" height="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.fullname}
                                                </p>
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                 
                                                </p>
                                              </td>
                                              <td style="width: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.email}
                                                </p>
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.phone}
                                                </p>
                                              </td>
                                              <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                 
                                                </p>
                                              </td>
                                              
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.address}
                                                </p>
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.houseNumber}
                                                </p>
                                              </td>
                                              <td style="width: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.region}
                                                </p>
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.postal_code}
                                                </p>
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                 
                                                </p>
                                              </td>
                                              <td style="width: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.city}
                                                </p>
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: left;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                  ${personalDetails.country}
                                                </p>
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                 
                                                </p>
                                              </td>
                                              <td style="width: 5px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="width: 100px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                <p style="margin: 0px;font-family: 'Montserrat',  sans-serif;font-size: 12px;text-align: right;color: #777;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-line-height-rule: exactly;line-height: 1.5;">
                                                 
                                                </p>
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            
                                            
                                            
                                            <tr>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style="-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;mso-line-height-rule: exactly;">
                                                &nbsp;
                                              </td>
                                              <td style="width: 20px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                              <td style=" width: 5px;-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="20">
                                                &nbsp;
                                              </td>
                                            </tr>
                                            <tr>
                                              <td colspan="3" style="height: 20px; mso-line-height-rule: exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; " height="20">
                                      &nbsp;
                                              </td>
                                            </tr>
                                          </table>
                                        </fieldset>
                                      </td>
                                      <td
                                          style="width: 20px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          width="20">&nbsp;</td>
                                      </tr>
                                      
                                      <tr>
                                        <td colspan="5"
                                          style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                          height="20">&nbsp;</td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>

                                
                                <tr>
                                  <td
                                    style="height: 50px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="50">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td align="center"
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                    <center>
                                      <table cellspacing="0" cellpadding="0" align="center" border="0" bgcolor="#000"
                                        style="margin: 0 auto; background: #000; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tr>
                                          <td
                                            style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="25">
                                            <a href="http://facebook.com/"><img
                                                src="https://image.ibb.co/nR76Wd/facebook-circle.png" alt=""
                                                style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;"
                                                width="25" border="0"></a>
                                          </td>
                                          <td
                                            style="width: 8px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="8">&nbsp;</td>
                                          <td
                                            style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="25">
                                            <a href="http://twitter.com/"><img
                                                src="https://image.ibb.co/faf4HJ/twitter-circle1.png" alt=""
                                                style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;"
                                                width="25" border="0"></a>
                                          </td>
                                          <td
                                            style="width: 8px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="8">&nbsp;</td>
                                          <td
                                            style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="25">
                                            <a href="http://youtube.com/"><img
                                                src="https://i.ibb.co/bzdHGhw/youtubecircle.png" alt=""
                                                style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;"
                                                width="25" border="0"></a>
                                          </td>
                                          <td
                                            style="width: 8px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="8">&nbsp;</td>
                                          <td
                                            style="width: 25px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                            width="25">
                                            <a href="http://instagram.com/"><img
                                                src="https://image.ibb.co/iQOfrd/instagram-circle1.png" alt=""
                                                style="width: 25px; -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none;"
                                                width="25" border="0"></a>
                                          </td>
                                        </tr>
                                      </table>
                                    </center>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 10px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="10">&nbsp;</td>
                                </tr>
                                <tr>
                                  <td
                                    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;  mso-line-height-rule:exactly;">
                                    <p
                                      style="margin: 0px; font-family: 'Montserrat', sans-serif; font-size: 12px; text-align: center; color: #fff; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-line-height-rule:exactly; line-height:1.5;">
                                      &copy; Copyright 2022. All rights reserved to DaimoonMedia.</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="height: 20px; mso-line-height-rule:exactly; line-height: 1px; font-size: 0px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                    height="20">&nbsp;</td>
                                </tr>
                              </table>
                            </td>
                            <td
                              style="width: 40px; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                              width="40">&nbsp;</td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </center>
        </td>
      </tr>
    </table>
  </body>
  </html>`;

  return emailString;
};

export { orderConfirmation };
