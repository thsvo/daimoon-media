import { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./hero.module.scss";

import Button from "/components/Button";
import Contentlabel from "/components/Contentlabel";
import Bulletin from "/components/Bulletin";
import Parallax from "/components/Parallax";
import TrustpilotWidget from "/components/TrustpilotWidget";

import soundcloudWave from "/public/images/soundcloud-wave.png";
import spotifyHero from "/public/images/hero-block-sp.png";
import soundcloudHero from "/public/images/hero-block-sc.png";

import affiliate1 from "/public/images/affiliate1.png";
import affiliate2 from "/public/images/affiliate2.png";
import affiliate3 from "/public/images/affiliate3.png";

import big4 from "/public/images/big4.png";
import big5 from "/public/images/big5.png";
import big6 from "/public/images/big6.png";

import reseller1 from "/public/images/reseller1.png";
import trustpilotStars from "/public/images/trustpilotStars.png";
import trustpilot from "/public/images/trustpilot.png";
import Spotlight1 from "/public/Spotlights/spotlight-1.png";

import Soundcloud from "/public/icons/soundcloud.jsx";
import Youtube from "/public/icons/youtube.jsx";
import Spotify from "/public/icons/spotify.jsx";
import ThumbUp from "/public/icons/thumbs-up.jsx";

import Headphones from "/public/icons/headphones.jsx";
import HealthyHeart from "/public/icons/healthy-heart.jsx";
import Audience from "/public/icons/audience.jsx";
import Script from "next/script";

const HomeHero = (props) => {
  const {
    imageVariant = 1,
    resultsRef,
    onlyText = false,
    label = "Welcome",
    // title = 'The Agency For Music Marketing',
    subTitle = "We represent talented artists and build careers through <span class='no-overlay-emoji'>👇</span>",
    buttons,
    smallCTA = true,
    centerContent = false,
    bullets = [
      {
        text: "Built for <br /> artists",
        icon: Headphones,
      },
      {
        text: "Reach <br /> millions",
        icon: Audience,
      },
      {
        text: "Real people. <br /> With ears.",
        icon: HealthyHeart,
      },
    ],
  } = props;
  const [hover, setHover] = useState();

  return (
    <div
      className={[
        styles.HeroContainer,
        imageVariant == 3 && styles.HeroContainer__modified,
        "wrapper",
      ].join(" ")}
    >
      {onlyText == false && (
        <>
          {imageVariant == 1 && (
            <div className={styles.campaignPreviews}>
              <div className={`${styles.spotlight} pt-32`}>
                <Parallax offset={-10}>
                  <Image
                    alt={"spotlight"}
                    width={600}
                    height={600}
                    src={Spotlight1}
                    lazy
                  />
                </Parallax>
              </div>
              <div className="flex">
                <div
                  className={[
                    styles.soundCloud,
                    hover == "soundcloud" && styles.soundCloud__active,
                  ].join(" ")}
                >
                  <div className={styles.ImageContainer}>
                    <Image
                      src={soundcloudHero}
                      alt="soundcloudCover"
                      lazy
                      fill={"cover"}
                    />
                    <div className={styles.wave}>
                      <Image
                        src={soundcloudWave}
                        lazy
                        alt="soundcloudWave"
                        fill={"cover"}
                      />
                    </div>

                    <div
                      className={[styles.CampaignContent, styles.content].join(
                        " "
                      )}
                    >
                      <span>Azure</span>
                      <span>Hold On</span>
                    </div>
                    <Soundcloud
                      position="absolute"
                      bottom="20px"
                      right="20px"
                    />
                  </div>
                </div>
                <div
                  className={[
                    styles.youtube,
                    hover == "youtube" && styles.youtube__active,
                  ].join(" ")}
                >
                  <div className={styles.ImageContainer}>
                    <video
                      autoPlay={true}
                      muted={true}
                      controls={false}
                      preload="none"
                      poster=""
                      loop={true}
                    >
                      <source
                        src={"/gif/hero-block-yt.webm"}
                        type="video/webm"
                      />
                    </video>
                    <Youtube position="absolute" bottom="20px" right="20px" />
                  </div>
                  <div className={styles.CampaignContent}>
                    <span>Morvo - Search</span>
                    <span>287.856 views</span>
                    <span className={styles.likeCounter}>
                      <ThumbUp /> 20.341
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div
                  className={[
                    styles.spotify,
                    hover == "spotify" && styles.spotify__active,
                  ].join(" ")}
                >
                  <div className={styles.ImageContainer}>
                    <Image
                      fill
                      src={spotifyHero}
                      alt="DaimoonGif"
                      placeholder="blur"
                    />
                    <Spotify position="absolute" bottom="20px" right="20px" />
                  </div>
                  <div className={styles.CampaignContent}>
                    <span>Carry Me Home</span>
                    <span>85.757 listeners</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {imageVariant == 2 && (
            <div className={styles.campaignPreviews}>
              <div className={[styles.normal].join(" ")}>
                <div className={styles.ImageContainer}>
                  <Image
                    layout={"fill"}
                    src={reseller1}
                    alt="DaimoonGif"
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {onlyText == false && imageVariant == 3 && (
        <div className={styles.pictureContainer}>
          <div className={styles.variant1}>
            <div>
              <Image
                layout={"fill"}
                src={affiliate1}
                alt="DaimoonGif"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      )}
      {onlyText == false && imageVariant == 4 && (
        <div className={styles.pictureContainer}>
          <div className={styles.variant4}>
            <div>
              <Image
                layout={"fill"}
                src={big4}
                alt="DaimoonGif"
                placeholder="blur"
              />
            </div>
          </div>
          <div className={styles.spotlight_variant2}>
            <Image
              alt={"spotlight"}
              width={500}
              height={500}
              src={Spotlight1}
              placeholder="blur"
            />
          </div>
          <div className={styles.variant5}>
            <div>
              <Image
                layout={"fill"}
                src={big5}
                alt="DaimoonGif"
                placeholder="blur"
                objectFit={"cover"}
              />
            </div>
          </div>
        </div>
      )}

     <div className={`${styles.campaignCTA} sm:pt-0 pt-10`}>
        <div
          className={[
            styles.contentContainer,
            centerContent == true && styles.contentContainer__centered,
          ].join(" ")}
        >
       <Contentlabel>{label}</Contentlabel>
          <h1
            className="relative font-bold text-white"
            style={{ fontSize: "2rem", lineHeight: "1.1" }}
          >
            <span className="relative inline-block">
              <span className="relative ">The Agency</span>
              <svg
                className="absolute left-0 bottom-0 w-full h-[0.25em] z-0"
                viewBox="0 0 340 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ pointerEvents: "none" }}
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="underline-gradient"
                    x1="0"
                    y1="0"
                    x2="340"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#b57af7" stopOpacity="1" />
                    <stop offset="100%" stopColor="#b57af7" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path
                  d="M10 18 C60 8, 120 3, 200 10 C280 17, 320 25, 330 28"
                  stroke="url(#underline-gradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M10 18 C60 8, 120 3, 200 10 C280 17, 320 25, 330 28"
                  stroke="url(#underline-gradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    filter: "blur(3px)",
                    opacity: 0.5,
                  }}
                />
                <ellipse
                  cx="330"
                  cy="28"
                  rx="0.4"
                  ry="0.5"
                  fill="#b57af7"
                  opacity="0.7"
                />
              </svg>
            </span>
            <span> for</span>
            <br />
            Music Marketing
          </h1>
          <span
            className={styles.underText}
            dangerouslySetInnerHTML={{ __html: subTitle }}
          ></span>

          <div className={[styles.buttonContainer].join(" ")}>
            {!buttons && (
              <>
                <Button
                  type="tiktok"
                  text="TikTok"
                  to="/campaigns/tiktok"
                  discount={true}
                  newService={true}
                ></Button>
                <Button
                  onHoverLeave={() => setHover()}
                  onHover={() => setHover("spotify")}
                  className="mt20"
                  type="spotify"
                  text="Spotify Growth"
                  to="/campaigns/spotify-promotion"
                  discount={true}
                ></Button>
                <Button
                  onHoverLeave={() => setHover()}
                  onHover={() => setHover("youtube")}
                  className="mt20"
                  type="youtube"
                  text="YouTube Growth"
                  to="/campaigns/youtube"
                  discount={true}
                ></Button>
                <Button
                  onHoverLeave={() => setHover()}
                  onHover={() => setHover("soundcloud")}
                  className="mt20"
                  type="soundcloud"
                  text="SoundCloud Growth"
                  to="/campaigns/soundcloud"
                  discount={true}
                ></Button>
              </>
            )}
            {buttons &&
              buttons.map((button, index) => (
                <Button
                  onClick={() => button.onClick.current.scrollIntoView()}
                  type={button.type}
                  key={index}
                  text={button.text}
                  to={button.to && button.url}
                ></Button>
              ))}
          </div>
          {smallCTA == true && (
            <div className={"flex center"}>
             <br/><br/>
          <div className="w-full relative flex items-center mt-4 lg:pl-14 pl-5">
           <div className=" ">
          <TrustpilotWidget 
            scale={1.1}
            mobileScale={1.25}
            iframeHeight="50px"
            mobileIframeHeight="70px"
          />
        </div>
          </div>
            </div>
          )}
        </div>
      </div>
      {onlyText == false && imageVariant == 3 && (
        <div className={styles.pictureContainer}>
          <div className={styles.variant2}>
            <div>
              <Image
                layout={"fill"}
                src={affiliate2}
                alt="DaimoonGif"
                placeholder="blur"
              />
            </div>
          </div>
          <div className={styles.spotlight}>
            <Image
              alt={"spotlight"}
              width={600}
              height={600}
              src={Spotlight1}
              placeholder="blur"
            />
          </div>
          <div className={styles.variant3}>
            <div>
              <Image
                layout={"fill"}
                src={affiliate3}
                alt="DaimoonGif"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      )}
      {onlyText == false && imageVariant == 4 && (
        <div className={styles.pictureContainer}>
          <div className={styles.variant1}>
            <div>
              <Image
                layout={"fill"}
                src={big6}
                alt="DaimoonGif"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeHero;
