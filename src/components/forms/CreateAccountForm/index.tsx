import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, isAxiosError } from 'axiosConfig';
import StringConstants from 'constants/strings';
import 'components/forms/forms.css';

const CreateAccountForm = ({
  inputEmail,
  inputPassword,
  handleEmailInput,
  handlePasswordInput,
}: CreateAccountFormProps) => {
  const navigate = useNavigate();
  const [inputUsername, setInputUsername] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [formSubmitError, setFormSubmitError] = useState('');
  const [creatingAccount, setCreatingAccount] = useState(false);

  const handleUsernameInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputUsername(e.currentTarget.value);
  };

  const handleConfirmPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputConfirmPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputPassword != inputConfirmPassword) {
      setFormSubmitError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append('email', inputEmail);
    formData.append('username', inputUsername);
    formData.append('password', inputPassword);
    setCreatingAccount(true);
    await api.post('/classify/register_user/', formData, {
      headers: {
        'enctype': 'multipart/form-data',
      }
    }).then(response => {
      if (response?.status == 200) {
        setFormSubmitError('');
        navigate('/verifyaccount');
      }
    }).catch(error => {
      if (isAxiosError(error)) {
        setFormSubmitError(error.response?.data.error ?? error.response?.data);
      } else {
        setFormSubmitError(StringConstants.UNEXPECTED_ERROR);
      }
    }).finally(() => {
      setCreatingAccount(false);
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
        type="text"
        placeholder="Username"
        onChange={handleUsernameInput}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handlePasswordInput}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={handleConfirmPasswordInput}
      />
      <br />
      <span className="input-help">
        <small>{formSubmitError}</small>
        <button type="submit">
          {StringConstants.CREATE_ACCOUNT}
        </button>
      </span>
      {creatingAccount ?
        <div className="loading-dots">
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
        </div> : <></>
      }
    </form>
  );
};

type CreateAccountFormProps = {
  inputEmail: string,
  inputPassword: string,
  handleEmailInput: (e: ChangeEvent<HTMLInputElement>) => void,
  handlePasswordInput: (e: ChangeEvent<HTMLInputElement>) => void,
};

export default CreateAccountForm;
