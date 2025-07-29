import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import ReviewVideos from '/json/VideoReviews/videos.json';
import ServicesCTA from "/components/ServicesCTA";
import Layout from '/components/Layout';
import AffiliateHero from '/components/AffiliateHero';
import Results from '/components/ResultsCTA';
import SearchCTA from '/components/SearchCTA';
import Title from '/components/Title';
import ReviewGrid from '/components/ReviewGrid';
import Achievements from '/components/Achievements';
import SEO from '/components/SEO';
import TrustpilotWidget from "/components/TrustpilotWidget";
import VideoSwiper from '/components/VideoSwiper';
import Spotlight2 from '/public/Spotlights/spotlight-5.png';
import Parallax from '/components/Parallax';
import Button from '/components/Button';

const AffiliateLanding1 = (props) => {
  const { reviews } = props;
  const resultsRef = useRef(null);
  const [service, setService] = useState('spotify');

  // Inject Vidalytics script on mount
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById('vidalytics-script-nathan')) return;

    const script = document.createElement('script');
    script.id = 'vidalytics-script-nathan';
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (v, i, d, a, l, y, t, c, s) {
        y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
        if (!vsl){vsl=function(u,cb){
            if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
            if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
            i.getElementsByTagName("head")[0].appendChild(s);
        };}
        vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
      })(window, document, 'Vidalytics', 'vidalytics_embed_uHj97QHPPjhUymmh', 'https://fast.vidalytics.com/embeds/jHQdYB2g/uHj97QHPPjhUymmh/');
    `;
    document.body.appendChild(script);
  }, []);

  // Filter reviews for the selected service
  const filteredReviews = reviews.filter((r) => r.service === service);

  return (
    <>
      <style jsx>{`
        .spotlight-bg {
          position: absolute;
          top: -290px;
          left: -1%;
          opacity: 0.7;
          z-index: -40;
          width: 100%;
        }
        @media (max-width: 640px) {
          .spotlight-bg {
            top: -180px;
          }
        }
      `}</style>
      <Layout>
        <div className={["wrapper"].join(' ')} style={{position: 'relative'}}>
          <div className="spotlight-bg">
            <Parallax offset={50}>
              <Image
                width={900}
                height={900}
                src={Spotlight2}
                placeholder='blur'
                alt={'spotlight'}
                style={{width: '100%', height: 'auto'}}
              />
            </Parallax>
          </div>
        </div>
        <div>
          <div className="text-[#fff] pt-3 font-bold text-center leading-tight text-xl px-2 sm:px-0 xs:text-3xl sm:text-xl lg:text-4xl w-full max-w-[800px] mx-auto" style={{position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
      The Smartest Way Of 2025 To Grow 10,000s Of Fans And Build A Sustainable Career In Music Without Risking Your Catalog
          </div>
          <br/>
          {/* <p className="text-center text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-300 ">Reach Your Audience through our Unique Growth Campaigns</p> */}
          <div
            className="w-full max-w-[800px] h-[220px] xs:h-[260px] sm:h-[320px] md:h-[400px] items-center lg:pt-6 sm:pt-10 mx-auto"
            style={{ minWidth: '0' }}
          >
            <div
              id="vidalytics_embed_uHj97QHPPjhUymmh"
              style={{
                width: '100%',
                maxWidth: '800px',
                minWidth: '0',
                position: 'relative',
                paddingTop: '56.25%',
                overflow: 'hidden',
                background: '#1a1a1a',
                borderRadius: '16px',
                boxShadow: '0 0 32px 0 rgba(0,0,0,0.5)'
              }}
            ></div>
          </div>

          {/* Button section from AffiliateHero, mobile only */}
          <div className="block md:hidden">
            <div className="flex flex-col gap-4 w-full items-center justify-center">
              <Button
                type='tiktok'
                text='TikTok'
                to='/campaigns/tiktok'
                discount={true}
                newService={true}
                className="w-full"
              />
              <Button
                type='spotify'
                text='Spotify Promotions'
                to='/campaigns/spotify-promotion'
                discount={true}
                className="w-full"
              />
              <Button
                type='youtube'
                text='YouTube Promotions'
                to='/campaigns/youtube'
                discount={true}
                className="w-full"
              />
              <Button
                type='soundcloud'
                text='SoundCloud Promotions'
                to='/campaigns/soundcloud'
                discount={true}
                className="w-full"
              />
            </div>
            <div className="flex justify-center w-full">
              <a
                onClick={() =>
                  resultsRef.current.scrollIntoView({ block: 'center' })
                }
                className="block text-center mt-4 w-full text-white font-semibold text-sm cursor-pointer"
              >
                How does it work?
              </a>
            </div>
          </div>
        </div>
        <br/><br/>
        <div className="block md:hidden w-full mx-auto text-center">
  <TrustpilotWidget
    templateId="5419b637fa0340045cd0c936"
    scale={1.3}
    mobileScale={1.4}
    iframeHeight="100px"
    mobileIframeHeight="90px"
    styleHeight="80px"
    showScript={false}
  />
</div>
        {/* <AffiliateHero
          resultsRef={resultsRef}
          contentlabel='Welcome'
          title='Your partner in promotion'
        /> */}
         {/* <Title
          title="All our services"
          sub="What are you looking for?"
          center
        /> */}

        <div className="hidden sm:block"><ServicesCTA /></div>
        <br />
        <br />
      
         
                 <div className="w-full max-w-none mx-auto text-center hidden sm:block">
                   <div className="flex justify-center items-center w-full">
                     <TrustpilotWidget
                       templateId="5419b637fa0340045cd0c936"
                       scale={1.3}
                       mobileScale={1.4}
                       iframeHeight="100px"
                       mobileIframeHeight="90px"
                       styleHeight="80px"
                       showScript={false}
                     />
                   </div>
                 </div>
       
        
        
        <div ref={resultsRef}>
          <Results />
          <Title
            title='Need growth? Try it out!'
            sub='Search your song & view all campaigns'
            center
          />
          <SearchCTA />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
          <button
            onClick={() => setService('spotify')}
            style={{
              background: service === 'spotify' ? '#1ED760' : 'transparent',
              color: service === 'spotify' ? '#fff' : '#1ED760',
              border: '1px solid #1ED760',
              borderRadius: 6,
              padding: '8px 18px',
              marginRight: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Spotify
          </button>
          <button
            onClick={() => setService('youtube')}
            style={{
              background: service === 'youtube' ? '#FF0000' : 'transparent',
              color: service === 'youtube' ? '#fff' : '#FF0000',
              border: '1px solid #FF0000',
              borderRadius: 6,
              padding: '8px 18px',
              marginRight: 8,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            YouTube
          </button>
          <button
            onClick={() => setService('soundcloud')}
            style={{
              background: service === 'soundcloud' ? '#FF5502' : 'transparent',
              color: service === 'soundcloud' ? '#fff' : '#FF5502',
              border: '1px solid #FF5502',
              borderRadius: 6,
              padding: '8px 18px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            SoundCloud
          </button>
        </div>
        <div
          style={{ flexDirection: 'column' }}
          className={['wrapper'].join(' ')}
        >
          {filteredReviews.length > 0 && (
            <VideoSwiper service={service} reviews={filteredReviews} loop={true} />
          )}
        </div>
        <Achievements />
       
        <Title
          title='Try now & start growing'
          sub='Search your song & view all campaigns'
          center
        />
        <SearchCTA />
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  let reviews = [];
  let spotify = ReviewVideos.find((item) => item.service == 'spotify');
  let youtube = ReviewVideos.find((item) => item.service == 'youtube');
  let soundcloud = ReviewVideos.find((item) => item.service == 'soundcloud');

  spotify.reviews.map((review) => {
    reviews.push({
      service: 'spotify',
      review: review,
    });
  });
  youtube.reviews.map((review) => {
    reviews.push({
      service: 'youtube',
      review: review,
    });
  });
  soundcloud.reviews.map((review) => {
    reviews.push({
      service: 'soundcloud',
      review: review,
    });
  });

  let currentIndex = reviews.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [reviews[currentIndex], reviews[randomIndex]] = [
      reviews[randomIndex],
      reviews[currentIndex],
    ];
  }

  return {
    props: { reviews }, // will be passed to the page component as props
  };
}

export default AffiliateLanding1;