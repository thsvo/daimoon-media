import faq from '/json/Faq/faq.json';

import ContactMethods from '/components/ContactMethods';
import Layout from '/components/Layout';
import SEO from '/components/SEO';

const contact = (props) => {
  const { questions } = props;

  return (
    <div>
      <SEO
        title={'Contact DaimoonMedia | Write The Team | FAQ'}
        description={
          'Find the answers to your questions. Talk to the team about your order, bigger campaigns and partnerships. We’re here to help.'
        }
      />
      <Layout>
        <ContactMethods questions={questions} />
      </Layout>
    </div>
  );
};

export async function getStaticProps(context) {
  const questions = faq;

  return {
    props: { questions }, // will be passed to the page component as props
  };
}

export default contact;
