import Image from "next/image";

import { Navigation, Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./companylist.module.scss";

import daimoonmarket from "/public/images/companies/daimoonmarket.png";
// import drooble from "/public/images/companies/drooble.png";
import monetunes from "/public/images/companies/monetunes.png";
// import prplugger from '/public/images/companies/prplugger.png';
import earthweb from "/public/images/companies/earthweb.png";
import omari from "/public/images/companies/omari.png";
import getplaylisted from "/public/images/companies/getplaylisted.png";
import musicreviewworld from "/public/images/companies/musicreviewworld.png";
import mysteryfreedom from "/public/images/companies/mysteryfreedom.png";
import organicmusicpromo from "/public/images/companies/organicmusicpromo.png";
import orion from "/public/images/companies/orion.png";
import soundcampaign from "/public/images/companies/soundcampaign.png";
import twostorymelody from "/public/images/companies/twostorymelody.png";
// import wealthysound from "/public/images/companies/wealthysound.png";
import awal from "/public/images/companies/awal.png";
import theorchard from "/public/images/companies/theorchard.png";

const CompanyList = (props) => {
  const { wrap } = props;
  return (
    <div
      className={[styles.container, wrap == true && styles.wrap, "mt-20"].join(
        " "
      )}
    >
      <div className={["flex gap-4", styles.animate_slide].join(" ")}>
        <a
          href="https://daimoon.market/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={daimoonmarket} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a
          href="https://app.monetunes.com/signup/602337"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={monetunes} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a nofollow className="cursor-pointer">
          <div className="w-[200px] h-[50px] relative">
            <Image src={awal} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a nofollow className="cursor-pointer">
          <div className="w-[200px] h-[50px] relative">
            <Image src={theorchard} fill style={{ objectFit: "contain" }} />
          </div>
        </a>

        <a
          href="https://www.omarimc.com/best-spotify-promotion-companies-how-to-legitimately-boost-plays/?wpam_id=241"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={omari} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a
          href="https://earthweb.com/daimoon-media/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={earthweb} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a
          href="https://www.getplaylisted.com/post/best-spotify-promotion-services-2023-the-ultimate-list"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={getplaylisted} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a
          href="https://musicreviewworld.com/best-spotify-pitching-service/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image
              src={musicreviewworld}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </a>
        <a
          href="https://daimoon.market/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={daimoonmarket} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a
          href="https://app.monetunes.com/signup/602337"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={monetunes} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a nofollow className="cursor-pointer">
          <div className="w-[200px] h-[50px] relative">
            <Image src={awal} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a nofollow className="cursor-pointer">
          <div className="w-[200px] h-[50px] relative">
            <Image src={theorchard} fill style={{ objectFit: "contain" }} />
          </div>
        </a>

        <a
          href="https://www.omarimc.com/best-spotify-promotion-companies-how-to-legitimately-boost-plays/?wpam_id=241"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={omari} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a
          href="https://earthweb.com/daimoon-media/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={earthweb} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a
          href="https://www.getplaylisted.com/post/best-spotify-promotion-services-2023-the-ultimate-list"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={getplaylisted} fill style={{ objectFit: "contain" }} />
          </div>
        </a>
        <a
          href="https://musicreviewworld.com/best-spotify-pitching-service/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image
              src={musicreviewworld}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </a>
      </div>
      <div className={["flex gap-4", styles.animate_slide__reverse].join(" ")}>
        <a
          href="https://www.mysteryfreedom.com/post/music-promotion-services-who-is-the-best"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={mysteryfreedom} fill style={{ objectFit: "contain" }} />
          </div>
        </a>

        <a
          href="https://organicmusicpromo.com/daimoon-media-review/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image
              src={organicmusicpromo}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </a>

        <a
          href="https://orionpromotion.com/the-top-5-best-spotify-playlist-services-by-orion?a_ref=660afd7b3cae5"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={orion} fill style={{ objectFit: "contain" }} />
          </div>
        </a>

        <a
          href="https://soundcamps.com/blog/best-spotify-pitching-service?ref=tom61"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image
              src={soundcampaign}
              fill
              style={{ objectFit: "contain" }}
              alt="Soundcampaign"
            />
          </div>
        </a>

        <a
          href="https://twostorymelody.com/daimoon-media-review/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={twostorymelody} fill style={{ objectFit: "contain" }} />
          </div>
        </a>

        {/* <a
          href="https://wealthysound.com/posts/best-music-promotion-platforms"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={wealthysound} fill style={{ objectFit: "contain" }} />
          </div>
        </a> */}
        <a
          href="https://www.mysteryfreedom.com/post/music-promotion-services-who-is-the-best"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={mysteryfreedom} fill style={{ objectFit: "contain" }} />
          </div>
        </a>

        <a
          href="https://organicmusicpromo.com/daimoon-media-review/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image
              src={organicmusicpromo}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </a>

        <a
          href="https://orionpromotion.com/the-top-5-best-spotify-playlist-services-by-orion?a_ref=660afd7b3cae5"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={orion} fill style={{ objectFit: "contain" }} />
          </div>
        </a>

        <a
          href="https://soundcamps.com/blog/best-spotify-pitching-service?ref=tom61"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image
              src={soundcampaign}
              fill
              style={{ objectFit: "contain" }}
              alt="Soundcampaign"
            />
          </div>
        </a>

        <a
          href="https://twostorymelody.com/daimoon-media-review/"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={twostorymelody} fill style={{ objectFit: "contain" }} />
          </div>
        </a>

        {/* <a
          href="https://wealthysound.com/posts/best-music-promotion-platforms"
          nofollow
          target="_blank"
          className="cursor-pointer"
        >
          <div className="w-[200px] h-[50px] relative">
            <Image src={wealthysound} fill style={{ objectFit: "contain" }} />
          </div>
        </a> */}
      </div>
    </div>
  );
};

export default CompanyList;
