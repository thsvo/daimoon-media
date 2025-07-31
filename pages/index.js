//Core
import React, { useRef } from "react";
import Script from "next/script";
import ReviewVideos from "/json/VideoReviews/videos.json";
//components
import Layout from "/components/Layout";
import HomeHero from "/components/HomeHero";
import Title from "/components/Title";
import VideoReview from "/components/VideoReview";
import TrustpilotWidget from "/components/TrustpilotWidget";
import Results from "/components/ResultsCTA";
import CompanyList from "/components/CompanyList";
import Affiliate from "/components/Affiliate";
import SearchCTA from "/components/SearchCTA";
import Achievements from "/components/Achievements";
import VideoSwiper from "/components/VideoSwiper";
import ServicesCTA from "/components/ServicesCTA";
import SEO from "/components/SEO";

import logo from "/public/logo/logo.png";

// import Dashboard from '/components/Dashboard';
// import Campaigns from '/components/Campaigns';
//Helpers

const Home = (props) => {
  const { reviews } = props;
  const resultsRef = useRef(null);

  return (
    <>
      <SEO
        title={"Organic Music Exposure | Promote Your Music"}
        description={
          "Start growing! Reach new listeners, viewers and fans through proven expert Spotify, YouTube & SoundCloud promotions. Or apply for your personal growth plan."
        }
        image={logo}
      />
      <Layout>
        {/* <!-- Boei Code --> */}
        <Script
          id="boeiyoutube"
          strategy="afterInteractive"
          src="https://app.boei.help/embed/k/841bbf5b-222a-4536-bbbe-2db69638fc80?spa=true"
        ></Script>
        <HomeHero onlyText={false} imageVariant={1} resultsRef={resultsRef} />

        <Title
          title="We're artists, managers, marketeers and music lovers."
          // sub='On a united mission to help you reach your full potential.'
        />

        {/* Trustpilot Widget with consistent positioning using wrapper class */}
        <div className="wrapper lg:pl-12 md:pl-12 sm:pl-12 pt-1">
          <TrustpilotWidget
            templateId="5419b637fa0340045cd0c936"
            scale={1.7}
            mobileScale={1.3}
            iframeHeight="100px"
            mobileIframeHeight="70px"
            showScript={false}
          />
        </div>

        <div style={{ flexDirection: "column" }} className="wrapper">
          {reviews && (
            <VideoSwiper service={"spotify"} reviews={reviews} loop={true} />
          )}
        </div>
        <Title title="Trusted by many" sub="" center />
        <CompanyList wrap={true} />
        <Achievements />
        <Title
          title="All our services"
          sub="What are you looking for?"
          center
        />
        <ServicesCTA />
        <br />
        <br />

        {/* Second Trustpilot Widget with consistent positioning */}
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
        <div ref={resultsRef}></div>
        <div>
          <Results />
          <Title
            title="Need growth? Try it out!"
            sub="Search your song & view all campaigns"
            center
          />
          <SearchCTA />
        </div>
        {/* {reviews && <ReviewGrid reviews={reviews} />} */}
        <Affiliate />
        <VideoReview
          videoUrl="https://www.youtube.com/watch?v=19OP4cVZNBo"
          name="SCOOTER BRAUN"
          title=" Focus on building a fanbase, not worrying about getting to an executive"
          desc="- Manager Ariana Grande, Justin Bieber, Quavo and David Guetta"
        />
        <Title
          title="Start growing today"
          sub="Search your song & view all campaigns"
          center
        />
        <SearchCTA />
        {/* <Title
        title='Real Intel'
        sub='Opportunities multiply as they are seized'
        center
      />{' '}
      <Dashboard /> */}
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  let reviews = [];
  let randomized = [];
  let spotify = ReviewVideos.find((item) => item.service == "spotify");
  let youtube = ReviewVideos.find((item) => item.service == "youtube");
  let soundcloud = ReviewVideos.find((item) => item.service == "soundcloud");
  let trustpilot = ReviewVideos.find((item) => item.service == "trustpilot");

  reviews.push({
    service: "spotify",
    review: spotify.reviews.shift(),
  });

  reviews.push({
    service: "youtube",
    review: youtube.reviews.shift(),
  });

  reviews.push({
    service: "soundcloud",
    review: soundcloud.reviews.shift(),
  });

  // reviews.push({
  //   service: 'trustpilot',
  //   review: trustpilot.reviews.shift(),
  // });

  spotify.reviews.map((review) => {
    randomized.push({
      service: "spotify",
      review: review,
    });
  });
  youtube.reviews.map((review) => {
    randomized.push({
      service: "youtube",
      review: review,
    });
  });
  soundcloud.reviews.map((review) => {
    randomized.push({
      service: "soundcloud",
      review: review,
    });
  });
  // trustpilot.reviews.map((review) => {
  //   randomized.push({
  //     service: 'trustpilot',
  //     review: review,
  //   });
  // });

  let currentIndex = randomized.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [randomized[currentIndex], randomized[randomIndex]] = [
      randomized[randomIndex],
      randomized[currentIndex],
    ];
  }

  reviews.push(...randomized);

  return {
    props: { reviews }, // will be passed to the page component as props
  };
}

export default Home;
