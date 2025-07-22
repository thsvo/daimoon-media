//Core
import React from 'react';
import ContactForm from '/components/ContactForm';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

//Helpers

//Components
import Button from '/components/Button';
import daimoon from '/public/logo/daimoon.png';

import trustpilot from '/public/images/trustpilot.png';

import styles from './footer.module.scss';

const PageFooter = () => {
  const router = useRouter();

  return (
    <>
      <div className={['wrapper', styles.footerCta, 'pb-[30px]'].join(' ')}>
        {router.pathname.includes('b2b/resellers') ? (
          <>
            <h4>Use our resources, get discounts</h4>
            <span>& become a reseller</span>
            <div className={styles.buttons}>
              <Button
                className={styles.button}
                type='normal'
                text='Apply here'
                to='https://calendly.com/daimoonmedia/reseller-onboarding-call'
                newTab={true}
              ></Button>
            </div>
          </>
        ) : router.pathname.includes('b2b/affiliates') ? (
          <>
            <h4>Apply today, earn tomorrow</h4>
            <span>Become an affiliate</span>
            <div className={styles.buttons}>
              <Button
                className={styles.button}
                type='normal'
                text='Apply here'
                to='/b2b/affiliates/register/artist'
              ></Button>
            </div>
          </>
        ) : (
          <>
            <h4>Start growing today!</h4>
            <span>Explore different promotions:</span>
            <div className={[styles.buttons, 'gap-4'].join(' ')}>
              <Button
                type='tiktok'
                text='TikTok'
                to='/campaigns/tiktok'
                className={styles.button}
                discount={true}
                newService={true}
              ></Button>
              <Button
                className={styles.button}
                type='spotify'
                text='Spotify Playlist Marketing'
                to='/campaigns/spotify-promotion'
                discount={true}
              ></Button>
              <Button
                className={styles.button}
                type='youtube'
                text='YouTube Advertising'
                to='/campaigns/youtube'
                discount={true}
              ></Button>
              <Button
                className={styles.button}
                type='soundcloud'
                text='SoundCloud Reposts'
                to='/campaigns/soundcloud'
                discount={true}
              ></Button>
            </div>
          </>
        )}
        {/* <div className='flex justify-center mt-[30px]'>
          <Image alt='trustpilot' src={trustpilot} />
          <span className='ml-2 self-end text-base'>
            <b>4.8 | 120+</b> Reviews
          </span>
        </div> */}
      </div>

      <div className={['wrapper', styles.footerContainer].join(' ')}>
        <div className={styles.contactContainer}>
          <div className={styles.image}>
            <Image
              object-fit={'contain'}
              fill
              src={daimoon}
              alt='Full Daimoon Logo'
            />
          </div>
          <p>
            Begin receiving weekly <br /> growth hacks & exclusive updates:
          </p>
          <ContactForm />
          <div>
            <nav className={styles.privacyStatements}>
              <Link href='/terms-and-conditions/'>Terms & Conditions</Link>
              <Link href='/privacy-statement/'>Privacy Policy</Link>
            </nav>
          </div>
        </div>
        <div className={styles.navigationMenu}>
          <nav className={styles.navigationColumn}>
            <label>Services</label>
            <ul>
              <li>
                <Link href='/campaigns/tiktok'>TikTok</Link>
              </li>
              <li>
                <Link href='/campaigns/spotify-promotion'>Spotify</Link>
              </li>
              <li>
                <Link href='/campaigns/youtube'>YouTube</Link>
              </li>
              <li>
                <Link href='/campaigns/soundcloud'>SoundCloud</Link>
              </li>

              <li>
                <Link href='/contact?key=customer&form=priority'>
                  Bigger Campaigns
                </Link>
              </li>
            </ul>
          </nav>
          <nav className={styles.navigationColumn}>
            <label>Partners</label>
            <ul>
              <li>
                <Link href='/contact?key=customer&form=priority'>
                  For Managers
                </Link>
              </li>
              <li>
                <Link href='/contact?key=customer&form=priority'>
                  For Record Labels
                </Link>
              </li>
              <li>
                <Link href='/b2b/resellers'>For Resellers</Link>
              </li>
              <li>
                <Link href='/b2b/affiliates'>For Affiliates</Link>
              </li>
            </ul>
          </nav>
          <nav className={styles.navigationColumn}>
            <label>More</label>
            <ul>
              <li>
                <Link href='/about'>About Us</Link>
              </li>
              <li>
                <Link href='/contact?key=customer'>Contact</Link>
              </li>
              <li>
                <Link href='/contact?key=faq'>FAQ</Link>
              </li>
              <li>
                <Link href='/blogs'>Blogs</Link>
              </li>
              <li>
                <Link
                  target='_blank'
                  rel='noreferrer'
                  href='https://daimoon.market/'
                >
                  Free Promo
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* <div className={styles.socialsContainer}></div> */}
        {/* <div className={styles.spotlight}>
          <Image width={1000} height={1000} src={Spotlight} />
        </div> */}
      </div>
    </>
  );
};

const AffiliateFooter = () => {
  return (
    <>
      <div className={['wrapper', styles.footerCta].join(' ')}>
        <h4>Start growing today!</h4>
        <span>Explore different promotions:</span>
        <div className={styles.buttons}>
          <Button
            className={styles.button}
            type='tiktok'
            text='TikTok'
            to='/campaigns/tiktok'
            discount={true}
            newService={true}
          ></Button>
          <Button
            className={styles.button}
            type='spotify'
            text='Spotify Promotions'
            to='/campaigns/spotify-promotion'
            discount={true}
          ></Button>
          <Button
            className={styles.button}
            type='youtube'
            text='Youtube Promotions'
            to='/campaigns/youtube'
            discount={true}
          ></Button>
          <Button
            className={styles.button}
            type='soundcloud'
            text='SoundCloud Promotions'
            to='/campaigns/soundcloud'
            discount={true}
          ></Button>
        </div>
        {/* <div className='flex justify-center mt-[30px]'>
          <Image alt='trustpilot' src={trustpilot} />
          <span className='ml-2 self-end text-base'>
            <b>4.8 | 120+</b> Reviews
          </span>
        </div> */}
      </div>
      <div className={['wrapper', styles.footerContainer].join(' ')}>
        <div className={styles.contactContainer}>
          <div className={styles.image}>
            <Image
              objectFit={'contain'}
              layout={'fill'}
              src={daimoon}
              alt='Full Daimoon Logo'
            />
          </div>
          <p>
            Begin receiving weekly <br /> growth hacks & exclusive updates:
          </p>
          <ContactForm />
        </div>
        <div className={styles.navigationMenu}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <nav
              style={{ marginRight: '25px' }}
              className={styles.privacyStatements}
            >
              <Link href='/terms-and-conditions/'>Terms & Conditions</Link>
            </nav>
            <nav className={styles.privacyStatements}>
              <Link href='/privacy-statement/'>Privacy Policy</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  const router = useRouter();

  if (
    router.pathname.includes('questionair') ||
    router.pathname.includes('welcome')
  ) {
    return null;
  }

  if (router.pathname.includes('landingspage-spotify-youtube-soundcloud')) {
    return AffiliateFooter();
  } else {
    return PageFooter();
  }

  //return !router.pathname.includes('/campaigns/') && PageFooter();
};

export default Footer;
