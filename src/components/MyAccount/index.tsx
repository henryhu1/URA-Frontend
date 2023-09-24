import React, { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { StackDivider, Skeleton, Text, VStack, Flex } from '@chakra-ui/react';
import { api } from 'axiosConfig';
import Layout from 'components/common/Layout';
import UploadTrainingImagesForm from 'components/forms/UploadTrainingImagesForm';
import DeleteCustomModel from 'components/DeleteCustomModel';
import ClassifyImageForm from 'components/forms/ClassifyImageForm';

const MyAccount = () => {
  const navigate = useNavigate();
  const [gettingUserData, setGettingUserData] = useState(true);
  const [hasCustomModel, setHasCustomModel] = useState(false);
  const [deletingCustomModel, setDeletingCustomModel] = useState(false);
  const [isTraining, setIsTraining] = useState(true);
  const [customClassification, setCustomClassification] = useState('');
  const [isCustomClassifying, setIsCustomClassifying] = useState(false);
  const [classification, setClassification] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);

  const fetchData = async () => {
    await api.get('/classify/my_account/')
      .then(response => {
        if (response?.status == 200) {
          if (!response.data.is_verified) {
            navigate('/login');
          } else {
            setGettingUserData(false);
            setHasCustomModel(response.data.existing_model);
            setIsTraining(response.data.running_task);
          }
        }
      }).catch(() => {
        navigate('/login');
      });
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDeletingCustomModel(true);
    await api.delete('/classify/delete_custom_model')
      .then(response => {
        if (response?.status == 200) {
          fetchData();
        }
        setDeletingCustomModel(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <VStack
        divider={<StackDivider w="100%"/>}
        spacing={4}
        align="stretch"
      >
        {hasCustomModel ?
          <DeleteCustomModel
            deletingCustomModel={deletingCustomModel}
            handleDeleteModel={handleDelete}
          /> : null
        }
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Skeleton isLoaded={!gettingUserData}>
            {!isTraining &&
              hasCustomModel ?
                <>
                  <ClassifyImageForm
                    isClassifying={isCustomClassifying}
                    setIsClassifying={setIsCustomClassifying}
                    setClassification={setCustomClassification}
                    customizedClassifier
                  />
                  <Text>{customClassification}</Text>
                </> :
                <UploadTrainingImagesForm />
            }
          </Skeleton>
        </Flex>
        <Flex direction="column" alignItems="center" justifyContent="center">
          <ClassifyImageForm
            isClassifying={isClassifying}
            setIsClassifying={setIsClassifying}
            setClassification={setClassification}
          />
          <Text>{classification}</Text>
        </Flex>
      </VStack>
    </Layout>
  );
};

export default MyAccount;
