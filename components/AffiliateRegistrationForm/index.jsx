import React, { useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import Image from 'next/image';

import Follower from '/public/icons/follower';
import Reach from '/public/icons/reach';

import TouchTap from '/public/icons/touch_tap';
import Advertisement from '/public/icons/advertisement';
import MoneyBag from '/public/icons/moneybag';
import ArrowBack from '/public/icons/arrow_back';

import Tick from '/public/icons/tick';

import CompanyList from '/components/CompanyList';

import { sendMail } from '/lib/Mailing';

import loader from '/public/icons/loader.gif';

import styles from './affiliate.module.scss';

const AffiliateRegistrationForm = (props) => {
  const { type } = props;
  const [active, setActive] = useState(type ? type : 'artist');
  const [error, setError] = useState();
  const [succes, setSucces] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({
    length: 1,
    uppercase: 1,
    numerical: 1,
    special: 1,
    email: 1,
    match: 1,
  });
  const [checkbox, toggleCheckbox] = useState(false);

  const validatePassword = (value) => {
    setPassword(value);
    let errors = {};

    if (value.length >= 9 && value.length <= 72) {
      errors = { ...errors, length: 0 };
    } else {
      errors = { ...errors, length: 1 };
    }

    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])');
    if (regex.test(value)) {
      errors = { ...errors, uppercase: 0 };
    } else {
      errors = { ...errors, uppercase: 1 };
    }

    const regexNumerical = new RegExp('(?=.*\\d)');
    if (regexNumerical.test(value)) {
      errors = { ...errors, numerical: 0 };
    } else {
      errors = { ...errors, numerical: 1 };
    }

    const regexSpecial = new RegExp('(?=.*[-+_!@#$%^&*., ?]).+$');
    if (regexSpecial.test(value)) {
      errors = { ...errors, special: 0 };
    } else {
      errors = { ...errors, special: 1 };
    }

    setPasswordErrors(errors);
    if (
      errors.special == 0 &&
      errors.numerical == 0 &&
      errors.uppercase == 0 &&
      errors.length == 0
    ) {
      return true;
    }
  };

  const validateFields = (values) => {
    setLoading(true);
    const emailValid = values.email.includes('@');
    const verifiedPassword = validatePassword(password);

    if (emailValid == true && verifiedPassword == true) {
      if (values.password_confirm == password) {
        const offerId = active == 'artist' ? '101955' : '101954';
        const updatedValues = {
          ...values,
          type: active,
          password: password,
          offer: offerId,
        };

        fetch('/api/affiliates/createAffiliate', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            updatedValues,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            if (response.status == 500) {
              setLoading(false);
              setError(response);
            } else {
              setSucces(true);
              const subject =
                'New Affiliate Registration - ' + updatedValues.first_name;

              const email =
                `Type: ${updatedValues.type} <br />` +
                `Name: ${updatedValues.first_name} <br />` +
                `Last name: ${updatedValues.last_name} <br />` +
                `Email: ${updatedValues.email} <br />` +
                `Company: ${updatedValues.company} <br />` +
                `Company Info: ${updatedValues.companyInfo} <br />` +
                '<br />' +
                'Motivation: <br />' +
                updatedValues.wayOfPromoting.replace(/(?:\r\n|\r|\n)/g, '<br>');

              const sender =
                updatedValues.first_name + '<' + updatedValues.email + '>';
              const recipient = 'support@daimoon.media';

              sendMail(email, recipient, 'Thanks for signing up 🎉', sender);

              if (updatedValues.type == 'artist') {
                const artistEmail = `Hey ${updatedValues.first_name}, <br />
                <br />
                Thanks for signing up as an artist affiliate! Before you can start making a side income, we'll going to review your application. <br />
                Once you are approved, you can login into your private environment where you can copy your unique referral link.<br /> 
                This is the link that you can share with other artists and friends. <br />
                <br />
                If you have any questions in the meantime, feel free to reachout to support@daimoon.media<br />
                <br />
                Have a great week and talk soon! <br />
                <br />
                Team Daimoon`;

                sendMail(
                  artistEmail,
                  updatedValues.email,
                  subject,
                  'support@daimoon.media'
                );
              }
              if (updatedValues.type == 'business') {
                const businessEmail = `Hey ${updatedValues.first_name}, <br />
                <br />
                Thanks for signing up as an affiliate partner! Before you can start making use of our affiliate program, we're going to review your application. <br />
                Once you are approved, you can log in to your private environment where you can copy your unique referral link. This is the link that you can share to refer artists to our website in order to earn an affiliate commission. <br />
                <br />
                If you have any questions in the meantime, feel free to reachout to support@daimoon.media<br />
                <br />
                Have a great week and talk soon! <br />
                <br />
                Team Daimoon`;

                sendMail(
                  businessEmail,
                  updatedValues.email,
                  subject,
                  'support@daimoon.media'
                );
              }
            }
          });
      } else {
        setPasswordErrors({ ...passwordErrors, match: 0 });
        //Paswords do not match
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.SelectorContainer}>
        <div
          onClick={() => setActive('artist')}
          className={[
            styles.item,
            active == 'artist' && styles.item_active,
          ].join(' ')}
        >
          <Follower height={45} width={40} color={'#FDFDFD'} />
          <span>I am an artist</span>
        </div>
        <div
          onClick={() => setActive('business')}
          className={[
            styles.item,
            active == 'business' && styles.item_active,
          ].join(' ')}
        >
          <Reach color={'#FDFDFD'} />
          <span>I represent a business</span>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Link href={'/b2b/affiliates'} passHref={true}>
          <span className={styles.goBackButton}>
            <ArrowBack />
            Back
          </span>
        </Link>
        {succes == true ? (
          <div className={styles.succesContainer}>
            <h3>Thanks for signing up!</h3>
          </div>
        ) : (
          <>
            <div className={styles.form}>
              <Formik
                initialValues={{
                  offer: '',
                  first_name: '',
                  last_name: '',
                  email: '',
                  password: '',
                  password_confirm: '',
                  company: '',
                  companyInfo: '',
                  wayOfPromoting: '',
                  paypal_email: '',
                  send_welcome: 'FALSE',
                }}
                onSubmit={(values) => validateFields(values)}
              >
                <Form>
                  <div className={styles.formFields}>
                    <label>About you:</label>
                    <div className={styles.formRow}>
                      <div>
                        <Field
                          type='hidden'
                          name='type'
                          placeholder='type'
                          required
                          value={active}
                        />
                      </div>
                      <div>
                        <Field
                          type='hidden'
                          name='offer'
                          placeholder='offer'
                          required
                          value={active == 'artist' ? 1 : 2}
                        />
                      </div>
                      <div className={styles.item}>
                        <Field
                          type='text'
                          name='first_name'
                          placeholder='First name*'
                          required
                        />
                      </div>
                      <div className={styles.item}>
                        <Field
                          type='text'
                          name='last_name'
                          placeholder='Last name*'
                          required
                        />
                      </div>
                      <div className={styles.item}>
                        <Field
                          type='email'
                          name='email'
                          placeholder='Email*'
                          required
                        />
                      </div>
                      {error && (
                        <span className={styles.error}>{error.message}</span>
                      )}
                    </div>
                    {active == 'business' && (
                      <>
                        <label>About your business:</label>
                        <div className={styles.formRow}>
                          <div className={styles.item}>
                            <Field
                              type='text'
                              name='company'
                              placeholder='Business name*'
                              required
                            />
                          </div>
                          <div className={styles.item}>
                            <Field
                              as='textarea'
                              name='companyInfo'
                              placeholder='Tell us about your business! What do you do?'
                              required
                            />
                          </div>
                          <div className={styles.item}>
                            <Field
                              as='textarea'
                              name='wayOfPromoting'
                              placeholder='How are you going to promote the services?'
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <label>Account details:</label>
                    <div className={styles.formRow}>
                      <div className={styles.passwordRequirements}>
                        <ul>
                          <li>
                            - DO NOT have the same character repeated more than
                            3 times in a row.
                          </li>
                          <li>- Password must NOT match your email</li>
                        </ul>
                      </div>
                      <div className={styles.item}>
                        <Field
                          type='password'
                          name='password'
                          placeholder='Password'
                          onChange={(event) =>
                            validatePassword(event.target.value)
                          }
                          value={password}
                          required
                        />
                      </div>
                      <div className={styles.passwordRequirements}>
                        <ul>
                          <li
                            className={
                              passwordErrors.length == 0 && styles.fullfilled
                            }
                          >
                            - Between 9 and 72 characters
                          </li>
                          <li
                            className={
                              passwordErrors.uppercase == 0 && styles.fullfilled
                            }
                          >
                            - 1 upper case and 1 lower case character
                          </li>
                          <li
                            className={
                              passwordErrors.numerical == 0 && styles.fullfilled
                            }
                          >
                            - 1 numerical character
                          </li>
                          <li
                            className={
                              passwordErrors.special == 0 && styles.fullfilled
                            }
                          >
                            - 1 special character
                          </li>
                        </ul>
                      </div>

                      <div className={styles.item}>
                        <Field
                          type='password'
                          name='password_confirm'
                          placeholder='Confirm password'
                          required
                        />
                      </div>
                      {passwordErrors.match == 0 && (
                        <div className={styles.passwordRequirements}>
                          <ul>
                            <li>Passwords do not match</li>
                          </ul>
                        </div>
                      )}
                      {!('match' in passwordErrors) &&
                        Object.values(passwordErrors).includes(1) && (
                          <div className={styles.passwordRequirements}>
                            <ul>
                              <li>Passwords requirements not met</li>
                            </ul>
                          </div>
                        )}
                      <div className={styles.item}>
                        <Field
                          type='email'
                          name='paypal_email'
                          placeholder='Paypal address'
                          required
                        />
                      </div>
                      {active == 'artist' && (
                        <div className={styles.item}>
                          <Field
                            as='textarea'
                            name='wayOfPromoting'
                            placeholder='How are you going to promote the services?'
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {active == 'artist' && (
                    <div className={styles.checkboxContainer}>
                      <div
                        onClick={() => toggleCheckbox(!checkbox)}
                        className={styles.checkboxItem}
                      >
                        <div className={[styles.checkbox].join(' ')}>
                          <input type='checkbox' />
                          {checkbox && (
                            <span className={styles.checkmark}></span>
                          )}
                        </div>
                        <span>
                          {`I'm aware that I can't use the affiliate account for my own
                    music, and conversion revenue will be disapproved if I do.
                    Multiple strikes could lead to a block.`}
                        </span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <span className={styles.error}>
                      An error occurred in one of the fields above.
                    </span>
                  )}

                  <div className={styles.submitContainer}>
                    {loading ? (
                      <div className={styles.processContainer}>
                        <Image width={50} height={50} src={loader} alt={''} />
                      </div>
                    ) : active == 'artist' ? (
                      <button
                        type='submit'
                        className={styles.submitButton}
                        disabled={
                          checkbox == true &&
                          Object.values(passwordErrors).includes(1) == false
                            ? false
                            : true
                        }
                      >
                        Apply!
                      </button>
                    ) : (
                      active == 'business' && (
                        <button
                          type='submit'
                          className={styles.submitButton}
                          disabled={
                            Object.values(passwordErrors).includes(1) == false
                              ? false
                              : true
                          }
                        >
                          Apply!
                        </button>
                      )
                    )}
                  </div>
                </Form>
              </Formik>
            </div>
          </>
        )}

        <div className={styles.benefits}>
          {active == 'artist' ? (
            <>
              <div>
                <label>How it works</label>
                <ul className={styles.explanationList}>
                  <li>
                    <b>Refer co-artists to our website</b> <TouchTap />
                  </li>
                  <li>
                    <b>Each sale gets compensated</b>
                    <Advertisement />
                  </li>
                  <li>
                    <b>{`You'll earn 15% comission!`}</b>
                    <MoneyBag />
                  </li>
                </ul>
              </div>
              <div>
                <label>Time to earn!</label>
                <ul className={styles.earnUsps}>
                  <li>
                    <Tick fill={'#b165ed'} />
                    Fixed commissions of <b>15%</b>
                  </li>
                  <li>
                    <Tick fill={'#b165ed'} />
                    No limit on how much you can earn
                  </li>
                  <li>
                    <Tick fill={'#b165ed'} />
                    The best & fastest service for your referals
                  </li>
                  <li>
                    <Tick fill={'#b165ed'} />
                    Automatic monthly payments
                  </li>
                </ul>
              </div>
              <div>
                <label>{`What's next?`}</label>
                <div className={styles.paragraph}>
                  <p>
                    {`
                  Awesome that you want to become a affiliate! Once you get
                  approved, you'll get a unique referral link. Use this link to
                  spread the word, and you'll start making a commission on each
                  sale that goes through that link.`}
                  </p>
                  <span>
                    {`Questions? We'd be happy to help you`}{' '}
                    <Link href={''}>HERE.</Link>
                  </span>
                  <span>See you on the other side!</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label>Time to earn!</label>
                <ul className={styles.earnUsps}>
                  <li>
                    <Tick fill={'#b165ed'} />
                    Commission up to <b>20%</b>
                  </li>
                  <li>
                    <Tick fill={'#b165ed'} />
                    Best performing website in the industry
                  </li>
                  <li>
                    <Tick fill={'#b165ed'} />
                    Automatic monthly payments
                  </li>
                  <li>
                    <Tick fill={'#b165ed'} />
                    Your earnings: The sky is the limit
                  </li>
                  <li>
                    <Tick fill={'#b165ed'} />
                    Only the best & fastest service for your prospects
                  </li>
                </ul>
              </div>
              {/* <div>
                <label>{`Our partners`}</label>
                <div className={styles.companies}>
                  <CompanyList wrap={true} />
                </div>
              </div> */}
              <div>
                <label>{`What's next?`}</label>
                <div className={styles.paragraph}>
                  <p>
                    {`
                 After you signed up, we'll be reviewing your submission. Once you get approved, we'll share all information over email. We might  ask to schedule a call as part of the onboarding process.`}
                  </p>

                  <span>{`We're excited. See you on the other side!`}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AffiliateRegistrationForm;
