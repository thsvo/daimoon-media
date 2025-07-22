import { useState } from 'react';
import Image from 'next/image';
import { Formik, Form, Field } from 'formik';

import loader from '/public/icons/loader.gif';

import daimoon_diamond from '/public/logo/logo.png';

import styles from './accountsettings.module.scss';

const AccountSettings = (props) => {
  const { details } = props;
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.imageContainer}>
          <Image
            src={daimoon_diamond}
            className='p-[25px]'
            fill={true}
            alt={''}
          />
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.header}>
            <label>Personal Details</label>
            <span>
              We will use this information to fillout the checkout in advance
            </span>
          </div>
          <span className={styles.seperator}></span>
          <Formik
            initialValues={{
              name: details.name,
              lname: details.lname,
              birthday: details.birthday,
              email: details.email,
            }}
            onSubmit={async (values) => {
              //setLoading(true);

              await fetch('/api/users/updateUser', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  fields: values,
                  id: details.id,
                }),
              })
                .then((response) => response.json())
                .then(async (data) => {});

              //setLoading(false);
            }}
          >
            <Form>
              <div className={styles.formFields}>
                <div className={styles.formRow}>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='name'
                      placeholder='First name*'
                      required
                    />
                  </div>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='lname'
                      placeholder='Last name*'
                      required
                    />
                  </div>
                  <div className={styles.item}>
                    <Field type='date' name='birthday' placeholder='Birthday' />
                  </div>
                </div>
                <div className={styles.formRow}>
                  <div className={[styles.item, 'opacity-50'].join(' ')}>
                    <Field
                      type='text'
                      name='email'
                      value={details.email}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className={styles.submitContainer}>
                {loading ? (
                  <div className={styles.processContainer}>
                    <Image width={50} height={50} src={loader} alt={''} />
                  </div>
                ) : (
                  <button type='submit' className={styles.submitButton}>
                    Save
                  </button>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {/* <div className={styles.row}>
        <div className={styles.fieldContainer}>
          <div className={styles.header}>
            <label>Business profile</label>
            <span>
              We will use this information to fillout the checkout in advance
            </span>
          </div>
          <span className={styles.seperator}></span>
          <Formik
            initialValues={{
              name: details.name,
              vatNumber: details.lname,
              ChamberOfCommerce: details.ChamberOfCommerce,
              address: details.address,
              address2: details.address2,
              region: details.region,
              postalCode: details.postalCode,
              city: details.city,
              country: details.country,
            }}
            onSubmit={async (values) => {
              setLoading(true);

              await fetch('/api/users/businesses/createBusiness', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  fields: values,
                  id: details.id,
                }),
              })
                .then((response) => response.json())
                .then(async (data) => {});

              setLoading(false);
            }}
          >
            <Form>
              <div className={styles.formFields}>
                <div className={[styles.formRow].join(' ')}>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='name'
                      placeholder='Company name*'
                      required
                    />
                  </div>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='vatNumber'
                      placeholder='VAT number*'
                      required
                    />
                  </div>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='ChamberOfCommerce'
                      placeholder='Chamber of Commerce'
                      required
                    />
                  </div>
                </div>
                <div className={[styles.formRow].join(' ')}>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='address'
                      placeholder='Address'
                      required
                    />
                  </div>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='address2'
                      placeholder='Number'
                      required
                    />
                  </div>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='region'
                      placeholder='Region'
                      required
                    />
                  </div>
                </div>
                <div className={[styles.formRow].join(' ')}>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='postalCode'
                      placeholder='Postal code'
                      required
                    />
                  </div>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='city'
                      placeholder='City'
                      required
                    />
                  </div>
                  <div className={styles.item}>
                    <Field
                      type='text'
                      name='country'
                      placeholder='Country'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.submitContainer}>
                {loading ? (
                  <div className={styles.processContainer}>
                    <Image width={50} height={50} src={loader} alt={''}/>
                  </div>
                ) : (
                  <button type='submit' className={styles.submitButton}>
                    Save
                  </button>
                )}
              </div>
            </Form>
          </Formik>
        </div>
      </div> */}
    </div>
  );
};

export default AccountSettings;
