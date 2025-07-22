import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { signIn } from 'next-auth/react';

import LoadingState from '/components/LoadingStates';

import styles from './magiclink.module.scss';

const MagicLinkLogin = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div>
        <h3>Welcome back</h3>
        <span>Gaining success made easy</span>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={async (values) => {
            setLoading(true);
            await signIn('email', {
              email: values.email,
              callbackUrl: '/account/campaigns?page=1',
            });
            setLoading(false);
          }}
        >
          <Form>
            <div className={styles.formFields}>
              <div className={styles.item}>
                <Field type='text' name='email' placeholder='Email*' required />
              </div>
            </div>

            <div className={styles.submitContainer}>
              <button type='submit' className={styles.submitButton}>
                {loading == false ? 'Enter' : <LoadingState />}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default MagicLinkLogin;
