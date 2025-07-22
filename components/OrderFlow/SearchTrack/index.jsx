import { useState, useEffect } from "react";
import Image from "next/image";

import Contentlabel from "/components/Contentlabel";
import { motion, AnimatePresence } from "framer-motion";
import TrustpilotWidget from "/components/TrustpilotWidget";

import Search from "/components/Search";
import ReleaseDate from "/components/ReleaseDate";

import { trackFunnelStep, trackPageView, getCurrentService } from "/lib/Analytics/gtm";

import { MusicNote } from "/public/icons/music_note";
import VerifiedCheck from "/public/icons/verified_check";
import { FastDelivery } from "/public/icons/fast_delivery";

import gif_header from "/public/gif/gif_header.png";
import trustpilot from "/public/images/trustpilot.png";
import omari from "public/images/companies/omari.png";
import greenSpotlight from "public/Spotlights/green.png";

import styles from "./search.module.scss";

const SearchTrack = (props) => {
  const { activeService, setModal, builder, text, title, content, label } =
    props;
  const [results, setResults] = useState();
  const [releaseDate, toggleReleaseDate] = useState(false);  // Track when search page loads (Step 1)
  useEffect(() => {
    if (activeService && typeof window !== 'undefined') {
      trackFunnelStep(1, activeService, {
        step_name: 'search_page_loaded',
        page_title: title,
      });
      
      trackPageView(window.location.pathname, `${activeService} - Content Search`);
    }
  }, [activeService, title]);

  const color = {
    color:
      activeService == "spotify"
        ? "#1db954"
        : activeService == "youtube"
          ? "#e00"
          : activeService == "tiktok"
            ? "#ff0050"
            : activeService == "soundcloud" && "#f50",
  };

  const backgroundColor = {
    backgroundColor:
      activeService == "spotify"
        ? "#1db954"
        : activeService == "youtube"
          ? "#e00"
          : activeService == "tiktok"
            ? "#ff0050"
            : activeService == "soundcloud" && "#f50",
  };

  const searchPlaceholder =
    activeService == "spotify"
      ? `Start here - Search song or paste Spotify link`
      : activeService == "soundcloud"
        ? "Start here - paste SoundCloud link"
        : activeService == "youtube"
          ? "Start here - Search video or paste YouTube link"
          : activeService == "tiktok" && "Start here - Paste TikTok link";

  const searchAltText =
    activeService == "spotify"
      ? `My release is not live yet`
      : activeService == "soundcloud"
        ? "My release is not live yet"
        : activeService == "youtube"
          ? "My video is not live yet"
          : activeService == "tiktok" && "My link is not live yet";

  const multipleCampaigntitle =
    activeService == "spotify"
      ? `Considering YouTube & SoundCloud?`
      : activeService == "soundcloud"
        ? "Considering Spotify & YouTube as well?"
        : activeService == "youtube" && "Considering Spotify & SoundCloud?";

  const multipleCampaignbody =
    activeService == "spotify"
      ? `Simply start building your Spotify campaign! We’ll remind you to add those afterwards.`
      : activeService == "soundcloud"
        ? " Simply start building your SC campaign! We’ll remind you to add those afterwards."
        : activeService == "youtube" &&
          "Simply start building your YouTube campaign! We’ll remind you to add those afterwards.";

  const animationVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.2,
      transition: { duration: 0.1 },
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.2,
      transition: { ease: "easeOut", duration: 0.15 },
    },
    hover: { scale: 1.05, transition: { duration: 0.1 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        Layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className={styles.container}
      >
        <div className={styles.content}>
          {/* <div className='flex mt-[30px]'>
            <div className='w-[110px] h-[35px] relative'>
              <Image
                alt='trustpilot'
                fill
                style={{ objectFit: 'contain' }}
                src={trustpilot}
              />
            </div>
            <span className='ml-2 text-white pt-[14px] text-[14px]'>
              <b>4.8</b> | <b className='text-center'>120+</b> Reviews
            </span>
          </div> */}
          <br />
{activeService === 'spotify' && (
  <div
    className=" lg:pt-[60px] -ml-5 -mb-2"
    style={{ display: "flex", justifyContent: "flex-start",}}
  >
    <TrustpilotWidget 
      templateId="5419b637fa0340045cd0c936"
      scale={1.1}
      mobileScale={1.1}
      iframeHeight="40px"
      mobileIframeHeight="40px"
      showScript={false}
    />
  </div>
)}

          {/* <h1>
            {activeService == 'youtube'
              ? 'YouTube'
              : activeService == 'soundcloud'
              ? 'SoundCloud'
              : activeService == 'spotify'
              ? 'Spotify'
              : 'TikTok'}{' '}
            Promotion
          </h1> */}
          <h1 className={styles.promoTitle}>
            {activeService == "youtube" ? (
              "YouTube"
            ) : activeService == "soundcloud" ? (
              "SoundCloud"
            ) : activeService == "spotify" ? (              <span className={styles.spotifyUnderlineWrapper}>
                Spotify{" "}
                <svg
                  className={styles.spotifyUnderline}
                  width="320"
                  height="32"
                  viewBox="0 0 320 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >                  <path
                    d="M10 24 C80 10, 160 4, 270 13 C380 22, 430 33, 440 37"
                    stroke="#1db954"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                    pathLength="100"
                    style={{
                      strokeDasharray: "100",
                      strokeDashoffset: "0",
                      strokeWidth: "6px",
                      animation: "thinOut 1s ease forwards",
                    }}
                  />
                  <defs>
                    <style>
                      {`
        @keyframes thinOut {
          0% { stroke-width: 6px; }
          100% { stroke-width: 2px; }
        }
      `}
                    </style>
                  </defs>
                </svg>
              </span>
            ) : (
              "TikTok"
            )}{" "}
            Promotion
          </h1>
          {releaseDate ? (
            <motion.div
              variants={animationVariants}
              initial="initial" // Starting animation
              animate="animate" // Values to animate to
              exit="exit" // Target to animate to when removed from the tree
            >
              <ReleaseDate
                toggleReleaseDate={toggleReleaseDate}
                activeService={activeService}
              />
            </motion.div>
          ) : (
            <>
              <span className="text-[18px]">
                <b>{title}</b>
              </span>
              <p dangerouslySetInnerHTML={{ __html: text }}></p>
              <div className={styles.search}>
                <h2 >
                  {activeService == "youtube"
                    ? "Step 1: Search your Video"
                    : activeService == "tiktok"
                      ? "Step 1: Paste TikTok video URL"
                      : activeService == "soundcloud"
                        ? "Step 1: Paste your URL"
                        : "Step 1: Search your Song"}
                </h2>
                <div className={styles.searchContainer}>
                  <Search
                    setModal={setModal}
                    setResults={setResults}
                    results={results}
                    activeService={activeService}
                    placeholder={searchPlaceholder}
                  />
                  <p
                    onClick={() => toggleReleaseDate(true)}
                    style={color}
                    className={styles.altText}
                  >
                    <u>{searchAltText} </u>👋
                  </p>
                </div>
               
              {activeService == "spotify" && (
  <div className="block sm:hidden pt-1">
    <div className="flex flex-col items-start mt-4">
      <div>
        <span className="text-[16px] opacity-70">
          ”Featured <b style={color}>#2</b> in their <br/>
          <b style={color}>&quot;Best Spotify Promotion Companies&quot;</b>
        </span>
        <div className="flex items-center mt-1">
          <span className="opacity-70">Rated by</span>
          <div className="w-[100px] h-[20px] relative">
            <Image
              alt="trustpilot"
              fill
              style={{ objectFit: "contain" }}
              src={omari}
            />
          </div>
        </div>
      </div>

      {/* You can also add your SpotifyBg.png here if needed */}
    </div>
  </div>
)}

                {/* {multipleCampaigntitle && multipleCampaignbody && (
                  <div className={styles.additionalCampaigns}>
                    <label>{multipleCampaigntitle}</label>
                    <p>{multipleCampaignbody}</p>
                  </div>
                )} */}
              </div>
            </>
          )}
        </div>
        {builder && (
          <div
            className={[
              styles.gifContainer,
              activeService == "spotify"
                ? styles.gifContainer__spotify
                : activeService == "youtube"
                  ? styles.gifContainer__youtube
                  : activeService == "tiktok"
                    ? styles.gifContainer__spotify
                    : activeService == "soundcloud" &&
                      styles.gifContainer__soundcloud,
            ].join(" ")}
          >
            <div className={styles.header}>
              {builder !== "tiktok" && (
                <Image alt={"gif header"} src={gif_header} priority />
              )}
            </div>
            
            <video
              autoPlay={true}
              muted={true}
              controls={false}
              preload="none"
              poster=""
              loop={builder !== "tiktok"}
            >
              {builder == "spotify" ? (
                <source src={"/gif/spotify.webm"} type="video/webm" />
              ) : builder == "youtube" ? (
                <source src={"/gif/youtube.webm"} type="video/webm" />
              ) : builder == "tiktok" ? (
                <source src={"/gif/Comp.webm"} type="video/webm" />
              ) : (
                <source
                  src={"/gif/soundcloud.webm"}
                  type="video/webm"
                />
              )}
            </video>
            {activeService == "spotify" && (
              <div className="flex flex-col items-start mt-5">
                 <div>
                  <span className="text-[18px]">
                    ”Featured <b style={color}>#2</b> in their ”
                    <b style={color}>Best Spotify Promotion Companies</b>”
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="opacity-70">Rated by</span>
                    <div className="w-[100px] h-[20px] relative">
                      <Image
                        alt="trustpilot"
                        fill
                        style={{ objectFit: "contain" }}
                        src={omari}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="flex items-center gap-2 text-[16px] font-bold">
                  <MusicNote />
                  <span>Trending Playlists</span>
                </div>
                <div className="flex items-center gap-2 text-[16px] font-bold">
                  <FastDelivery />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-[16px] font-bold">
                  <VerifiedCheck color="#1ED760" />
                  <span>100% Satisfaction Guarantee</span>
                </div> */}
              </div>
            )}

            {/* <Image alt={'builder gif'} src={builder} placeholder='blur' /> */}
          </div>
        )}
        
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchTrack;
