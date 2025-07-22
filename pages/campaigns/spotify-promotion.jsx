//Core
import React, { useContext, useRef, useEffect } from "react";
//Library
import ReviewVideos from "/json/VideoReviews/videos.json";
import faq from "/json/Faq/faq.json";
import Information from "/json/ProductInformation/information.json";
import Script from "next/script";
import Image from "next/image";

// Analytics
import { trackSpotifyPageView } from "/lib/Analytics/spotifyAnalytics";
//icons
import Reach from "/public/icons/reach";
import Heart from "/public/icons/heart";
import StreamIcon from "/public/icons/stream-icon";

//campaignImages
import AsharieX from "/public/images/campaigns/spotify/AsharieX.png";
import Julianna from "/public/images/campaigns/spotify/Julianna.png";
import LejlaHadzic from "/public/images/campaigns/spotify/LejlaHadzic.png";

//Components
import Layout from "/components/Layout";
import OrderProcess from "/components/OrderProcess";
import CampaignInfo from "/components/CampaignInfo";
import FAQ from "/components/FAQ";
import ShopContext from "/context/Order/shop-context";

import VideoSwiper from "/components/VideoSwiper";
import Campaigns from "/components/Campaigns";
import ProductInformation from "/components/ProductInformation";

import SEO from "/components/SEO";
import { VerifiedCheck } from "/public/icons/verified_check";
import { Diamond } from "/public/icons/diamond";
import { ShakingHands } from "/public/icons/hands";
import { ConversationBubble } from "/public/icons/conversation_bubble";
import CashIcon from "../../public/icons/cash_icon";
import SearchFAQ from "../../components/SearchFaq";

