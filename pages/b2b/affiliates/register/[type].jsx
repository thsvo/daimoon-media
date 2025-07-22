import React, { useRef, useState } from 'react';
import router from 'next/router';

//components
import SEO from '/components/SEO';
import Layout from '/components/Layout';
import Title from '/components/Title';
import AffiliateRegisterationForm from '/components/AffiliateRegistrationForm';

import logo from '/public/logo/logo.png';

const Register = (props) => {
  const { type } = router.query;

  return (
    <>
      <SEO
        title={'Organic Music Exposure | DaimoonMedia | Promote Your Music'}
        description={
          'Start growing! Reach new listeners, viewers and fans through proven expert Spotify, YouTube & SoundCloud promotions. Or apply for your personal growth plan.'
        }
        image={logo}
      />
      <Layout>
        <Title title={'Tell us who you are:'} sub={''} center={true} />
        <div className={['wrapper'].join(' ')}>
          <AffiliateRegisterationForm type={type} />
        </div>
      </Layout>
    </>
  );
};

export default Register;
