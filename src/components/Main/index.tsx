import React, { useState, } from 'react';
import ClassifyImageForm from 'components/forms/ClassifyImageForm';
import './index.css';

const Main = () => {
  const [classification, setClassification] = useState('');
  const [isClassifying, setIsClassifying] = useState(false);

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
