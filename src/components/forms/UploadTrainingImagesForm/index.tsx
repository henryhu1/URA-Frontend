import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button, Flex, SimpleGrid, Heading, Text, VStack } from '@chakra-ui/react';
import { api, isAxiosError } from 'axiosConfig';
import compressFiles from 'utils/files';
import NumberConstants from 'constants/numbers';
import StringConstants from 'constants/strings';
import ClassificationModels from 'enums/ClassificationModels';
import DirectoryTree from 'components/InputDataDirectory';

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
      alert('Zipped file size exceeds the 5MB limit!');
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
    console.log(zippedDataset.size);
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
      <VStack spacing={4}>
        <Heading>{StringConstants.UPLOAD_AND_TRAIN}</Heading>
        <SimpleGrid columns={3}>
          <DirectoryTree />
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
          <Flex direction="column" alignItems="center" justifyContent="center">
            <div>
              <input
                type="file"
                name="upload dataset"
                onChange={handleFolderInput}
                ref={ref}
              />
            </div>
            <Text>{StringConstants.MODEL_SELECTION}</Text>
            {Object.entries(ClassificationModels).map(([key, value]) =>
              <div key={key}>
                <input
                  id={key}
                  type="radio"
                  // disabled={(value as ClassificationModels) == ClassificationModels.VisionTransformer}
                  defaultChecked={(value as ClassificationModels) == ClassificationModels.InceptionV3}
                  name="modelType"
                  value={key}
                  onChange={() => setModelType(value)}
                />
                <label htmlFor={key}>{key}</label>
              </div>
            )}
            <small>{formSubmitError}</small>
            <small>{hasStartedTraining ? StringConstants.CURRENTLY_TRAINING : ""}</small>
            <Button type="submit" disabled={isDataOverLimit} isLoading={hasStartedTraining}>
              {StringConstants.START_TRAINING}
            </Button>
            <Text align="center">{StringConstants.TRAINING_TIME}</Text>
          </Flex>
        </SimpleGrid>
      </VStack>
    </form>
  );
};

export default UploadTrainingImagesForm;
