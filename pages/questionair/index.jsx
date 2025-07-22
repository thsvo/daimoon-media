import { Widget } from '@typeform/embed-react';

import Layout from '/components/Layout';

const contact = (props) => {
  return (
    <Layout>
      <div className='wrapper flex flex-col center'>
        <h1 className='text-center'>
          Help us increase your audience
          <br /> by answering the following 5 simple questions.
        </h1>
        <span>
          By filling out the survey, you help us better understand your unique
          needs and goals, and tailor our services and support to better suit
          you.
        </span>
      </div>
      <div className={['wrapper', 'mt100', 'mb-[100px] '].join(' ')}>
        <Widget id='jkIclmQr' style={{ height: '650px', width: '100%' }} />
      </div>
    </Layout>
  );
};

export default contact;