const SpotifyPromo = (props) => {
  const { reviews, BuilderQuestions, GeneralQuestions } = props;
  const context = useContext(ShopContext);
  const faqContainer = useRef(null);

  // Track Spotify page view on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      trackSpotifyPageView(window.location.pathname, 'Spotify Promotion Landing Page');
    }
  }, []);

  const spotify = {
    key: 1,
    value: "spotify",
    label: "SAFE, PROVEN & AUTHENTIC",
    title: `Promote your music on Spotify through playlists with our agency`,
    searchText: `Imagine a team that finds high-performing playlists, checks they’re organic, and personally contacts curators for you. A unique, proven method that delivers 10,000s of streams, while your entire catalog stays safe & protected. If your music career deserves this, simply start our partnership below.`,
    mobileSearchText: `A unique, proven method that delivers 10,000s of streams, while your entire catalog stays safe & protected.`,

    builder: "spotify",
  };

  const color = "#1ED760";

  const CampaignData = {
    color: color,
    title: "Benefits of Spotify Playlist Promotion",
    sub: "Discover how this will impact your music & career.",
    items: [
      {
        icon: Heart,
        title: " Get Appreciation ",
        content:
          "After spending so much time on your music, you’ll finally be rewarded with thousands of real listeners streaming, engaging with, and appreciating your work.",
        bullits: [
          { valid: "true", name: "Gain streams & monthly listeners" },
          { valid: "true", name: "Reach a big audience" },
          { valid: "true", name: "More playlist placements" },
          { valid: "true", name: "Algorithm exposure trigger" },
          { valid: "false", name: "Variable streaming outcome" },
        ],
      },
      {
        icon: Reach,
        title: "Algorithm Stimulance",
        content:
          "Being placed next to similar artists on playlists helps Spotify’s algorithm understand who to recommend your song to. This helps with future algorithmic growth.",
        bullits: [
          { valid: "true", name: "Gain streams & monthly listeners" },
          { valid: "true", name: "Target a smaller audience" },
          { valid: "true", name: "Highly active playlists" },
          { valid: "true", name: "Higher save rates" },
          { valid: "true", name: "Accurate streaming outcome" },
        ],
      },
      {
        icon: CashIcon,
        title: "Affordable Results",
        content:
          "Compared to Meta or Spotify ads, our playlist pitching delivers far more listeners for every dollar spent. It’s the most cost-efficient way to grow your song on Spotify.",
        bullits: [
          { valid: "true", name: "Gain streams & monthly listeners" },
          { valid: "true", name: "Target a smaller audience" },
          { valid: "true", name: "Highly active playlists" },
          { valid: "true", name: "Higher save rates" },
          { valid: "true", name: "Accurate streaming outcome" },
        ],
      },
    ],
  };

  const campaignExamples = [
    {
      ripple: "spotify",
      type: "spotify",
      artistInfo: {
        name: "julianne",
        extraName: "- julianne",
        quote:
          "“DaimoonMedia always exceeds my expectations with their great connections amongst playlist curators and I am very grateful for them!”",
        picture: Julianna,
      },
      campaign: {
        campaign: {
          campaignName: "Target",
          campaignSize: "500.000 reach + 15k streams",
        },
        trackUrl: "https://open.spotify.com/track/2cmmpV5h1E8iFNoJMMkhbB",
        trackName: "altered boy",
        results: [
          {
            icon: StreamIcon,
            text: "71.000 streams",
          },
          {
            icon: Reach,
            text: "16 playlists",
          },
        ],
      },
    },
    {
      ripple: "spotify",
      type: "spotify",
      artistInfo: {
        name: "Asharie X",
        extraName: "- DaimoonMedia",
        quote:
          "“Together with Houston based rapper and MC Asharie we grew his first single to over 65k streams”",
        picture: AsharieX,
      },
      campaign: {
        campaign: {
          campaignName: "Target",
          campaignSize: "50k reach + 5k streams",
        },
        trackUrl: "https://open.spotify.com/track/1jnhXf3ZgCc9WcqBs9Kel3",
        trackName: "Fool With",
        results: [
          {
            icon: StreamIcon,
            text: "47.500 streams",
          },
          {
            icon: Reach,
            text: "10 playlists",
          },
        ],
      },
    },
    {
      ripple: "spotify",
      type: "spotify",
      artistInfo: {
        name: "Lejla Hadzic",
        extraName: "- DaimoonMedia",
        quote:
          "“We helped pop singer Lejla’s debut single reach over 140k streams, with successful singles following after”",
        picture: LejlaHadzic,
      },
      campaign: {
        campaign: {
          campaignName: "Target",
          campaignSize: "50k streams",
        },
        trackUrl: "https://open.spotify.com/track/0J1u8ZpU9sgz3xQpA1bFbr",
        trackName: "Katherine’s Bed",
        results: [
          {
            icon: StreamIcon,
            text: "93.500 streams",
          },
          {
            icon: Reach,
            text: "9 playlists",
          },
        ],
      },
    },
  ];

  return (
    <>
      <SEO
        title={"Spotify Promotion | Promote Your Music"}
        description={`Boost your music's reach with our Spotify Promotion. Join 7000+ artists growing their fanbase through playlist placements. Start reaching new listeners today.`}
      />
      <Layout>
        {/* <!-- Chaty Code --> */}
        <Script
          id="boeispotify"
          strategy="afterInteractive"
          src="https://app.boei.help/embed/k/841bbf5b-222a-4536-bbbe-2db69638fc80?spa=true"
        ></Script>

    

        <OrderProcess activeService={spotify} />

        <div className={["wrapper flex flex-col mt100 pb-20"].join(" ")}>
          {context.breadcrumb.find((e) => e.service === "spotify").step !=
            "search" && (
            <SearchFAQ
              title={"Still having questions?"}
              sub={"We’ve prepared some answers."}
              color={color}
              scrollToElement={faqContainer}
              service={"spotify"}
              questions={[BuilderQuestions]}
              buttonText={"I'm ready - back to growing!"}
            /> )
            }
            

          <CampaignInfo activeService={spotify.value} content={CampaignData} />
          {reviews && (
            <VideoSwiper
              service={"spotify"}
              reviews={reviews}
              loop={true}
              CTA={true}
            />
          )}
          <ProductInformation
            service={"spotify"}
            title={"Spotify Promotion That Works"}
            sub={`Careers are taking off thanks to Daimoon. With over <span style="color:${color}">10,000+ artists helped</span>, we understand how to succeed.`}
            content={Information[0]}
          />
          <Campaigns data={campaignExamples} service={"spotify"} />
          <div ref={faqContainer}>
            <FAQ
              title={"Frequently Asked"}
              sub={"We’ve prepared some answers."}
              color={color}
              service={"spotify"}
              questions={[GeneralQuestions]}
              buttonText={"I'm ready - go to builder!"}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  let reviews = [];

  ReviewVideos.find(
    (item) =>
      item.service === "spotify" &&
      item.reviews.map((review) => {
        reviews.push({
          service: item.service,
          review: review,
        });
      })
  );

  for (let i = reviews.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = reviews[i];
    reviews[i] = reviews[j];
    reviews[j] = temp;
  }

  const questions = faq.find((item) => item.service === "spotify");

  const BuilderQuestions = questions.types.find(
    (type) => type.category === "Campaigns"
  );
  const GeneralQuestions = questions.types.find(
    (type) => type.category === "General"
  );

  if (reviews.length == 0) {
    return {
      props: {
        reviews: [],
        BuilderQuestions,
        GeneralQuestions,
      },
    };
  }

  return {
    props: { reviews, BuilderQuestions, GeneralQuestions }, // will be passed to the page component as props
  };
}

export default SpotifyPromo;
