import { useRef } from 'react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Review from '/components/ReviewItem';

import styles from './videoswiper.module.scss';

const VideoSwiper = ({ reviews, service, loop, CTA }) => {
  const swiper = useRef(null);
  const color = {
    color:
      service == 'spotify'
        ? '#1ED760'
        : service == 'youtube'
        ? '#FF0000'
        : service == 'soundcloud' && '#FF5502',
  };

  const reviewButton = {
    color:
      service == 'spotify'
        ? '#1ED760'
        : service == 'youtube'
        ? '#FF0000'
        : service == 'soundcloud' && '#FF5502',

    border:
      service == 'spotify'
        ? '1px solid #1ED760'
        : service == 'youtube'
        ? '1px solid #FF0000'
        : service == 'soundcloud' && '1px solid #FF5502',
  };

  return (
    <div className={styles.container}>
      <div className={styles.trustpilotContainer}>
        {CTA && (
          <button
            style={reviewButton}
            className={styles.CTAbutton}
            onClick={() => window.scrollTo(0, 0)}
          >
            {`Let's get started`}
          </button>
        )}
      </div>
      <Swiper
        ref={swiper}
        className={styles.swiper}        modules={[Navigation, Autoplay]}
        spaceBetween={60}
        loop={loop}
        slidesPerView={2}
        noSwiping={true}
        navigation={{
          prevEl: '.buttonPrev',
          nextEl: '.buttonNext',
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
        }}
        // pagination={{
        //   clickable: true,
        //   el: '.pagination',
        // }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
      >
        {reviews &&
          reviews.map((review, key) => {
            return (
              <SwiperSlide key={key}>
                <Review
                  color={color}
                  className={styles.review}
                  key={key}
                  entry={key}
                  service={review.service}
                  content={review.review}
                  swiper={swiper}
                />
              </SwiperSlide>
            );
          })}
        <div
          className={['pagination', styles.reviewPagination, service].join(' ')}
        ></div>
      </Swiper>
    </div>
  );
};

export default VideoSwiper;
