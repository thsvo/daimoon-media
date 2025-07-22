import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import House from '/public/icons/house';
import Money from '/public/icons/money';
import Branded from '/public/icons/branded';
import Gears from '/public/icons/gears';

import styles from './accountmenu.module.scss';

const AccountMenu = () => {
  const router = useRouter();
  const [active, setActive] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    setActive(router.pathname.split('/account/').pop());
  }, [router.pathname]);

  return (
    <div className={styles.container}>
      <ul>
        <Link passHref={true} href={'/account/campaigns?page=1'}>
          <li
            onClick={() => setActive('campaigns')}
            className={active == 'campaigns' && styles.active}
          >
            <span>
              <House /> <label>My campaigns</label>
            </span>
          </li>
        </Link>

        {session.user.userRole == 'admin' ? (
          <>
            <Link passHref={true} href={'/account/resellers'}>
              <li
                onClick={() => setActive('resellers')}
                className={active == 'resellers' && styles.active}
              >
                <span>
                  <Branded color={'#fdfdfd'} /> <label>Custom packages</label>
                </span>
              </li>
            </Link>
          </>
        ) : (
          session.user.userRole == 'reseller' && (
            <Link passHref={true} href={'/account/resellers'}>
              <li
                onClick={() => setActive('resellers')}
                className={active == 'resellers' && styles.active}
              >
                <span>
                  <Branded color={'#fdfdfd'} /> <label>Custom packages</label>
                </span>
              </li>
            </Link>
          )
        )}
        <Link passHref={true} href={'/account/orders?page=1'}>
          <li
            onClick={() => setActive('orders')}
            className={active == 'orders' && styles.active}
          >
            <span>
              <Money /> <label>Order history</label>
            </span>
          </li>
        </Link>
      </ul>
      {session.user.userRole == 'admin' && (
        <ul>
          <label>Admin portal</label>
          <Link passHref={true} href={'/account/admin/coupon'}>
            <li
              onClick={() => setActive('coupon')}
              className={active == 'coupon' && styles.active}
            >
              <span>
                <label>Coupons</label>
              </span>
            </li>
          </Link>
          <Link passHref={true} href={'/account/admin/users'}>
            <li
              onClick={() => setActive('users')}
              className={active == 'users' && styles.active}
            >
              <span>
                <label>Manage Users</label>
              </span>
            </li>
          </Link>
        </ul>
      )}

      <ul>
        <Link passHref={true} href={'/account/settings'}>
          <li
            onClick={() => setActive('settings')}
            className={active == 'settings' && styles.active}
          >
            <span>
              <Gears /> <label>Settings</label>
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default AccountMenu;
