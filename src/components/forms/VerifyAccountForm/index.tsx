import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, isAxiosError } from 'axiosConfig';
import StringConstants from 'constants/strings';

const VerifyAccountForm = () => {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState('');
  const [formSubmitError, setFormSubmitError] = useState('');

  const handleCodeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCodeInput(e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('code', codeInput);
    await api.post('/classify/verify_email/', formData, {
      headers: {
        'enctype': 'multipart/form-data',
      }
    }).then(response => {
      if (response?.status == 200) {
        setFormSubmitError('');
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        navigate('/myaccount');
      }
    }).catch(error => {
      if (isAxiosError(error)) {
        if (error.response?.data.error) {
          setFormSubmitError(error.response?.data.error);
        } else if (error.response?.data.details) {
          setFormSubmitError(error.response?.data.details);
        } else {
          setFormSubmitError(error.response?.data);
        }
      } else {
        setFormSubmitError(StringConstants.UNEXPECTED_ERROR);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {codeInputArray.map((value, index) => (
        <DigitInput
          key={index}
          value={value}
          index={index}
          focus={focusedInput === index}
          onValueChange={handleCodeInput}
          onKeyDown={onKeyDown}
        />
      ))} */}
      <input
        type="text"
        size={6}
        maxLength={6}
        onChange={handleCodeInput}
      />
      <br />
      <span className="input-help">
        <small>{formSubmitError}</small>
        <button type="submit">
          {StringConstants.VERIFY}
        </button>
      </span>
    </form>
  );
};

export default VerifyAccountForm;
