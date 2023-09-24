import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
// import { api } from 'axiosConfig';
// import useAuth from 'auth/useAuth';
import useAuth from 'components/AuthProvider/useAuth';
import Layout from 'components/common/Layout';
import StringConstants from 'constants/strings';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Layout>
      <Text>{StringConstants.LOGOUT_DONE}</Text>
    </Layout>
  );
};

export default Logout;
