import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { useContext, useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { addToList, createAndUpdateProfile } from '/lib/Klaviyo';
import Image from 'next/image';
import Link from 'next/link';
import ShopContext from '/context/Order/shop-context';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'universal-cookie';

import { PostOrder, UpdateOrder } from '/lib/ExistingOrder';
import ExpressCheckout from '/components/ExpressCheckout';

import ArrowBack from '/public/icons/arrow_back';
import ArrowDown from '/public/icons/arrow_down';

import loader from '/public/icons/loader.gif';
import countries from '/json/countries/list.json';

import styles from './form.module.scss';

const CreatePayment = async (
  orderId,
  method,
  amount,
  currency,
  updatedDetails
) => {
  const value = '#' + orderId;
  const id = window.btoa(value);

  const result = await fetch('/api/payments/mollie/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderId: orderId,
      id: id,
      method: method,
      currency: 'EUR',
      amount: amount,
      updatedDetails: updatedDetails,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return result;
};

const PaymentForm = (props) => {
  const router = useRouter();
  const { methods, setLoading, breadcrumb, setBreadcrumb } = props;
  const cookies = new Cookies();
  const [validating, setValidating] = useState(false);
  const context = useContext(ShopContext);
  const [errors, setErrors] = useState({});
  const [type, setType] = useState('text');
  const [business, setBusiness] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [klaviyoId, setKlaviyoId] = useState('');
  const [businessVAT, setBusinessVAT] = useState('');
  const businessField = useRef(null);
  const businessNameField = useRef(null);
  const dateField = useRef(null);
  const [businessCOC, setBusinessCOC] = useState('');
  const [terms, setTerms] = useState(false);
  const [activeMethod, setMethod] = useState('');
  const [countryCode, setCountryCode] = useState('IN'); // Default to India

  const vatValidation = async (id) => {
    setValidating(true);
    const result = await fetch('/api/vat/validation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    setValidating(false);

    if (result.valid == true) {
      setBusinessName(result.company_name);

      const companyObject = {
        campany_name: result.company_name,
        vat_number: id,
        validated: result.valid,
      };

      if (result.country_code == 'NL') {
        context.updateVAT(1.21);
      } else {
        context.updateVAT(1.0);
      }
      context.updateCompany(companyObject);
    } else {
      setBusinessName('');
      if (context.order.customerDetails.country.eu == true) {
        context.updateVAT(1.21);
      } else {
        context.updateVAT(1.0);
      }
      const companyObject = {
        validated: false,
        vat_number: id,
        campany_name: '',
      };

      context.updateCompany(companyObject);
    }
  };

  // Detect user's country based on IP location using multiple providers
  useEffect(() => {
    const detectCountryWithFallback = async () => {
      // Array of different IP geolocation APIs
      const geoApis = [
        {
          name: 'ipapi.co',
          url: 'https://ipapi.co/json/',
          parseCountry: (data) => data.country_code
        },
        {
          name: 'ip-api.com',
          url: 'https://ip-api.com/json/',
          parseCountry: (data) => data.countryCode
        },
        {
          name: 'ipinfo.io',
          url: 'https://ipinfo.io/json',
          parseCountry: (data) => data.country
        },
        {
          name: 'freegeoip.app',
          url: 'https://freegeoip.app/json/',
          parseCountry: (data) => data.country_code
        }
      ];

      for (const api of geoApis) {
        try {          
          const response = await fetch(api.url, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          const countryCode = api.parseCountry(data);
          
          if (countryCode && countryCode.length === 2) {
            
            // Set the detected country code
            setCountryCode(countryCode);
            
            // Update formik values with detected country
            formik.setFieldValue('countryCode', countryCode);
            
            return; // Success, exit the loop
          }
        } catch (error) {
          console.error(`Failed to detect country via ${api.name}:`, error);
          // Continue to next API
        }
      }
      
      // If all APIs fail, try the original internal API as final fallback
      try {
        const response = await fetch('/api/geo', {
          method: 'GET',
        });
        const data = await response.json();
        
        if (data && data.country) {
          console.log(`Country detected: ${data.country} via internal API`);
          setCountryCode(data.country);
          formik.setFieldValue('countryCode', data.country);
          return;
        }
      } catch (error) {
        console.error('Internal geo API also failed:', error);
      }
      
      console.log('All geo detection methods failed, keeping default India (IN)');
    };

    detectCountryWithFallback();
  }, []); // Run only once on component mount

  //Saving data to Klaviyoh with every breadcrumb progression
  useEffect(() => {
    const list = 'TgtS7s';

    router.pathname.includes('/campaigns/checkout') &&
      router.push(
        {
          pathname: '/campaigns/checkout',
          query: { step: breadcrumb },
        },
        undefined,
        { scroll: false }
      );

    if (formik.values.email != '') {
      const updatedDetails = {
        klaviyoId: klaviyoId,
        geoLocation: {
          ...formik.values.geoLocation,
        },
        fullname: formik.values.first_name + ' ' + formik.values.last_name,
        fname: formik.values.first_name,
        lname: formik.values.last_name,
        email: formik.values.email,
        date_of_birth: formik.values.birthday,
        phone: phone,
        address: formik.values.address,
        city: formik.values.city,
        country: formik.values.country,
        postal_code: formik.values.postal_code,
        company: business,
        company_details: {
          campany_name: businessName,
          vat_number: businessVAT,
          chamber_of_commerce: businessCOC,
        },
      };

      const body = {
        ...context.order,
        order_id: cookies.get('orderId'),
        customerDetails: updatedDetails,
        note: formik.values.note,
        method: activeMethod,
      };

      let klaviyoProfileData = {
        email: formik.values.email,
        first_name: formik.values.first_name,
        last_name: formik.values.last_name,
        properties: {
          birthday: formik.values.birthday,
        },
      };

      if (phone) {
        klaviyoProfileData.phone_number = phone;
      }

      breadcrumb == 'billing' &&
        createAndUpdateProfile(klaviyoProfileData).then((response) => {
          setKlaviyoId(response.data.id);
          addToList(response.data.id, list);

          if (typeof klaviyo !== 'undefined') {
            console.log('klaviyo', klaviyo?.identify());
            klaviyo?.identify({
              email: formik.values.email,
            });

            klaviyo.push([
              'track',
              'Started Checkout',
              {
                $event_id: body.order_id,
                $value: context.order.totalPriceDetails.amount_EUR_incl_vat,
                ItemNames: ['Winnie the Pooh', 'A Tale of Two Cities'],
                CheckoutURL: 'http://www.example.com/path/to/checkout',
                Categories: ['Fiction', 'Children', 'Classics'],
                Items: [
                  {
                    ProductID: '1111',
                    SKU: 'WINNIEPOOH',
                    ProductName: 'Winnie the Pooh',
                    Quantity: 1,
                    ItemPrice: 9.99,
                    RowTotal: 9.99,
                    ProductURL: 'http://www.example.com/path/to/product',
                    ImageURL:
                      'http://www.example.com/path/to/product/image.png',
                    ProductCategories: ['Fiction', 'Children'],
                  },
                  {
                    ProductID: '1112',
                    SKU: 'TALEOFTWO',
                    ProductName: 'A Tale of Two Cities',
                    Quantity: 1,
                    ItemPrice: 19.99,
                    RowTotal: 19.99,
                    ProductURL: 'http://www.example.com/path/to/product2',
                    ImageURL:
                      'http://www.example.com/path/to/product/image2.png',
                    ProductCategories: ['Fiction', 'Classics'],
                  },
                ],
              },
            ]);
          }
        });

      //PostOrder, UpdateOrder;
      if (cookies.get('orderId')) {
        //Update current order
        UpdateOrder(cookies.get('orderId'), body);
      } else {
        //Post new Order
        PostOrder(body).then((id) => {
          cookies.set('orderId', id.orderId, { path: '/' });
        });
      }
    }
  }, [breadcrumb]);

  const validateFields = (step, values) => {
    let error = {};
    if (step == 'personal') {
      if (values.first_name == '') {
        error = {
          ...error,
          fname: { error: 1, message: 'valid first name is required' },
        };
      }
      if (values.last_name == '') {
        error = {
          ...error,
          lname: { error: 1, message: 'valid last name is required' },
        };
      }

      if (values.email.indexOf('@') == -1) {
        error = {
          ...error,
          email: { error: 1, message: 'valid Email is required' },
        };
      }

      if (!Object.keys(error).length) {
        setErrors({});
        setBreadcrumb('billing');
      } else {
        setErrors(error);
      }
    }
    if (step == 'billing') {
      if (values.address == '') {
        error = {
          ...error,
          address: { error: 1, message: 'address is required' },
        };
      }

      if (values.city == '') {
        error = {
          ...error,
          city: { error: 1, message: 'city is required' },
        };
      }

      if (values.postal_code == '') {
        error = {
          ...error,
          postal_code: { error: 1, message: 'postal code is required' },
        };
      }

      if (terms == false) {
        error = {
          ...error,
          terms: { error: 1, message: '(Accepting our terms is rquired)' },
        };
      }

      if (!Object.keys(error).length) {
        setErrors({});
        setBreadcrumb('payment');
      } else {
        setErrors(error);
      }
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      geoLocation: { ...context.order.customerDetails.geoLocation },
      email: context.order.customerDetails.email,
      first_name: context.order.customerDetails.fname,
      last_name: context.order.customerDetails.lname,
      birthday: context.order.customerDetails.date_of_birth,
      phone: context.order.customerDetails.phone,
      address: context.order.customerDetails.address,
      city: context.order.customerDetails.city,
      postal_code: context.order.customerDetails.postal_code,
      country: context.order.customerDetails.country,
      countryCode: countryCode, // Use IP-detected country code
      method: '',
      note: '',
      company: false,
      company_details: {
        company_name:
          context.order.customerDetails.company_details.campany_name,
        vat_number: context.order.customerDetails.company_details.vat_number,
        chamber_of_commerce:
          context.order.customerDetails.company_details.chamber_of_commerce,
      },
    },

    onSubmit: async (values) => {
      setLoading(true);
      if (!Object.keys(errors).length) {
        await fetch('/api/geo', {
          method: 'GET',
        })
          .then((response) => response.json())
          .then(async (data) => {
            console.log('data', data);
            const updatedDetails = {
              klaviyoId: klaviyoId,
              fullname: values.first_name + ' ' + values.last_name,
              fname: values.first_name,
              lname: values.last_name,
              email: values.email,
              date_of_birth: values.birthday,
              phone: phone,
              address: values.address,
              city: values.city,
              country: values.country,
              postal_code: values.postal_code,
              company: business,
              company_details: {
                campany_name: businessName,
                vat_number: businessVAT,
                chamber_of_commerce: businessCOC,
              },
            };

            const body = {
              ...context.order,
              customerDetails: {
                ...context.order.customerDetails,
                updatedDetails,
              },
              note: values.note,
              method: activeMethod,
            };

            await fetch('/api/orders/updateOrder', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                contact_name: values.first_name + ' ' + values.last_name,
                contact_email: values.email,
                body: body,
                id: cookies.get('orderId'),
              }),
            })
              .then((response) => response.json())
              .then(async (data) => {
                const amount =
                  context.order.totalPriceDetails.amount_EUR_incl_vat;
                const currency = 'EUR';

                const result = await CreatePayment(
                  cookies.get('orderId'),
                  activeMethod,
                  amount,
                  currency,
                  updatedDetails
                );

                context.order.campaigns.map(
                  (i) =>
                    i.total > 0 &&
                    i.campaigns.find((_) =>
                      _.campaignObject.campaign.map(
                        (e) =>
                          e.value.specialPackage == true &&
                          cookies.set('usedPromotionalPackage', true)
                      )
                    )
                );

                //

                window.location.assign(result._links.checkout.href);

                // window.open(result._links.checkout.href, 'Payment', [
                //   '_blank',
                //   'width=100',
                // ]);

                //Router.push('/thank-you?id=' + id);

                //setLoading(false);
              });
          });
      } else {
        setLoading(false);
        setErrors(validated);
      }
    },
  });

  function onKeyDown(keyEvent) {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  }

  const changeType = () => {
    setType('date');
    dateField.current.focus();
  };

  const adjustPriceForMethods = (method) => {
    setMethod(method.id);

    let extraCost = 0;
    switch (method.description) {
      case 'Credit card':
        extraCost = 1.0282;
        break;
      default:
        extraCost = 1.0;
    }

    context.addExtraCosts(extraCost);
  };

  return (
    <motion.form onKeyDown={onKeyDown} Layout onSubmit={formik.handleSubmit}>
      <AnimatePresence>
        {breadcrumb == 'personal' && (
          <>
            <div className={styles.checkoutHeader}>
              {/* <h2>Begin checkout</h2> */}
            </div>
            <ExpressCheckout />
            <motion.div className={styles.formFields} key='presonal'>
              <div className={styles.inputFields}>
                <div className={styles.row}>
                  <div>
                    <input
                      onChange={formik.handleChange}
                      className={[
                        styles.input,

                        errors.fname &&
                          errors.fname.error == 1 &&
                          styles.input_error,
                      ].join(' ')}
                      id='first_name'
                      name='first_name'
                      type='text'
                      placeholder='First name*'
                      autoComplete={'first_name'}
                      value={formik.values.first_name}
                      required
                    />
                    {errors.fname && <span>{errors.fname.message}</span>}
                  </div>

                  <div>
                    <input
                      onChange={formik.handleChange}
                      className={[
                        styles.input,
                        errors.lname &&
                          errors.lname.error == 1 &&
                          styles.input_error,
                      ].join(' ')}
                      id='last_name'
                      name='last_name'
                      type='text'
                      placeholder='Last name*'
                      autoComplete={'family_name'}
                      value={formik.values.last_name}
                      required
                    />
                    {errors.lname && <span>{errors.lname.message}</span>}
                  </div>
                </div>
                <div className={styles.row}>
                  <div>
                    <input
                      onChange={formik.handleChange}
                      className={[
                        styles.input,
                        errors.email &&
                          errors.email.error == 1 &&
                          styles.input_error,
                      ].join(' ')}
                      id='email'
                      name='email'
                      type='email'
                      placeholder='Email*'
                      autoComplete={'email'}
                      value={formik.values.email}
                      required
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                  </div>
                  <div>
                    <input
                      ref={dateField}
                      onChange={formik.handleChange}
                      max='31-12-9999'
                      className={styles.input}
                      id='birthday'
                      name='birthday'
                      type={type}
                      onFocus={() => changeType()}
                      onBlur={() => setType('text')}
                      placeholder='Date of birth & be surprised ;)'
                      value={formik.values.birthday}
                      autoComplete={'birthday'}
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div
                    className={[styles.input, 'flex items-center '].join(' ')}
                  >
                    <PhoneInput
                      value={phone}
                      onChange={setPhone}
                      placeholder={'Phone (Optional, for support)'}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <div
                  onClick={() => validateFields('personal', formik.values)}
                  className={[styles.checkoutButton].join(' ')}
                >
                  Save & Next Step👉
                </div>
              </div>
            </motion.div>
          </>
        )}

        {breadcrumb == 'billing' && (
          <motion.div className={styles.formFields} key='billing'>
            <div className={styles.inputFields}>
              <div className={styles.row}>
                <div>
                  <input
                    onChange={formik.handleChange}
                    className={[
                      styles.input,

                      errors.address &&
                        errors.address.error == 1 &&
                        styles.input_error,
                    ].join(' ')}
                    id='address'
                    name='address'
                    type='text'
                    placeholder='Address*'
                    autoComplete={'address'}
                    value={formik.values.address}
                    required={business ? true : false}
                  />
                  {errors.address && <span>{errors.address.message}</span>}
                </div>
                <div>
                  <input
                    onChange={formik.handleChange}
                    className={[
                      styles.input,
                      errors.city &&
                        errors.city.error == 1 &&
                        styles.input_error,
                    ].join(' ')}
                    id='city'
                    name='city'
                    type='text'
                    placeholder='City*'
                    autoComplete={'address-level2'}
                    value={formik.values.city}
                    required={business ? true : false}
                  />
                  {errors.city && <span>{errors.city.message}</span>}
                </div>
              </div>
              <div className={styles.row}>
                <div>
                  <input
                    onChange={formik.handleChange}
                    className={[
                      styles.input,
                      errors.postal_code &&
                        errors.postal_code.error == 1 &&
                        styles.input_error,
                    ].join(' ')}
                    id='postal_code'
                    name='postal_code'
                    type='text'
                    placeholder='Postal Code*'
                    value={formik.values.postal_code}
                    required={business ? true : false}
                  />
                  {errors.postal_code && (
                    <span>{errors.postal_code.message}</span>
                  )}
                </div>
                <div>
                  <div className={styles.countryField}>
                    <select
                      onChange={(e) => {
                        formik.handleChange(e);
                        setCountryCode(e.target.value);
                      }}
                      className={[styles.input].join(' ')}
                      id='countryCode'
                      name='countryCode'
                      placeholder='Country*'
                      value={formik.values.countryCode}
                      required
                    >
                      {countries.map((i, index) => (
                        <option
                          key={index}
                          value={i.value}
                        >
                          {i.name}
                        </option>
                      ))}
                    </select>

                    <ArrowDown />
                  </div>
                </div>
              </div>

              <textarea
                onChange={formik.handleChange}
                id='note'
                name='note'
                className={styles.textarea}
                placeholder={'Anything we should know about your release(s)?'}
                value={formik.values.note}
              />
              <div className={styles.checkboxContainer}>
                <div
                  onClick={() => setTerms(!terms)}
                  className={styles.checkboxItem}
                >
                  <div
                    className={[
                      styles.checkbox,
                      errors.terms && styles.checkbox_empty,
                    ].join(' ')}
                  >
                    <input type='checkbox' />
                    {terms && <span className={styles.checkmark}></span>}
                  </div>
                  <span>
                    I agree with the{' '}
                    <Link
                      href={'/terms-and-conditions'}
                      passHref
                      target='_blank'
                    >
                      <b>terms and conditions*</b>
                    </Link>
                  </span>
                </div>
                <div
                  onClick={() => setBusiness(!business)}
                  className={styles.checkboxItem}
                >
                  <div className={styles.checkbox}>
                    <input type='checkbox' />
                    {business && <span className={styles.checkmark}></span>}
                  </div>
                  <span>I am a business</span>
                </div>
              </div>

              {business && (
                <div className={styles.businessContainer}>
                  <div className={styles.row}>
                    <div>
                      <input
                        ref={businessField}
                        onChange={() => (
                          vatValidation(businessField.current.value),
                          setBusinessVAT(businessField.current.value)
                        )}
                        className={styles.input}
                        id='vat_number'
                        name='vat_number'
                        type={'text'}
                        placeholder='VAT Number (optional)'
                        value={businessVAT}
                      />
                      {validating == true && (
                        <i className={styles.fieldLoadingContainer}>
                          <Image
                            width={25}
                            height={25}
                            alt={'loader'}
                            src={loader}
                          />
                        </i>
                      )}
                    </div>
                    <div>
                      <input
                        ref={businessNameField}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className={[
                          styles.input,
                          errors.company_name &&
                            errors.company_name.error == 1 &&
                            styles.input_error,
                        ].join(' ')}
                        id='company_name'
                        name='company_name'
                        type={'text'}
                        placeholder='Company name*'
                        required={business ? true : false}
                        value={businessName}
                      />
                      {errors.company_name && (
                        <span>{errors.company_name.message}</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.row}>
                    <div>
                      <input
                        onChange={formik.handleChange}
                        className={styles.input}
                        id='chamber_of_commerce'
                        name='chamber_of_commerce'
                        type={'text'}
                        placeholder='Chamber of Commerce # (optional)'
                        value={formik.values.chamber_of_commerce}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <div
                onClick={() => setBreadcrumb('personal')}
                className={styles.backButton}
              >
                <ArrowBack color={'#b165ed'} />
              </div>

              <div
                onClick={() => validateFields('billing', formik.values)}
                className={[styles.checkoutButton].join(' ')}
              >
                Payment Methods👉
              </div>
            </div>
          </motion.div>
        )}

        {breadcrumb == 'payment' && (
          <motion.div key='payment'>
            <div className={styles.paymentMethods}>
              <ul>
                {methods &&
                  methods.map((method, index) => (
                    <li
                      onClick={() => adjustPriceForMethods(method)}
                      className={styles.method}
                      key={index}
                    >
                      <div className={styles.details}>
                        <div className={styles.checkboxContainer}>
                          <div className={styles.checkbox}>
                            <input type='checkbox' />
                            {activeMethod == method.id && (
                              <span className={styles.checkmark}></span>
                            )}
                          </div>
                          <span>{method.description}</span>
                        </div>
                      </div>

                      <Image
                        alt={method.description}
                        width='40'
                        height='30'
                        src={method.image.svg}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className={styles.buttonContainer}>
              <div
                onClick={() => setBreadcrumb('billing')}
                className={styles.backButton}
              >
                <ArrowBack color={'#b165ed'} />
              </div>
              <button
                type='submit'
                className={styles.checkoutButton}
                disabled={
                  context.order.totalPriceDetails.amount_local_incl_vat != 0
                    ? false
                    : true
                }
              >
                Pay and confirm order
              </button>
            </div>
            <span className={styles.securePayment}>
              All payments are secured and happen through our payment provider *
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default PaymentForm;
