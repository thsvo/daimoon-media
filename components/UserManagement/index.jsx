import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Modal from '/components/Modal';

import clsx from 'clsx';
import Magnifier from '/public/icons/magnifier';

const UserManagement = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [reseller, setReseller] = useState(null);
  const [packages, setPackages] = useState(null);
  const [modal, setModal] = useState({
    visible: false,
    status: 'succes',
    message: 'Song found!',
  });

  const validateEmail = async () => {
    if (email) {
      const validatedUser = await fetch('/api/manageUsers/' + email, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((res) => {
          return res;
        });

      setUser(validatedUser);

      if (
        validatedUser.userRole == 'reseller' ||
        validatedUser.userRole == 'admin'
      ) {
        //API returns existing reseller object
        const result = await fetch('/api/manageResellers/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: validatedUser.id,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            return res;
          });

        setReseller(result.reseller);
        await getPackages(result.reseller.id);
      }
    } else {
      setUser(null);
      setRole('');
    }
  };

  const savePackage = async (values) => {
    await fetch('/api/managePackages/post', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: values,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setModal({
          visible: true,
          status: 'succes',
          message: 'Package added',
        });
      });

    await getPackages(reseller.id);
  };

  const saveUser = async (selectedRole) => {
    await fetch('/api/manageUsers/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        role: selectedRole || user.userRole,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        return res;
      });

    if (selectedRole == 'reseller') {
      const result = await fetch('/api/manageResellers/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          return res;
        });

      setRole(selectedRole);

      setReseller({ packages: result.packages, ...result.reseller });
    }

    setModal({
      visible: true,
      status: 'succes',
      message: 'User saved',
    });
  };

  const deletePackage = async (packageId) => {
    await fetch('/api/managePackages/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: packageId,
      }),
    });

    await getPackages(reseller.id);

    setModal({
      visible: true,
      status: 'succes',
      message: 'Package deleted',
    });
  };

  const getPackages = async (resellerId) => {
    await fetch('/api/managePackages/get', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resellerId: resellerId,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        setPackages(res);
      });
  };

  return (
    <div>
      <div className='flex'>
        <input
          type='email'
          placeholder='Search profiles'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx(
            user && 'border-2 border-green-500',
            'bg-[#363636] rounded-[10px] rounded-br-none rounded-tr-none h-[59px] w-[284px] pl-[21px] text-white border-solid'
          )}
        ></input>
        <button
          className={
            'h-[59px] w-[59px] rounded-[10px] rounded-bl-none rounded-tl-none border-none bg-[#b165ed] cursor-pointer'
          }
          onClick={() => validateEmail()}
        >
          <Magnifier color='#fdfdfd' />
        </button>
      </div>
      <div></div>
      {user && (
        <>
          <h2>Details</h2>
          <div className=''>
            <div>
              <label>Name: </label>
              <span>{user.name || 'Unspecified'}</span>
            </div>
            <div>
              <label>Email: </label>
              <span>{user.email || 'Unspecified'}</span>
            </div>
            <div>
              <label>Role: </label>
              <select name='Role' onChange={(e) => saveUser(e.target.value)}>
                <option value='' selected>
                  Select an option
                </option>
                <option value='admin'>Admin</option>
                <option value='reseller'>Reseller</option>
                <option value='client'>Client</option>
              </select>
            </div>
          </div>
          {role == 'reseller' && (
            <div>
              <div>
                <h2>Add Packages</h2>
                <Formik
                  initialValues={{
                    name: '',
                    streams: '',
                    followers: '',
                    costInEuro: '',
                    resellerId: reseller.id,
                  }}
                  onSubmit={async (values) => savePackage(values)}
                >
                  <Form className='flex gap-4'>
                    <div className='gap-4 flex'>
                      <Field
                        name='name'
                        type='text'
                        placeholder='Package name'
                        className={clsx(
                          'bg-[#363636] rounded-[10px]  h-[49px] w-[204px] pl-[21px] text-white border-solid'
                        )}
                        required
                      ></Field>
                      <Field
                        name='streams'
                        type='text'
                        placeholder='Streams'
                        className={clsx(
                          'bg-[#363636] rounded-[10px]  h-[49px] w-[204px] pl-[21px] text-white border-solid'
                        )}
                        required
                      ></Field>
                      <Field
                        name='followers'
                        type='text'
                        placeholder='Followers'
                        className={clsx(
                          'bg-[#363636] rounded-[10px]  h-[49px] w-[204px] pl-[21px] text-white border-solid'
                        )}
                        required
                      ></Field>
                      <Field
                        name='costInEuro'
                        type='text'
                        placeholder='Price in Dollars'
                        className={clsx(
                          'bg-[#363636] rounded-[10px]  h-[49px] w-[204px] pl-[21px] text-white border-solid'
                        )}
                        required
                      ></Field>
                    </div>

                    <button
                      type='submit'
                      className='rounded-[10px] h-[49px] w-[49px] text-white bg-[#b165ed] text-[16px] font-bold border-none'
                    >
                      +
                    </button>
                  </Form>
                </Formik>
              </div>
              <div>
                <h2>Available packages</h2>
                {reseller && packages && (
                  <div>
                    <table>
                      <tr>
                        <th></th>
                        <th className='bg-[#b165ed] py-2'>Name</th>
                        <th className='bg-[#b165ed] py-2'>costInDollar</th>
                        <th className='bg-[#b165ed] py-2'>Streams</th>
                        <th className='bg-[#b165ed] py-2'>Followers</th>
                        <th className='bg-[#b165ed] py-2'>Custom</th>
                      </tr>
                      <tbody>
                        {packages.map((item, key) => (
                          <tr key='key'>
                            <td
                              className='text-center'
                              onClick={() => deletePackage(item.id)}
                            >
                              <u>REMOVE</u>
                            </td>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>{item.costInEuro}</td>
                            <td className='text-center'>{item.streams}</td>
                            <td className='text-center'>{item.followers}</td>
                            <td className='text-center'>{item.custom}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
      <Modal show={modal} />
    </div>
  );
};

export default UserManagement;
