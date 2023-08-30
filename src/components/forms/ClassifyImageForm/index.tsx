import React, { useState, SetStateAction, Dispatch, ChangeEvent, FormEvent } from 'react';
import { api } from 'axiosConfig';
import StringConstants from 'constants/strings';
import 'components/forms/forms.css';

const ClassifyImageForm = ({
  setIsClassifying,
  setClassification,
  customizedClassifier = false
}: ClassifyImageFormProps) => {
  const [image, setImage] = useState<File>();
  const [imageURLString, setImageURLString] = useState('');
  const classifyingURL = customizedClassifier ? '/classify/customized_classifier/' : '/classify/';

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setImage(file);
    setImageURLString(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);
    setIsClassifying(true);
    await api.post(classifyingURL, formData, {
      withCredentials: true,
      headers: {
        'enctype': 'multipart/form-data',
      }
    }).then(response => {
      if (response?.status == 200) {
        setClassification(response.data.prediction);
      }
    }).catch(error => {
      setClassification('');
      console.log(error);
    }).finally(() => {
      setIsClassifying(false);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {customizedClassifier ? StringConstants.CUSTOM : StringConstants.BASIC}
      <br/>
      {!customizedClassifier && 
        <>
          <label htmlFor="img">{StringConstants.BASIC_CLASSIFIER}</label>
          <br/>
        </>
      }
      <input
        id="img"
        type="file"
        accept="image/*"
        onChange={handleInput}
      />
      {imageURLString ? (
      <>
        <br />
        <img width={500} alt="preview" src={imageURLString}/>
      </>
      ) : <></>
      }
      <br/>
      <button type="submit">
        {StringConstants.CLASSIFY}
      </button>
    </form>
  );
};

type ClassifyImageFormProps = {
  setIsClassifying: Dispatch<SetStateAction<boolean>>,
  setClassification: Dispatch<SetStateAction<string>>,
  customizedClassifier?: boolean,
};

export default ClassifyImageForm;
