import React, { useState, useEffect, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'axiosConfig';
import useAuth from 'auth/useAuth';
import UploadTrainingImagesForm from 'components/forms/UploadTrainingImagesForm';
import DeleteCustomModel from 'components/DeleteCustomModel';
import ClassifyImageForm from 'components/forms/ClassifyImageForm';
import './index.css';

const MyAccount = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [gettingUserData, setGettingUserData] = useState(true);
  const [hasCustomModel, setHasCustomModel] = useState(false);
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
          } else {
            setGettingUserData(false);
            setHasCustomModel(response.data.existing_model);
          }
        }
      }).catch(() => {
        navigate('/login');
      });
  };

  const handleDelete = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await api.delete('/classify/delete_custom_model')
      .then(() => {
        fetchData();
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Account">
      {gettingUserData ?
        <div className="loading-dots">
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
          <div className="loading-dots--dot"></div>
        </div> :
        <div className="Customized">
          {hasCustomModel ?
            <>
              <DeleteCustomModel handleDeleteModel={handleDelete} />
              <ClassifyImageForm setIsClassifying={setIsCustomClassifying} setClassification={setCustomClassification} customizedClassifier />
              {isCustomClassifying ? (
                <div className="loader" />
              ) :
              customClassification ?? <></>
              }
            </> :
            <UploadTrainingImagesForm />
          }
        </div>
      }
      <hr/>
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
