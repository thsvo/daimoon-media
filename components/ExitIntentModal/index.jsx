import React, { useEffect, useState, useRef } from 'react';
import { Formik, Form, Field } from 'formik';

import { motion, AnimatePresence } from 'framer-motion';

import Button from '/components/Button';

import Cross from '/public/icons/cross';
import Play from '/public/icons/playbutton';

import styles from './exitintentmodal.module.scss';

const ExitIntentModal = (props) => {
  // use show to determine if you should display the modal or not
  const [show, setShow] = useState(props.show);
  const [play, setPlay] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  // you can create a function to close the modal after the user clicks the "x" button or subscribes
  const close = () => {
    setShow(false);
  };

  const dropIn = {
    hidden: {
      y: '-100vh',
      opacity: 0,
    },
    visible: {
      y: 5,
      //transform: 'translate(50%,50%)',
      opacity: 1,
      transition: {
        duration: 0.1,
        type: 'spring',
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: '100vh',
      opacity: 0,
    },
  };

  const startVideo = () => {
    setPlay(!play);
    if (video.current.paused) video.current.play();
    else video.current.pause();
  };

  return show ? (
    <AnimatePresence>
      <>
        <motion.div
          onClick={() => close()}
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
        ></motion.div>
        <motion.div
          variants={dropIn}
          initial='hidden'
          animate='visible'
          exit='exit'
          className={styles.container}
        >
          <div onClick={() => close()} className={styles.closeBtn}>
            <Cross />
          </div>
          <div className={styles.content}>
            <div className={styles.bodyContent}>
              <div className={styles.textContainer}>
                <h2>{`Access your guide to success for FREE🚀`}</h2>
                <p className='mt-0'>
                  Discover the 4 secret pillars to run a successful career in
                  music🌟
                </p>
                <span>{`Just enter your name & email to receive all goods into your inbox💌`}</span>
                <div>
                  <Formik
                    initialValues={{
                      firstName: '',
                      email: '',
                    }}
                    // onSubmit={async (values) =>
                    //   addToList(values.email, 'UsTvuv').then((response) => {
                    //     if (response && response.id) {
                    //       const queryData =
                    //         'first_name=' +
                    //         formik.values.first_name +
                    //         '&email=' +
                    //         formik.values.email;

                    //       updateProfile(queryData, response.id);
                    //     }

                    //     setShow(false);
                    //   })
                    // }
                  >
                    <Form>
                      <Field
                        className='bg-[#363636] w-[284px] h-[59px] rounded-[10px] pl-[21px] border-none'
                        id='firstName'
                        name='firstName'
                        placeholder='First name'
                      />

                      <Field
                        className='bg-[#363636] w-[284px] h-[59px] rounded-[10px] pl-[21px] border-none mt-[10px]'
                        id='email'
                        name='email'
                        placeholder='Email'
                        type='email'
                      />
                      <button
                        type='submit'
                        className='bg-[#b165ed] text-[#fdfdfd] border-none w-[284px] h-[59px] rounded-[6px] text-[16px] mt-[20px] hover:pointer'
                      >
                        Get access
                      </button>
                    </Form>
                  </Formik>
                </div>
              </div>
              <div
                className={styles.videoContainer}
                onClick={() => startVideo()}
              >
                <video
                  poster={'/blackFriday/poster.png'}
                  ref={video}
                  src={
                    process.env.NEXT_PUBLIC_VIDEOS_URL +
                    'ExitIntent/black_friday.mp4'
                  }
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                  }} //object-fit:cover
                ></video>
                {play == false ? <Play /> : null}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  ) : null;
};

export default ExitIntentModal;
