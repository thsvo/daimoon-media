//Core
import React from "react";
import ContactForm from "/components/ContactForm";
import { useRouter } from "next/router";

import Layout from "/components/Layout";
import BlogDetail from "/components/BlogDetail";
import ScrollModal from "/components/ScrollModal";
import SEO from "/components/SEO";

const Blog = (props) => {
  const { post } = props;
  const router = useRouter();

  console.log("post", post);

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <>
      <SEO title={post.title.rendered} description={post.description} />
      <Layout>
        <BlogDetail post={post} />
      </Layout>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL + `posts?slug=${params.slug}`
  );

  const posts = await res.json();
  const post = posts[0];
  console.log("res", post);
  return {
    revalidate: 10,
    props: { post },
  };
}

export default Blog;
