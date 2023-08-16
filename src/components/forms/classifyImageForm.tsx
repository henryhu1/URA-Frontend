import React, { useState, Dispatch, SetStateAction, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const ClassifyImageForm = (props: ClassifyImageFormProps) => {
  const [image, setImage] = useState<File>();
  const [imageURLString, setImageURLString] = useState("");

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
    try {
      props.setIsClassifying(true);
      await axios.post('/classify/', formData, {
        headers: {
          'enctype': 'multipart/form-data',
          // 'X-CSRFToken': csrftoken,
        }
      }).then(response => {
        props.setClassification(response.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      props.setIsClassifying(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id="stylized"
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
      <button type="submit">
        Classify
      </button>
    </form>
  );
};

interface ClassifyImageFormProps {
  setClassification: Dispatch<SetStateAction<string>>
  setIsClassifying: Dispatch<SetStateAction<boolean>>
};

export default ClassifyImageForm;
