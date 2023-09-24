import { useState, FormEvent, Dispatch, SetStateAction } from 'react';
import { Button, Input, VStack } from '@chakra-ui/react';
import { api, isAxiosError } from 'axiosConfig';
import useServerStatus from 'components/ServerStatusProvider/useServerStatus';
import StringConstants from 'constants/strings';

const CreateAccountForm = ({
  setLoginUsername,
  setRequireEmailVerification,
}: CreateAccountFormProps) => {
  const [createAccountEmail, setCreateAccountEmail] = useState('');
  const [createAccountUsername, setCreateAccountUsername] = useState('');
  const [createAccountPassword, setCreateAccountPassword] = useState('');
  const [createAccountConfirmPassword, setCreateAccountConfirmPassword] = useState('');
  const [formSubmitError, setFormSubmitError] = useState('');
  const { isServerDown } = useServerStatus();

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
      <VStack>
      <Input
        type="email"
        placeholder="Email"
        onChange={(e) => setCreateAccountEmail(e.currentTarget.value)}
      />
      <Input
        type="text"
        placeholder="Username"
        onChange={(e) => setCreateAccountUsername(e.currentTarget.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setCreateAccountPassword(e.currentTarget.value)}
      />
      <Input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setCreateAccountConfirmPassword(e.currentTarget.value)}
      />
      <span>
        <small>{formSubmitError}</small>
        <Button isDisabled={isServerDown} type="submit">
          {StringConstants.CREATE_ACCOUNT}
        </Button>
      </span>
      </VStack>
    </form>
  );
};

type CreateAccountFormProps = {
  setLoginUsername: Dispatch<SetStateAction<string>>
  setRequireEmailVerification: Dispatch<SetStateAction<boolean>>
};

export default CreateAccountForm;
