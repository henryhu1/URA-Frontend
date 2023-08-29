import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { api, isAxiosError } from 'axiosConfig';
import compressFiles from 'utils/files';
import NumberConstants from 'constants/numbers';
import StringConstants from 'constants/strings';
import ClassificationModels from 'enums/ClassificationModels';
import 'components/forms/forms.css';

const UploadTrainingImagesForm = () => {
  const [zippedDataset, setZippedDataset] = useState<Blob>();
  const [modelType, setModelType] = useState(ClassificationModels.InceptionV3);
  const [isDataOverLimit, setIsDataOverLimit] = useState(false);
  const [hasStartedTraining, setHasStartedTraining] = useState(false);
  const [formSubmitError, setFormSubmitError] = useState('');

  const ref = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute('directory', '');
      ref.current.setAttribute('webkitdirectory', '');
    }
  }, [ref]);

  const handleFolderInput = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    if (fileList.length > 100) {
      alert('Only 100 images allowed!');
      setIsDataOverLimit(true);
      return;
    }

    const zippedBlob = await compressFiles(fileList);

    if (zippedBlob.size > NumberConstants.MAX_UPLOAD_SIZE) {
      alert('Zipped file size exceeds the 10 MB limit!');
      setIsDataOverLimit(true);
      return;
    }
    setZippedDataset(zippedBlob);
    setIsDataOverLimit(false);
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!zippedDataset) return;

    // const zipBlob = await compressFiles(dataset);
    const formData = new FormData();
    // formData.append('dataset', dataset);
    formData.append('dataset', zippedDataset, 'compressed_folder.zip');
    formData.append('model_type', modelType);
    await api.post('/classify/upload_and_train/', formData, {
      headers: {
        'enctype': 'multipart/form-data',
      }
    }).then(() => {
      setFormSubmitError('');
      setHasStartedTraining(true);
    }).catch(error => {
      if (isAxiosError(error)) {
        setFormSubmitError(error.response?.data.error ?? error.response?.data);
      } else {
        setFormSubmitError(StringConstants.UNEXPECTED_ERROR);
      }
    });
  };

  return (
    <form onSubmit={handleUpload}>
      {StringConstants.UPLOAD_AND_TRAIN}
      <br/>
      {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({getRootProps, getInputProps}) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone> */}
      <input
        type="file"
        name="upload dataset"
        onChange={handleFolderInput}
        ref={ref}
      />
      <br/>
      {StringConstants.MODEL_SELECTION}<br/>
      {Object.entries(ClassificationModels).map(([key, value]) =>
        <div key={key}>
          <input
            id={key}
            type="radio"
            disabled={(value as ClassificationModels) == ClassificationModels.VisionTransformer}
            defaultChecked={(value as ClassificationModels) == ClassificationModels.InceptionV3}
            name="modelType"
            value={key}
            onChange={() => setModelType(value)}
          />
          <label htmlFor={key}>{key}</label>
          <br/>
        </div>
      )}
      <span className="input-help">
        <small>{formSubmitError}</small>
        <small>{hasStartedTraining ? StringConstants.CURRENTLY_TRAINING : ""}</small>
        <button type="submit" disabled={isDataOverLimit}>
          {StringConstants.START_TRAINING}
        </button>
        <small>{StringConstants.TRAINING_TIME}</small>
      </span>
    </form>
  );
};

export default UploadTrainingImagesForm;
