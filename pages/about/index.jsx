import Title from '/components/Title';
import FAQ from '/components/FAQ';
import SEO from '/components/SEO';
import Layout from '/components/Layout';

import faq from '/json/Faq/faq.json';

const About = (props) => {
  const { questions } = props;
  const color = '#B165ED';

  let selection = (questions.types[0].questions.length = 6);

  return (
    <>
      <SEO
        title={'About DaimoonMedia | Music Promotion Agency | Review'}
        description={
          'Meet the team, discover our history and learn how we evolved into the most forward-thinking music promotion agency for Spotify, YouTube, SoundCloud & more.'
        }
      />
      <Layout>
        <Title title='Who we are. Our DNA. Your partner?' />
        <div className={['wrapper', 'column'].join(' ')}>
          <p>
            Of course! You’re picking your team players and it’s important to
            understand how they think, what they stand for and what keeps them
            going.
          </p>
          <p>
            Ultimately, we’re a music promotion agency. But really, we’re just a
            dedicated team of artists, managers, marketers, developers and
            creative minds with a heart for music and{' '}
            <b>a united mission to help artists reach their full potential.</b>
          </p>
          <p>To be acknowledged and gain respect as an artist.</p>
          <p>
            Founded in <b>Rotterdam, The Netherlands</b> in March 2015, we’re
            bringing a European approach to a global music vision.
          </p>
          <p>Young, driven, enthusiastic, ambitious and refreshing.</p>
          <p>
            This vision starts with the realization that everyone comes from a
            different place. With individual goals, alternate schedules,
            changing budgets, a unique music/brand, and with each their own
            opportunities and momentum along the way.
          </p>
          <p>Having that in mind:</p>
          <p>
            <b>
              We help upcoming talent find their audience and we help
              breakthrough artists hit the gas and scale to the highest heights.
            </b>
          </p>
          <p>
            With dedication, expertise, flexibility, efficiency and clarity.
          </p>
          <p>Carefully curated to your needs and resources.</p>
          <p>
            We listen. We curate. We think. We talk. We adapt. We bite. We test.
            We fall. We rise.
          </p>
          <p>Being a catalyst for the artists of tomorrow.</p>
          <p>
            Whether you’re ready for our <u>independent expertise</u> for one of
            your releases or our <u>full-stack music marketing programs</u>, our
            door is open to anyone!
          </p>
          <p>We’re excited to meet you.</p>
        </div>
        <Title
          title={
            'Perhaps you have a few more questions? We’ve prepared some answers below.'
          }
        />
        <div className={['wrapper', 'column'].join(' ')}>
          {questions && (
            <FAQ
              title={''}
              sub={''}
              color={color}
              service={'about'}
              questions={questions.types}
            />
          )}
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps(context) {
  const questions = faq.find((item) => item.service === 'about');
  //const selection = questions.splice(0, 6);

  return {
    props: { questions }, // will be passed to the page component as props
  };
}

export default About;
