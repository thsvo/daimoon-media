import { useState } from 'react';
import Modal from '/components/Modal';

import { Formik, Form, Field } from 'formik';
import { saveCoupon } from '/lib/Coupons';
import LoadingState from '/components/LoadingStates';

import styles from './couponcontainer.module.scss';

const CouponContainer = ({ coupons }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [modal, setModal] = useState({
    visible: false,
    status: 'succes',
    message: 'Song found!',
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.createContainer}>
          <Formik
            initialValues={{
              name: '',
              code: '',
              amount: '',
              type: '%',
              stackable: '',
              reusable: '',
            }}
            onSubmit={async (values) => {
              setLoading(true);
              saveCoupon(values).then(() => {
                setModal({
                  visible: true,
                  status: 'succes',
                  message: 'Coupon added',
                });
                setLoading(false);
              });
            }}
          >
            <Form>
              <div className={styles.item}>
                <Field type='text' name='name' placeholder='Name' required />
              </div>
              <div className={styles.item}>
                <Field type='text' name='code' placeholder='Code' required />
              </div>
              <div className={styles.item}>
                <Field
                  type='number'
                  name='amount'
                  placeholder='Amount'
                  required
                />
                <Field className={styles.typeSelector} as='select' name='type'>
                  <option value='%'>%</option>
                  <option value='$'>USD</option>
                </Field>
              </div>

              <div className={styles.item}>
                <Field as='select' name='stackable'>
                  <option value='null'>Stackable</option>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Field>
              </div>
              <div className={styles.item}>
                <Field as='select' name='reusable'>
                  <option value='null'>Reuseable</option>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </Field>
              </div>

              <button disabled={loading}>
                {loading == 'true' ? <LoadingState /> : 'SAVE'}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
      <div className={[styles.container, 'mt20'].join(' ')}>
        <div className={styles.overviewContainer}>
          <table>
            <tr className={styles.tableHeader}>
              <th></th>
              <th>Created</th>
              <th>Name</th>
              <th>Code</th>
              <th>Amount</th>
              <th>Stackable</th>
              <th>Reusable</th>
              <th>Used</th>
            </tr>
            <tbody>
              {coupons &&
                coupons.map((item, index) => (
                  <tr key={index}>
                    <td>{item.rowid}</td>
                    <td>{item.created_at}</td>
                    <td>{item.name}</td>
                    <td>{item.code}</td>
                    <td>
                      {item.amount.includes('%')
                        ? item.amount
                        : item.amount + ' USD'}
                    </td>
                    <td>{item.stackable == 0 ? 'No' : 'Yes'}</td>
                    <td>{item.reusable == 0 ? 'No' : 'Yes'}</td>
                    <td>{item.used}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={modal} />
    </>
  );
};

export default CouponContainer;
