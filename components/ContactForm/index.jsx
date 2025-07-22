//Core
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { addToList, createAndUpdateProfile } from '/lib/Klaviyo';

import ArrowNext from '/public/icons/arrow_next';
import Checkmark from '/public/icons/checkmark';
import loader from '/public/icons/loader.gif';

//Style
import styles from './contactform.module.scss';

const ContactForm = () => {
  const email = useRef(null);
  const fname = useRef(null);
  const [loading, setLoading] = useState(false);
  const [succes, setSucces] = useState(false);

  const submit = async () => {
    setLoading(true);
    createAndUpdateProfile({
      email: email.current.value,
      first_name: fname.current.value,
    })
      .then((response) => {
        addToList(response.data.id, 'TgtS7s');
        setSucces(true);
      })
      .catch((e) => {
        setSucces(false);
      });

    setLoading(false);
  };

  return succes == true ? (
    <div className={styles.container}>
      <p>Succesfully applied!</p>
    </div>
  ) : (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className={
            'w-[150px] h-[60px] bg-transparent border-none text-[#fdfdfd]'
          }
          ref={fname}
          type='fname'
          placeholder='Type your first name'
        />
      </div>
      <div className={styles.inputContainer}>
        <input
          className={
            'w-[150px] h-[60px] bg-transparent border-none text-[#fdfdfd]'
          }
          ref={email}
          type='email'
          placeholder='Type your email'
        />
      </div>

      <button
        style={{ backgroundColor: succes == true && '#1db954' }}
        className={styles.button}
        onClick={submit}
        name='submit email'
      >
        {loading == true ? (
          <Image width={25} height={25} src={loader} alt={''} />
        ) : succes == true ? (
          <Checkmark />
        ) : (
          <ArrowNext color={'#FDFDFD'} />
        )}
      </button>
    </div>
  );
};

export default ContactForm;
