import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.asPath.includes('?ref=mthlzdg') &&
      router.push('https://casestudy.daimoon.media/landing-page/');
  });

  return router.asPath.includes('?ref=mthlzdg') ? (
    <div className='wrapper'>
      <h1>{`Almost there! You'll get redirected to the case-study in 3, 2, 1...`}</h1>
    </div>
  ) : (
    <div className='wrapper'>
      <h1>404 - Page Not Found</h1>
    </div>
  );
}
