//Core
import React, { useEffect, useContext, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import Cookies from 'universal-cookie';

import ShopContext from '/context/Order/shop-context';

import PaymentForm from '/components/PaymentForm';
import Layout from '/components/Layout';
import ProductCard from '/components/ProductCard';

import Spotlight2 from '/public/Spotlights/spotlight-2.png';

const Cart = ({ id }) => {
  const cookies = new Cookies();
  const context = useContext(ShopContext);
  const [breadcrumb, setBreadcrumb] = useState('personal');
  const [allMethods, setAllMethods] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    id != 0 && cookies.set('orderId', id);
  });

  useEffect(() => {
    fetch('/api/payments/mollie/getMethods', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        billingCountry:
          context.order.customerDetails.country &&
          context.order.customerDetails.country.countryCode,
        value: context.order.totalPriceDetails.amount_local_incl_vat.toString(),
        currency: 'EUR',
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        setAllMethods(data);
      });
  }, [context.order]);

  return (
    <>
      <Layout>
        <div className={'wrapper flex flex-col center'}>
          <h1>
            Do you want to grow your{' '}
            <b className={'text-[#b165ed]'}>music career</b>?
          </h1>
          <span className='mb-[20px]'>
            We can help you grow in monthly listeners by placing your track in{' '}
            <b className={'text-[#b165ed]'}>active</b> playlists. Will your
            profile be next?
          </span>
          <div className={'bg-[#252525] p-[50px] rounded-[10px]'}>
            <span className='center flex text-[#979797] font-[800] text-[25px]'>
              #{id}
            </span>
            <div>
              {context.order.campaigns.map(
                (e) =>
                  e.campaigns != 0 &&
                  e.campaigns.map((item, index) => (
                    <section
                      className={clsx(
                        'rounded-[12px] border-[1px] border-solid p-[20px] mb-[20px]',
                        e.service == 'spotify' && ' border-[#1ed760]',
                        e.service == 'youtube' && ' border-[#e00]',
                        e.service == 'soundcloud' && ' border-[#f50]'
                      )}
                      key={index}
                    >
                      {/* <span
                      className={e.service == 'spotify' && 'text-[#1ed760]'}
                    >
                      {e.service}
                    </span> */}

                      <ProductCard
                        service={e.service}
                        checkout={true}
                        key={index}
                        content={item}
                      />
                    </section>
                  ))
              )}
            </div>
            <div className='w-full'>
              <div className='flex justify-between'>
                <span
                  style={{ fontWeight: 'normal' }}
                  className='text-[20px] font-[800]'
                >
                  {context.order.totalPriceDetails &&
                  context.order.totalPriceDetails.VAT == 1.21
                    ? 'Total (incl. VAT):'
                    : 'Total (excl. VAT)'}
                </span>
                <span
                  style={{ fontWeight: 'normal' }}
                  className='text-[20px] font-[800]'
                >
                  {Math.round(
                    context.order.totalPriceDetails.amount_local_incl_vat * 100
                  ) /
                    100 +
                    ' ' +
                    context.order.currency.code}
                </span>
              </div>
              {context.order.currency.code != 'EUR' && (
                <div
                  className={
                    'text-[#ffffff4d] text-[13px] font-[700] flex justify-between'
                  }
                >
                  <span>Payment will be made in EUR</span>

                  <span>
                    {Math.round(
                      context.order.totalPriceDetails.amount_EUR_incl_vat
                    ) +
                      ' ' +
                      'EUR'}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className='absolute z-[-1]'>
            <Image
              width={700}
              height={700}
              src={Spotlight2}
              placeholder='blur'
              alt={''}
            />
          </div>

          <div className='mt-10'>
            <PaymentForm
              breadcrumb={breadcrumb}
              setBreadcrumb={setBreadcrumb}
              setLoading={setLoading}
              methods={allMethods}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(
    process.env.NEXTAUTH_URL + `/api/orders/getOrderByHash/` + params.hash,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const post = await response.json();

  return {
    props: { id: post.status == 'paid' ? 0 : post.order_id },
  };
}

export default Cart;
