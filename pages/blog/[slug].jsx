import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function BlogSlugRedirect() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      router.replace(`/knowledge/${slug}`);
    }
  }, [slug, router]);

  return <div>Redirecting...</div>;
}

// Server-side redirect
export async function getServerSideProps(context) {
  const { slug } = context.params;

  return {
    redirect: {
      destination: `/knowledge/${slug}`,
      permanent: true, // 308 permanent redirect (good for SEO)
    },
  };
}