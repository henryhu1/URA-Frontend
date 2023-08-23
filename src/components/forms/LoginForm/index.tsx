import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, isAxiosError } from 'axiosConfig';
import useAuth from 'auth/useAuth';
import StringConstants from 'constants/strings';
import 'components/forms/forms.css';

const LoginForm = ({
  inputEmail,
  inputPassword,
  handleEmailInput,
  handlePasswordInput,
}: LoginFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formSubmitError, setFormSubmitError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', inputEmail);
    formData.append('password', inputPassword);
    await api.post('/classify/authenticate_user/', formData, {
      headers: {
        'enctype': 'multipart/form-data',
      }
    }).then(response => {
      if (response?.status == 200) {
        if (response.data.is_verified) {
          login();
          const token = response.data.access_token;
          localStorage.setItem('token', token);
          navigate('/myaccount');
        } else {
          navigate('/verifyaccount');
        }
      }
    }).catch(error => {
      if (isAxiosError(error)) {
        setFormSubmitError(error.response?.data.error ?? error.response?.data.detail);
      } else {
        setFormSubmitError(StringConstants.UNEXPECTED_ERROR);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        onChange={handleEmailInput}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordInput}
      />
      <br />
      <span className="input-help">
        <small>{formSubmitError}</small>
        <button type="submit">
          {StringConstants.LOGIN}
        </button>
      </span>
    </form>
  );
};

type LoginFormProps = {
  inputEmail: string,
  inputPassword: string,
  handleEmailInput: (e: ChangeEvent<HTMLInputElement>) => void,
  handlePasswordInput: (e: ChangeEvent<HTMLInputElement>) => void,
};

export default LoginForm;
