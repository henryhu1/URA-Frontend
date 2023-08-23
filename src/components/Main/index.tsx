import React, { useState, useEffect } from 'react';
import ClassifyImageForm from 'components/forms/ClassifyImageForm';
import { useNavigate } from 'react-router-dom';
// import { api } from 'axiosConfig';
import useAuth from 'auth/useAuth';
import './index.css';

const Main = () => {
  const navigate = useNavigate();
  const [classification, setClassification] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);
  const { isAuthenticated } = useAuth();

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
    <div className="Main">
      {/* <UploadTrainingImagesForm />
      <ClassifyImageForm setIsClassifying={setIsClassifying} setClassification={setClassification} customizedClassifier /> */}
      <ClassifyImageForm setIsClassifying={setIsClassifying} setClassification={setClassification} />
      {isClassifying ? (
        <div className="loader" />
      ) :
      classification ?? <></>
      }
    </div>
  );
};

export default Main;
