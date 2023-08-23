import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'axiosConfig';
import useAuth from 'auth/useAuth';
import UploadTrainingImagesForm from 'components/forms/UploadTrainingImagesForm';
import ClassifyImageForm from 'components/forms/ClassifyImageForm';
import './index.css';

const MyAccount = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [customClassification, setCustomClassification] = useState('');
  const [isCustomClassifying, setIsCustomClassifying] = useState(false);
  const [classification, setClassification] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);

  const fetchData = async () => {
    await api.get('/classify/my_account/')
      .then(response => {
        if (response?.status == 200) {
          if (!response.data.is_verified) {
            navigate('/verifyaccount');
          }
        }
      }).catch(() => {
        navigate('/login');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Account">
      {"UPLOAD"}
      <UploadTrainingImagesForm />
      <hr/>
      {"CUSTOM"}
      <ClassifyImageForm setIsClassifying={setIsCustomClassifying} setClassification={setCustomClassification} customizedClassifier />
      {isCustomClassifying ? (
        <div className="loader" />
      ) :
      customClassification ?? <></>
      }
      <hr/>
      {"BASIC"}
      <ClassifyImageForm setIsClassifying={setIsClassifying} setClassification={setClassification} />
      {isClassifying ? (
        <div className="loader" />
      ) :
      classification ?? <></>
      }
    </div>
  );
};

export default MyAccount;
