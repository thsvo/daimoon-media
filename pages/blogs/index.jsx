//Core
"use client"
import React from 'react';

import Layout from '/components/Layout';
import BlogOverview from '/components/BlogOverview';
import SEO from '/components/SEO';

const Blogs = (props) => {
  const { posts } = props;

  return (
    <>
      <SEO
        title={
          'Blogs | DaimoonMedia Knowledge Hub | Promote Your Music For Free'
        }
        description={
          'Learn how to promote your music with our free expert studies and blog articles. Set your project up for success in the music industry.'
        }
      />
      <Layout>
        <div className={'wrapper'}>
          <BlogOverview posts={posts} />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL + 'posts?per_page=100'
  );
  const posts = await res.json();
  // console.log(posts)

  return {
    props: { posts },
   
  };
}

export default Blogs;
