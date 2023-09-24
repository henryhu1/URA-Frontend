import { useState } from 'react';
import { StackDivider, VStack } from '@chakra-ui/react';
import Layout from 'components/common/Layout';
import LoginForm from 'components/forms/LoginForm';
import CreateAccountForm from 'components/forms/CreateAccountForm';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [requireEmailVerification, setRequireEmailVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <Layout>
      <VStack
        divider={<StackDivider w="100%" />}
        spacing={4}
        align="stretch"
      >
        <LoginForm
          loginUsername={loginUsername}
          loginPassword={loginPassword}
          requireEmailVerification={requireEmailVerification}
          verificationCode={verificationCode}
          setLoginUsername={setLoginUsername}
          setLoginPassword={setLoginPassword}
          setRequireEmailVerification={setRequireEmailVerification}
          setVerificationCode={setVerificationCode}
        />
        <CreateAccountForm
          setLoginUsername={setLoginUsername}
          setRequireEmailVerification={setRequireEmailVerification}
        />
      </VStack>
    </Layout>
  );
};

export default Login;
