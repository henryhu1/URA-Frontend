import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { api, isAxiosError } from 'axiosConfig';
import StringConstants from 'constants/strings';
import 'components/forms/forms.css';

const CreateAccountForm = ({
  setLoginUsername,
  setRequireEmailVerification,
}: CreateAccountFormProps) => {
  const [createAccountEmail, setCreateAccountEmail] = useState('');
  const [createAccountUsername, setCreateAccountUsername] = useState('');
  const [createAccountPassword, setCreateAccountPassword] = useState('');
  const [createAccountConfirmPassword, setCreateAccountConfirmPassword] = useState('');
  const [formSubmitError, setFormSubmitError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (createAccountPassword != createAccountConfirmPassword) {
      setFormSubmitError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append('email', createAccountEmail);
    formData.append('username', createAccountUsername);
    formData.append('password', createAccountPassword);
    await api.post('/classify/register_user/', formData, {
      headers: {
        'enctype': 'multipart/form-data',
      }
    }).then(response => {
      if (response?.status == 200) {
        setFormSubmitError('');
        setRequireEmailVerification(true);
        setLoginUsername(createAccountUsername);
      }
    }).catch(error => {
      if (isAxiosError(error)) {
        setFormSubmitError(error.response?.data.error ?? error.response?.data);
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
        onChange={(e) => setCreateAccountEmail(e.currentTarget.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setCreateAccountUsername(e.currentTarget.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setCreateAccountPassword(e.currentTarget.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setCreateAccountConfirmPassword(e.currentTarget.value)}
      />
      <br />
      <span className="input-help">
        <small>{formSubmitError}</small>
        <button type="submit">
          {StringConstants.CREATE_ACCOUNT}
        </button>
      </span>
    </form>
  );
};

type CreateAccountFormProps = {
  setLoginUsername: Dispatch<SetStateAction<string>>
  setRequireEmailVerification: Dispatch<SetStateAction<boolean>>
};

export default CreateAccountForm;
