import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import AccountMenu from '/components/AccountMenu';

export default function Layout({ children }) {
  const router = useRouter();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 1);
    });
  }, []);

  return (
    <>
      <>
        <main>
          {router.pathname.includes('/account/') ? (
            //Account layout
            <Auth>
              <div className={'wrapper mt50'}>
                <AccountMenu />
                <div className={'accountWrapper'}>{children}</div>
              </div>
            </Auth>
          ) : (
            children
          )}
        </main>
      </>
    </>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const router = useRouter();
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  if (status === 'loading') {
    return <div className={'wrapper'}>Loading...</div>;
  }

  // Admin users gets ccess to every page
  if (data.user.userRole == 'admin') {
    return children;
  } else {
    if (router.asPath.includes('admin')) {
      router.push('/');
    }

    if (
      router.asPath.includes('resellers') &&
      data.user.userRole != 'reseller'
    ) {
      router.push('/');
    }

    return children;
  }

  //: { user: { userRole },  },
}
