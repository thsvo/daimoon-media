import Link from 'next/link';
import Image from 'next/image';

import styles from './overview.module.scss';

const BlogOverview = (props) => {
  const { posts } = props;
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Daimoon Knowledge Hub</h1>
        <p className={styles.subText}>
          Articles & blogs to help you develop your music marketing skills and
          get the most out of your DaimoonMedia campaigns. Dive in and grow with
          our expert knowledge and studies!
        </p>
      </div>
      <div className={styles.grid}>
        {posts &&
          posts.map((item, index) => (
            <Link
              key={index}
              href={`/knowledge/${item.slug}`}
            >
              <div className={styles.item}>
                {item?.yoast_head_json?.og_image?.[0]?.url && (
                  <div className={styles.imageContainer}>
                    <Image objectFit='cover' fill src={item?.yoast_head_json?.og_image?.[0]?.url} />
                  </div>
                )}
                <div className={styles.content}>
                  <h4>{item.title.rendered}</h4>
                  <p>{item.post_description}</p>
                  <span className={styles.fakeLink}>Read more</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BlogOverview;