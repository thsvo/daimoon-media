import Image from 'next/image';
import Link from 'next/link';
import styles from './detail.module.scss';

import Tiktok from '/public/icons/tiktok';
import Instagram from '/public/icons/instagram';
import Facebook from '/public/icons/facebook';

const BlogDetail = (props) => {
  const { post } = props;

  return (
    <div className={'wrapper'}>
      <div className={styles.blogWrapper}>
        <div className={[styles.ImageContainer]}>
          <Image
            alt={''}
            layout={'fill'}
            objectFit={'cover'}
            src={post?.yoast_head_json?.og_image?.[0]?.url}
          />
        </div>
        <div className={styles.ContentBody}>
          <div className={styles.shareContainer}>
            <label>
              Learn
              <br /> More?{' '}
            </label>
            <ul>
              <a
                href={'https://www.tiktok.com/@daimoonmedia?lang=en'}
                target='_blank'
                rel='noreferrer'
              >
                <li>
                  <Tiktok />
                </li>
              </a>
              <a
                href={'https://www.instagram.com/daimoonmedia/'}
                target='_blank'
                rel='noreferrer'
              >
                <li>
                  <Instagram />
                </li>
              </a>
              <a
                href={'https://www.facebook.com/daimoonmedia/'}
                target='_blank'
                rel='noreferrer'
              >
                <li>
                  <Facebook />
                </li>
              </a>
            </ul>
          </div>


          <div
            className={styles.ContentContainer}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          ></div>


        </div>
      </div>
    </div>
  );
};

export default BlogDetail;