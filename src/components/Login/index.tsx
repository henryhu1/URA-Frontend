import { useState, ChangeEvent } from 'react';
import LoginForm from 'components/forms/LoginForm';
import CreateAccountForm from 'components/forms/CreateAccountForm';
import './index.css';

const Login = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputEmail(e.currentTarget.value);
  };

  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputPassword(e.currentTarget.value);
  };

  return (
    <div className="Login">
      <LoginForm
        inputEmail={inputEmail}
        inputPassword={inputPassword}
        handleEmailInput={handleEmailInput}
        handlePasswordInput={handlePasswordInput}
      />
      <hr />
      <CreateAccountForm
        inputEmail={inputEmail}
        inputPassword={inputPassword}
        handleEmailInput={handleEmailInput}
        handlePasswordInput={handlePasswordInput}
      />
    </div>
  );
};

export default Login;
