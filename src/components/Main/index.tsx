import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, VStack } from '@chakra-ui/react';
import useAuth from 'components/AuthProvider/useAuth';
import useServerStatus from 'components/ServerStatusProvider/useServerStatus';
import Layout from 'components/common/Layout';
import ClassifyImageForm from 'components/forms/ClassifyImageForm';
import FeatureList from 'components/FeatureList';
import StringConstants from 'constants/strings';

const Main = () => {
  const navigate = useNavigate();
  const [classification, setClassification] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isServerDown } = useServerStatus();

  // const checkAccount = async () => {
  //   await api.get('/classify/my_account/')
  //     .then(response => {
  //       if (response?.status == 200) {
  //         if (!response.data.is_verified) {
  //           navigate('/verifyaccount');
  //         } else {
  //           navigate('/myaccount');
  //         }
  //       }
  //     }).catch(() => {
  //       navigate('/login');
  //     });
  // };

  useEffect(() => {
    // checkAccount();
    if (isAuthenticated) {
      navigate('/myaccount');
    }
  }, []);

  return (
    <Layout>
      <VStack
        spacing={4}
        align="center"
      >
        {isServerDown && <Text>{StringConstants.SERVER_DOWN}</Text>}
        <ClassifyImageForm
          isClassifying={isClassifying}
          setIsClassifying={setIsClassifying}
          setClassification={setClassification}
        />
        <Text>{classification}</Text>
        <FeatureList />
      </VStack>
    </Layout>
  );
};

export default Main;
