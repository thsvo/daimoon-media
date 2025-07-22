import AuthForm from '/components/AuthForm';
import Layout from '/components/Layout';

const Login = (props) => {
  return (
    <Layout>
      <div className={['wrapper', 'mt100', 'mb100'].join(' ')}>
        <AuthForm />
      </div>
    </Layout>
  );
};

export default Login;
