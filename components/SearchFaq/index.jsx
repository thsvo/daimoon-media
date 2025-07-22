import Image from 'next/image';

import FAQsection from '/components/FAQsection';
import Link from 'next/link';

import Green from '/public/Spotlights/green.png';
import Orange from '/public/Spotlights/orange.png';
import Red from '/public/Spotlights/red.png';

import styles from './faq.module.scss';

const SearchFAQ = (props) => {
  const {
    title,
    sub,
    service,
    questions,
    color,
    buttonText,
    scrollToElement = false,
  } = props;

  return (
    <div>
      <div className={styles.section_header}>
        <h2 className={styles.section_title}>{title}</h2>
        <span>{sub}</span>
      </div>

      <div className={styles.content}>
        <div className={styles.spotlight}>
          <Image
            width={800}
            height={1200}
            alt={'service-spotlight'}
            src={
              service == 'spotify'
                ? Green
                : service == 'soundcloud'
                ? Orange
                : service == 'youtube' && Red
            }
            placeholder='blur'
          />
        </div>
        {questions.map((item, index) => (
          <>
            <FAQsection
              color={color}
              service={service}
              key={index}
              item={item}
            />
            {index == 0 && service != 'about' && (
              <div className={styles.buttonContainer}>
                <Link
                  href={
                    service === 'spotify'
                      ? '/campaigns/spotify-promotion'
                      : `/campaigns/` + service
                  }
                  passHref={true}
                >
                  <button
                    style={{
                      backgroundColor:
                        service == 'spotify'
                          ? '#1ED760'
                          : service == 'youtube'
                          ? '#FF0000'
                          : service == 'soundcloud' && '#FF5502',
                    }}
                    className={styles.button}
                  >
                    {buttonText ? buttonText : `I'm ready - view campaigns!`}
                  </button>
                </Link>
                {service == 'spotify' && scrollToElement != false && (
                  <button
                    onClick={() =>
                      scrollToElement.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest',
                      })
                    }
                    className={[styles.button, styles.button__Inverted].join(
                      ' '
                    )}
                  >
                    {`More questions? View all`}
                  </button>
                )}
              </div>
            )}
          </>
        ))}
      </div>
      <div className={styles.spotlight}>
        <Image
          width={600}
          height={600}
          alt={'service-spotlight'}
          src={
            service == 'spotify'
              ? Green
              : service == 'soundcloud'
              ? Orange
              : service == 'youtube' && Red
          }
          placeholder='blur'
        />
      </div>
    </div>
  );
};

export default SearchFAQ;
