import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, VStack } from '@chakra-ui/react';
import { api, isAxiosError } from 'axiosConfig';
import useAuth from 'components/AuthProvider/useAuth';
import useServerStatus from 'components/ServerStatusProvider/useServerStatus';
import StringConstants from 'constants/strings';

const LoginForm = ({
  loginUsername,
  loginPassword,
  requireEmailVerification,
  verificationCode,
  setLoginUsername,
  setLoginPassword,
  setRequireEmailVerification,
  setVerificationCode,
}: LoginFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isServerDown } = useServerStatus();
  const [formSubmitError, setFormSubmitError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', loginUsername);
    formData.append('password', loginPassword);
    formData.append('code', verificationCode);
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
          setRequireEmailVerification(true);
          setFormSubmitError(StringConstants.EMAIL_VERIFICATION_REQUIRED);
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

  const handleResendVerificationEmail = async () => {
    const formData = new FormData();
    formData.append('username', loginUsername);
    await api.post('/classify/resend_email_verification/', formData, {
      headers: {
        'enctype': 'multipart/form-data',
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
      <VStack>
        <Input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.currentTarget.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setLoginPassword(e.currentTarget.value)}
        />
        {requireEmailVerification &&
          <>
            <small>{StringConstants.VERIFICATION_CODE}</small>
            <Input
              type="text"
              // size={6}
              maxLength={6}
              onChange={(e) => setVerificationCode(e.currentTarget.value)}
            />
            <Button onClick={() => handleResendVerificationEmail()}>
              {StringConstants.RESEND_VERIFICATION_EMAIL}
            </Button>
          </>
        }
        <span>
          <small>{formSubmitError}</small>
          <Button isDisabled={isServerDown} type="submit">
            {requireEmailVerification ? StringConstants.VERIFY : StringConstants.LOGIN}
          </Button>
        </span>
      </VStack>
    </form>
  );
};

type LoginFormProps = {
  loginUsername: string,
  loginPassword: string,
  requireEmailVerification: boolean,
  verificationCode: string,
  setLoginUsername: Dispatch<SetStateAction<string>>
  setLoginPassword: Dispatch<SetStateAction<string>>
  setRequireEmailVerification: Dispatch<SetStateAction<boolean>>
  setVerificationCode: Dispatch<SetStateAction<string>>
};

export default LoginForm;
