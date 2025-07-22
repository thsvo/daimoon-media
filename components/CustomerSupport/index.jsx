import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { sendMail } from '/lib/Mailing';
import ArrowDown from '/public/icons/arrow_down';

import FAQsection from '/components/FAQsection';

import Magnifier from '/public/icons/magnifier';

import Sparkle from '/public/icons/sparkle';
import Microphone from '/public/icons/microphone';
import Question from '/public/icons/question';
import Conversation from '/public/icons/conversation';
import Affiliates from '/public/icons/affiliates';
import Checkmark from '/public/icons/checkmark';

import styles from './customersupport.module.scss';

const CustomerSupport = (props) => {
  const { questions } = props;
  const [faq, setFAQ] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [missingQuestion, setQuestion] = useState(false);
  const faqSearch = useRef(null);
  const router = useRouter();
  const { form, key } = router.query;
  const [active, setActive] = useState(form);

  useEffect(() => {
    if (router.query.hasOwnProperty('form')) {
      setActive(form);
    } else {
      setActive('initial');
    }
  }, [form]);

  useEffect(() => {
    if (filter == '') {
      setFAQ([]);
    } else {
      let values = filter.split(' ');
      let filtered = [];

      questions.map((serv, i) => {
        filtered.push({ service: serv.service, types: [] });

        serv.types.map((cat, c) => {
          cat.questions.map((question) => {
            if (values.some((word) => question.Q.includes(word))) {
              if (!filtered[i].types.find((o) => o.category == cat.category)) {
                filtered[i].types.push({
                  category: cat.category,
                  questions: [],
                });
              } else {
                if (filtered[i].types[c]) {
                  filtered[i].types[c].questions.push(question);
                }
              }
            }
          });
        });
      });

      filtered.find((service) => {
        service.types.length != 0 && setFAQ(filtered);
      });
    }
  }, [filter]);

  const sendForm = (values) => {
    values = { ...values, missingQuestion: missingQuestion };

    const subject = values.form + ' : ' + values.subject;
    const email =
      values.form + ' : ' + values.message.replace(/(?:\r\n|\r|\n)/g, '<br>');

    const sender = values.name + '<' + values.email + '>';
    const recipient = values.recipient;

    sendMail(email, recipient, subject, sender);
    setLoading(true);
  };

  return (
    <>
      <div className={styles.container}>
        {active == 'initial' ? (
          <>
            <h3>Get in touch</h3>
            <span>Connect with us regarding any of the following!</span>

            <div className={styles.mailsubjects}>
              <div
                onClick={() =>
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'faq' },
                    },
                    undefined,
                    { scroll: false }
                  )
                }
                className={[
                  styles.item,
                  active == 'faq' && styles.item_active,
                ].join(' ')}
              >
                <Conversation />

                <span>
                  Contact Us <br /> (Regarding Orders)
                </span>
              </div>

              <div
                onClick={() =>
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'inquiries' },
                    },
                    undefined,
                    { scroll: false }
                  )
                }
                className={[
                  styles.item,
                  active == 'inquiries' && styles.item_active,
                ].join(' ')}
              >
                <Question />

                <span>
                  Partnership
                  <br /> Inquiries{' '}
                </span>
              </div>
            </div>
          </>
        ) : (
          active == 'faq' && (
            <>
              <h3>Get in touch</h3>
              <span>Connect with us regarding any of the following!</span>

              <div className={styles.mailsubjects}>
                <div
                  onClick={() =>
                    router.push(
                      {
                        pathname: '/contact',
                        query: { key: key, form: 'faq' },
                      },
                      undefined,
                      { scroll: false }
                    )
                  }
                  className={[
                    styles.item,
                    active == 'faq' && styles.item_active,
                  ].join(' ')}
                >
                  <Conversation />

                  <span>
                    Contact Us <br /> (Regarding Orders)
                  </span>
                </div>

                <div
                  onClick={() =>
                    router.push(
                      {
                        pathname: '/contact',
                        query: { key: key, form: 'inquiries' },
                      },
                      undefined,
                      { scroll: false }
                    )
                  }
                  className={[
                    styles.item,
                    active == 'inquiries' && styles.item_active,
                  ].join(' ')}
                >
                  <Question />

                  <span>
                    Partnership
                    <br /> Inquiries{' '}
                  </span>
                </div>
              </div>
            </>
          )
        )}
        {active == 'contactForm' && (
          <div className={styles.formContainer}>
            <div className={styles.heading_container}>
              <div
                onClick={() => (
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'faq' },
                    },
                    undefined,
                    { scroll: false }
                  ),
                  setLoading(false)
                )}
                className={styles.return}
              >
                <ArrowDown color={'#b165ed'} />
              </div>
              <div className={styles.heading}>
                <h3>Let’s connect you to the team!</h3>
                <span>
                  {`We'll get back within 24 - 48 hours, including weekends!`}
                </span>
              </div>
            </div>
            {!loading ? (
              <div>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    orderid: '',
                    subject: '',
                    information: '',
                    message: '',
                    missingQuestion: missingQuestion,
                    form: 'Subject',
                    recipient: 'support@daimoon.media',
                  }}
                  onSubmit={(values) => sendForm(values)}
                >
                  <Form>
                    <div className={styles.formFields}>
                      <div className={styles.formRow}>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='name'
                            placeholder='Full name*'
                            required
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='email'
                            placeholder='Email*'
                            required
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='orderid'
                            placeholder='order #(if applicable)'
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='subject'
                            placeholder='What are you writing about?*'
                            required
                          />
                        </div>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.item}>
                          <Field
                            as='textarea'
                            name='message'
                            maxlength='500'
                            placeholder='Tell us about your inquiry and what we can do to help you!'
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.submitContainer}>
                      <button type='submit' className={styles.submitButton}>
                        Send message
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            ) : (
              <p>Thank you for your message!</p>
            )}
          </div>
        )}
        {active == 'inquiries' && (
          <div className={styles.formContainer}>
            <div className={styles.heading_container}>
              <div
                onClick={() =>
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'initial' },
                    },
                    undefined,
                    { scroll: false }
                  )
                }
                className={styles.return}
              >
                <ArrowDown color={'#b165ed'} />
              </div>
              <div className={styles.heading}>
                <h3>Partnerships? Awesome!</h3>
                <span>
                  What is your inquiry about? For questions about your order,
                  click{' '}
                  <b
                    onClick={() =>
                      router.push(
                        {
                          pathname: '/contact',
                          query: { key: key, form: 'faq' },
                        },
                        undefined,
                        { scroll: false }
                      )
                    }
                    className={styles.cta}
                  >
                    HERE
                  </b>
                </span>
              </div>
            </div>

            <div
              className={[
                styles.mailsubjects,
                styles.mailsubjects_modified,
              ].join(' ')}
            >
              <div
                onClick={() =>
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'priority' },
                    },
                    undefined,
                    { scroll: false }
                  )
                }
                className={[
                  styles.item,
                  active == 'faq' && styles.item_active,
                ].join(' ')}
              >
                <Microphone />
                <span>
                  For labels, managers <br /> {'&'} Breakthrough artists
                </span>
              </div>

              <Link href={'/b2b/affiliates'} passHref={true}>
                <div className={[styles.item].join(' ')}>
                  <Affiliates />
                  <span>For Affiliates</span>
                </div>
              </Link>

              <Link href={'/b2b/resellers'} passHref={true}>
                <div className={[styles.item].join(' ')}>
                  <Sparkle />
                  <span>For Resellers</span>
                </div>
              </Link>

              <div
                onClick={() =>
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'other' },
                    },
                    undefined,
                    { scroll: false }
                  )
                }
                className={[
                  styles.item,
                  active == 'faq' && styles.item_active,
                ].join(' ')}
              >
                <Question />
                <span>
                  For general <br /> Business Inquiries
                </span>
              </div>
            </div>
          </div>
        )}
        {active == 'priority' && (
          <div className={styles.formContainer}>
            <div className={styles.heading_container}>
              <div
                onClick={() => (
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'inquiries' },
                    },
                    undefined,
                    { scroll: false }
                  ),
                  setLoading(false)
                )}
                className={styles.return}
              >
                <ArrowDown color={'#b165ed'} />
              </div>
              <div className={styles.heading}>
                <h3>Priority Campaigns? Great!</h3>
                <span>
                  {`When you'll become a priority partner, you'll benefit from:`}
                </span>
                <ul className={styles.formBullets}>
                  <li>
                    <Checkmark color={'#b165ed'} />
                    Advanced campaign monitoring
                  </li>
                  <li>
                    <Checkmark color={'#b165ed'} />
                    Better 1:1 assistance (calls + priority response)
                  </li>
                  <li>
                    <Checkmark color={'#b165ed'} />
                    Price/result ratio adjusted to your music
                  </li>
                  <li>
                    <Checkmark color={'#b165ed'} />
                    Custom Packages in your Account Dashboard
                  </li>
                </ul>
                <span>* All priority campaigns start from 999+ USD</span>
              </div>
            </div>
            {!loading ? (
              <div>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    information: '',
                    message: '',
                    missingQuestion: missingQuestion,
                    form: 'Priority Campaigns',
                    recipient: 'mohamed@daimoon.media',
                  }}
                  onSubmit={(values) => sendForm(values)}
                >
                  <Form>
                    <div className={styles.formFields}>
                      <div className={styles.formRow}>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='name'
                            placeholder='Full name *'
                            required
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='email'
                            placeholder='Email *'
                            required
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='subject'
                            placeholder='Subject *'
                            required
                          />
                        </div>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.item}>
                          <Field
                            as='textarea'
                            name='message'
                            maxlength='500'
                            placeholder={`Your message, tell us about: 
                
1 Your artist project
2 Why you're interested in a priority campaign
3 Your music (Of course!)

We'd be happy to take a listen to see if you apply for priority campaigns!`}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.submitContainer}>
                      <button type='submit' className={styles.submitButton}>
                        Apply!
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            ) : (
              <p>Thank you for your message</p>
            )}
          </div>
        )}
        {active == 'reseller' && (
          <div className={styles.formContainer}>
            <div className={styles.heading_container}>
              <div
                onClick={() => (
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'inquiries' },
                    },
                    undefined,
                    { scroll: false }
                  ),
                  setLoading(false)
                )}
                className={styles.return}
              >
                <ArrowDown color={'#b165ed'} />
              </div>
              <div className={styles.heading}>
                <h3>Reselling? Interesting! </h3>
                <span>
                  Resell partners benefit from discounts and priority
                  communication!
                </span>
              </div>
            </div>

            {!loading ? (
              <div>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    subject: '',
                    information: '',
                    message: '',
                    missingQuestion: missingQuestion,
                    form: 'Reseller Inquiry',
                    recipient: 'mohamed@daimoon.media',
                  }}
                  onSubmit={(values) => sendForm(values)}
                >
                  <Form>
                    <div className={styles.formFields}>
                      <div className={styles.formRow}>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='name'
                            placeholder='Full name *'
                            required
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='email'
                            placeholder='Email *'
                            required
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='subject'
                            placeholder='Subject *'
                            required
                          />
                        </div>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.item}>
                          <Field
                            as='textarea'
                            name='message'
                            maxlength='500'
                            placeholder='Message *'
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.submitContainer}>
                      <button type='submit' className={styles.submitButton}>
                        Send message
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            ) : (
              <p>Thank you for your message!</p>
            )}
          </div>
        )}
        {active == 'other' && (
          <div className={styles.formContainer}>
            <div className={styles.heading_container}>
              <div
                onClick={() => (
                  router.push(
                    {
                      pathname: '/contact',
                      query: { key: key, form: 'inquiries' },
                    },
                    undefined,
                    { scroll: false }
                  ),
                  setLoading(false)
                )}
                className={styles.return}
              >
                <ArrowDown color={'#b165ed'} />
              </div>
              <div className={styles.heading}>
                <h3>Other Inquiries? Cool! </h3>
                <span>
                  Tell us more about your idea. For inquiries about your order,
                  click{' '}
                  <b
                    onClick={() =>
                      router.push(
                        {
                          pathname: '/contact',
                          query: { key: key, form: 'faq' },
                        },
                        undefined,
                        { scroll: false }
                      )
                    }
                    className={styles.cta}
                  >
                    HERE
                  </b>
                </span>
              </div>
            </div>
            {!loading ? (
              <div>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    orderid: '',
                    subject: '',
                    information: '',
                    message: '',
                    missingQuestion: missingQuestion,
                    form: 'Other Business Inquiry',
                    recipient: 'mohamed@daimoon.media',
                  }}
                  onSubmit={(values) => sendForm(values)}
                >
                  <Form>
                    <div className={styles.formFields}>
                      <div className={styles.formRow}>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='name'
                            placeholder='Full name *'
                            required
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='email'
                            placeholder='Email *'
                            required
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='orderid'
                            placeholder='order #(if applicable)'
                          />
                        </div>
                        <div className={styles.item}>
                          <Field
                            type='text'
                            name='subject'
                            placeholder='Subject *'
                            required
                          />
                        </div>
                      </div>
                      <div className={styles.formRow}>
                        <div className={styles.item}>
                          <Field
                            as='textarea'
                            name='message'
                            maxlength='500'
                            placeholder='Message *'
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.submitContainer}>
                      <button type='submit' className={styles.submitButton}>
                        Send message
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            ) : (
              <p>Thank you for your message!</p>
            )}
          </div>
        )}

        {active == 'form' ||
          (active == 'business' && (
            <div className={styles.formContainer}>
              <h3>Daimoon Hotline (Bling)</h3>
              <span>Fill in the form and we’ll get back to you ASAP.</span>
              {!loading ? (
                <div>
                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      orderid: '',
                      subject: '',
                      information: '',
                      message: '',
                      missingQuestion: missingQuestion,
                      recipient: 'support@daimoon.media',
                    }}
                    onSubmit={(values) => sendForm(values)}
                  >
                    <Form>
                      <div className={styles.formFields}>
                        <div className={styles.formRow}>
                          <div className={styles.item}>
                            <Field
                              type='text'
                              name='name'
                              placeholder='Full name *'
                              required
                            />
                          </div>
                          <div className={styles.item}>
                            <Field
                              type='text'
                              name='email'
                              placeholder='Email *'
                              required
                            />
                          </div>
                          <div className={styles.item}>
                            <Field
                              type='text'
                              name='orderid'
                              placeholder='order #(if applicable)'
                            />
                          </div>
                          <div className={styles.item}>
                            <Field
                              type='text'
                              name='subject'
                              placeholder='Subject *'
                              required
                            />
                          </div>
                        </div>
                        <div className={styles.formRow}>
                          <div className={styles.item}>
                            <Field as='select' name='information'>
                              <option value='' disabled selected>
                                What are you looking for?
                              </option>
                            </Field>
                            <ArrowDown />
                          </div>
                          <div className={styles.item}>
                            <Field
                              as='textarea'
                              name='message'
                              maxlength='500'
                              placeholder='Message *'
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className={styles.missingQuestion}>
                          <div
                            onClick={() => setQuestion(!missingQuestion)}
                            className={[
                              styles.checkbox,
                              missingQuestion == true &&
                                styles.checkbox__active,
                            ].join(' ')}
                          ></div>
                          <label>
                            My question cant be found in the <span> FAQ</span>
                          </label>
                        </div>
                      </div>
                      <div className={styles.submitContainer}>
                        <button
                          type='submit'
                          disabled={missingQuestion == false && true}
                          className={styles.submitButton}
                        >
                          Send message
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              ) : (
                <p>Thank you for your message!</p>
              )}
            </div>
          ))}
      </div>
      {active == 'faq' && (
        <>
          <div
            onClick={() => faqSearch.current.focus()}
            className={styles.searchContainer}
          >
            <Magnifier color={'#b165ed'} />
            <input
              ref={faqSearch}
              //value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={'What is your question about?'}
            ></input>
          </div>
          <div className={styles.support_information}>
            {faq &&
              faq.map(
                (item, index) =>
                  item.types.length != 0 && (
                    <div className={styles.question_section} key={index}>
                      <h3>{item.service}</h3>
                      <div className={styles.container}>
                        {item.types.map(
                          (item, index) =>
                            item.questions.length != 0 && (
                              <FAQsection
                                color={'#B165ED'}
                                service={''}
                                key={'s' + index}
                                item={item}
                              />
                            )
                        )}
                      </div>
                    </div>
                  )
              )}
            {filter != '' && (
              <div className={styles.falseResults}>
                <div className={styles.notFoundContainer}>
                  <label>Oops!</label>
                  <p>
                    Looks like we don’t have what you’re looking for.
                    <br /> Why don’t you reach out to us?
                  </p>
                </div>
                <div className={styles.submitContainer}>
                  <button
                    onClick={() => (
                      router.push(
                        {
                          pathname: '/contact',
                          query: { key: key, form: 'contactForm' },
                        },
                        undefined,
                        { scroll: false }
                      ),
                      setFilter(''),
                      (faqSearch.current.value = '')
                    )}
                    className={styles.submitButton}
                  >
                    Send message
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default CustomerSupport;
