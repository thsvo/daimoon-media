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

  const companiesFirstRow = [
    { href: "https://daimoon.market/", src: daimoonmarket },
    { href: "https://app.monetunes.com/signup/602337", src: monetunes },
    { href: null, src: awal },
    { href: null, src: theorchard },
    {
      href: "https://www.omarimc.com/best-spotify-promotion-companies-how-to-legitimately-boost-plays/?wpam_id=241",
      src: omari,
    },
    { href: "https://earthweb.com/daimoon-media/", src: earthweb },
    {
      href: "https://www.getplaylisted.com/post/best-spotify-promotion-services-2023-the-ultimate-list",
      src: getplaylisted,
    },
    {
      href: "https://musicreviewworld.com/best-spotify-pitching-service/",
      src: musicreviewworld,
    },
  ];

  const companiesSecondRow = [
    {
      href: "https://www.mysteryfreedom.com/post/music-promotion-services-who-is-the-best",
      src: mysteryfreedom,
    },
    {
      href: "https://organicmusicpromo.com/daimoon-media-review/",
      src: organicmusicpromo,
    },
    {
      href: "https://orionpromotion.com/the-top-5-best-spotify-playlist-services-by-orion?a_ref=660afd7b3cae5",
      src: orion,
    },
    {
      href: "https://soundcamps.com/blog/best-spotify-pitching-service?ref=tom61",
      src: soundcampaign,
      alt: "Soundcampaign",
    },
    {
      href: "https://twostorymelody.com/daimoon-media-review/",
      src: twostorymelody,
    },
  ];

  const repeatedCompaniesFirstRow = Array(5).fill(companiesFirstRow).flat();
  const repeatedCompaniesSecondRow = Array(5).fill(companiesSecondRow).flat();

  const renderCompany = (company, index, prefix) => {
    const content = (
      <div className="w-[200px] h-[50px] relative">
        <Image
          src={company.src}
          fill
          style={{ objectFit: "contain" }}
          alt={company.alt || "company logo"}
        />
      </div>
    );

    if (company.href) {
      return (
        <a
          key={`${prefix}-${index}`}
          href={company.href}
          rel="nofollow"
          target="_blank"
          className="cursor-pointer"
        >
          {content}
        </a>
      );
    }

    return (
      <div key={`${prefix}-${index}`} className="cursor-pointer">
        {content}
      </div>
    );
  };

  return (
    <div
      className={[styles.container, wrap && styles.wrap, "mt-20"]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={["flex gap-4", styles.animate_slide].join(" ")}>
        {repeatedCompaniesFirstRow.map((company, index) =>
          renderCompany(company, index, "first")
        )}
      </div>
      <div className={["flex gap-4", styles.animate_slide__reverse].join(" ")}>
        {repeatedCompaniesSecondRow.map((company, index) =>
          renderCompany(company, index, "second")
        )}
      </div>
    </div>
  );
};

export default CompanyList;
