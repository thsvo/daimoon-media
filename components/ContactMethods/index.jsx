import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import FAQsection from '/components/FAQsection';

import CustomerSupport from '/components/CustomerSupport';
import SocialsContainer from '/components/SocialsContainer';

import Follower from '/public/icons/follower';
import Mail from '/public/icons/mail';
import FAQ from '/public/icons/faq';

import styles from './contactmethods.module.scss';

const ContactMethods = (props) => {
  const { questions } = props;
  const router = useRouter();
  const { key } = router.query;
  const [active, setActive] = useState(key);

  useEffect(() => {
    setActive(key);
  }, [key]);

  return (
    <div className={['wrapper'].join(' ')}>
      <div className={styles.container}>
        <div className={styles.section_header}>
          <h1 className={styles.section_title}>We see you have a question?</h1>
          <p className={styles.section_subtext}>
            We’re here to answer! You can most likely already find the answer to
            your question in our FAQ. If not, proceed with the steps.
          </p>
        </div>
        <div className={styles.section_support}>
          <div className={styles.support_items}>
            <div
              onClick={() => setActive('faq')}
              className={[
                styles.item,
                active == 'faq' && styles.item_active,
              ].join(' ')}
            >
              <FAQ />
              <span>FAQ</span>
            </div>
            <div
              onClick={() => setActive('customer')}
              className={[
                styles.item,
                active == 'customer' && styles.item_active,
              ].join(' ')}
            >
              <Mail />
              <span>Write The Team</span>
            </div>
            <div
              onClick={() => setActive('social')}
              className={[
                styles.item,
                active == 'social' && styles.item_active,
              ].join(' ')}
            >
              <Follower height={45} width={40} color={'#FDFDFD'} />
              <span>Social Media</span>
            </div>
          </div>
          <div className={styles.support_information}>
            {active == 'social' && (
              <div className={styles.container}>
                <h3>Connect with us on Social Media!</h3>
                <div className={styles.socialContainer}>
                  <SocialsContainer />
                </div>
              </div>
            )}
            {active == 'faq' && (
              <>
                <div className={styles.FAQ_container}>
                  {questions &&
                    questions.map((item, index) => (
                      <div className={styles.question_section} key={index}>
                        <h3
                          className={
                            item.service == 'spotify'
                              ? styles.spotify_title
                              : item.service == 'youtube'
                              ? styles.youtube_title
                              : item.service == 'soundcloud' &&
                                styles.soundcloud_title
                          }
                        >
                          {item.service}
                        </h3>
                        <div>
                          {item.types.map((questions, index) => (
                            <>
                              <FAQsection
                                color={
                                  item.service == 'spotify'
                                    ? '#1ED760'
                                    : item.service == 'youtube'
                                    ? '#FF0000'
                                    : item.service == 'soundcloud'
                                    ? '#FF5502'
                                    : '#B165ED'
                                }
                                service={item.service}
                                key={'s' + index}
                                item={questions}
                              />
                              {index == 0 && (
                                <div className={styles.buttonContainer}>
                                  <Link
                                    href={
                                      item.service == 'about'
                                        ? '/landingspage-spotify-youtube-soundcloud'
                                        : `/campaigns/` + item.service ==
                                          'spotify'
                                        ? 'spotify-promotion'
                                        : item.service
                                    }
                                    passHref={true}
                                  >
                                    <button
                                      style={{
                                        backgroundColor:
                                          item.service == 'about'
                                            ? '#b165ed'
                                            : item.service == 'spotify'
                                            ? '#1ED760'
                                            : item.service == 'youtube'
                                            ? '#FF0000'
                                            : item.service == 'soundcloud' &&
                                              '#FF5502',
                                      }}
                                      className={styles.button}
                                    >
                                      {`I'm ready - view campaigns!`}
                                    </button>
                                  </Link>
                                </div>
                              )}
                            </>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </>
            )}
            {active == 'customer' && <CustomerSupport questions={questions} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMethods;
