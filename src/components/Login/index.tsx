import { useState } from 'react';
import LoginForm from 'components/forms/LoginForm';
import CreateAccountForm from 'components/forms/CreateAccountForm';
import './index.css';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [requireEmailVerification, setRequireEmailVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  return (
    <div className="Login">
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
      <hr />
      <CreateAccountForm
        setLoginUsername={setLoginUsername}
        setRequireEmailVerification={setRequireEmailVerification}
      />
    </div>
  );
};

export default Login;
