import 'reflect-metadata';

import React, { useEffect, useContext, useState } from 'react';
import App from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as fbq from '/lib/Fpixel';
import { SessionProvider } from 'next-auth/react';
import { Montserrat } from 'next/font/google';

import Header from '/components/Header';
import Footer from '/components/Footer';
import TrustpilotScriptLoader from '/components/TrustpilotScriptLoader';

//contexts
import ShopContext from '/context/Order/shop-context';
import GlobalState from '/context/Order/GlobalState';
import { ParallaxProvider } from 'react-scroll-parallax';
import { useSearchParams } from 'next/navigation';

// Analytics config
import { ANALYTICS_CONFIG } from '/lib/Analytics/config';

import Cookies from 'universal-cookie';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

import '/styles/Dashboard/pagination.css';

import '/styles/globals.css';
import '/styles/swiper.scss';
import '/styles/margins.css';
import CookieBanner from '../components/CookieBanner/CookieBanner';

const montserrat = Montserrat({ subsets: ['latin'] });

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const context = useContext(ShopContext);
  const cookies = new Cookies();
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const d = new Date();

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
   null

    const handleRouteChange = () => {
      null
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    ref &&
      fetch('/api/tapfilliate/simulateClick', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: ref,
        }),
      })
        .then((response) => response.json())
        .then((id) =>
          cookies.set('tapfilliate_conversion_id', id.id, {
            expires: new Date(d.getTime() + 1000 * 60 * 60 * 24 * 45),
          })
        );
  }, [ref]);

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        ></meta>
      </Head>
      {/* <!-- ADDSHOPPERS TRACKING: BEGIN --> */}
      <Script
        id='addshoppers'
        strategy='afterInteractive'
        src='https://shop.pe/widget/widget_async.js#6360d7818d1353051de2296c'
      >
        {`
          //DO NOT REMOVE - DRIVES REVENUE
          var AddShoppersWidgetOptions = { 'loadCss': false, 'pushResponse': false };

          asConversionInterval = setInterval(function () {
            if (typeof AddShoppersWidget !== 'undefined') {
              AddShoppersWidget.track_conv();
              clearInterval(asConversionInterval);
            }
          }, 1000);
        `}
      </Script>
      {/* <!-- ADDSHOPPERS TRACKING: END --> */}
      {/* <!-- REFERSION TRACKING: BEGIN --> */}
      <Script id='refersion' strategy='afterInteractive'>
        {`! function(e, n, t, i, o, c, s, a) {
            e.TrackingSystemObject = "r", (s = n.createElement(t)).async = 1, s.src = "https://cdn.refersion.com/refersion.js", s.onload = function() {

                // Replace with your Refersion Public API Key
                r.pubKey = "pub_563d0c7228eb5e49a163";

                // Uncomment next line if you need to debug during testing
                // r.settings.dbg_mode = true;

                r.settings.fp_off = true;

                r.initializeXDLS().then(() => {
                    r.launchDefault().then(() => {

                        // Send a custom  event that can be listened to later
                        const rfsnTrackingEvent = new Event("refersion-loaded");
                        document.dispatchEvent(rfsnTrackingEvent);

                    })
                })
            }, (a = n.getElementsByTagName(t)[0]).parentNode.insertBefore(s, a)
        }(window, document, "script");`}
      </Script>
      {/* <!-- REFERSION TRACKING: END --> */}      {/* <!-- This site is converting visitors into subscribers and customers with OptinMonster - https://optinmonster.com --> */}
      <Script id='optinmonster' strategy='afterInteractive'>
        {`(function(d,u,ac){var s=d.createElement('script');s.type='text/javascript';s.src='https://a.omappapi.com/app/js/api.min.js';s.async=true;s.dataset.user=u;s.dataset.account=ac;d.getElementsByTagName('head')[0].appendChild(s);})(document,317253,336339);`}
      </Script>   
      
         {/* <!-- MICROSOFT CLARITY TRACKING --> */}
      <Script id='clarity' strategy='afterInteractive'>
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "s0f0edp9du");`}
      </Script>

      {/*TIKTOK PIXEL */}
      <Script id='TiktokScript' strategy='lazyOnload'>
        {`!function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++ )ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)}; ttq.load('CKT519JC77U24LQ05N6G'); ttq.page(); }(window, document, 'ttq');`}
      </Script>

      {/* <!-- Meta Pixel Code --> */}
       {/* <!-- End Meta Pixel Code --> */}
        {/* <!-- Google Tag Manager --> */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${ANALYTICS_CONFIG.GTM_ID}');
          `
        }}
      />
      {/* <!-- End Google Tag Manager --> */}
      
      {/* <!-- Google Analytics 4 --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_CONFIG.GA_MEASUREMENT_ID}');
        `}
      </Script>
      {/* <!-- End Google Analytics 4 --> */}
      
      {/* Global Trustpilot Script Loader */}
      <TrustpilotScriptLoader />
        <SessionProvider
        session={session}
        refetchOnWindowFocus={true}
        className={montserrat.className}
      >        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <ParallaxProvider>
          <GlobalState>
            {/* <ExitIntentModal show={showPopup} /> */}
            <Header />
            <CookieBanner />
            <Component
              {...pageProps}
              canonical={router.pathname}
              key={router.pathname}
            />
            {context.breadcrumb.find((e) => e.service === service)
              ? context.breadcrumb.find((e) => e.service === service).step ==
                  'search' && <Footer />
              : !router.pathname.includes('thank-you') &&
                !router.pathname.includes('/account/') &&
                !router.pathname.includes('campaigns/checkout') &&
                !router.pathname.includes('campaigns/overview') && <Footer />}
          </GlobalState>
        </ParallaxProvider>
      </SessionProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default MyApp;