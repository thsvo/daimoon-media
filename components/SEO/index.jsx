import React from 'react';
import Head from 'next/head';

const SEO = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title + ' | DaimoonMedia'}</title>
      <meta name='description' content={description} />
      <meta itemProp='name' content={title} />
      <meta itemProp='description' content={description} />
      <meta itemProp='image' content={image} />
      <meta itemProp='og:title' content={title} />
      <meta itemProp='og:description' content={description} />
    </Head>
  );
};

export default SEO;
