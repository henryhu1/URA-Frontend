import React, { useState, SetStateAction, Dispatch, ChangeEvent, MouseEvent } from 'react';
import { Button, FormControl, FormLabel, Heading, Image, Input, Text, VStack } from '@chakra-ui/react';
import { api } from 'axiosConfig';
import useServerStatus from 'components/ServerStatusProvider/useServerStatus';
import StringConstants from 'constants/strings';

const ClassifyImageForm = ({
  isClassifying,
  setIsClassifying,
  setClassification,
  customizedClassifier = false
}: ClassifyImageFormProps) => {
  const [image, setImage] = useState<File>();
  const [imageURLString, setImageURLString] = useState('');
  const { isServerDown } = useServerStatus();
  const classifyingURL = customizedClassifier ? '/classify/customized_classifier/' : '/classify/';

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setImage(file);
    setImageURLString(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
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
    <FormControl>
      <VStack
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <FormLabel>
          <Heading>
            {customizedClassifier ? StringConstants.CUSTOM : StringConstants.BASIC}
          </Heading>
        </FormLabel>
        {!customizedClassifier && 
          <Text>
            {StringConstants.BASIC_CLASSIFIER}
          </Text>
        }
        <Input
          id="img"
          type="file"
          accept="image/*"
          variant="unstyled"
          w="auto"
          onChange={handleInput}
        />
        {imageURLString ? (
          <Image width={500} alt="uploaded image" src={imageURLString} />
        ) : <></>
        }
        <Button
          isDisabled={isServerDown}
          isLoading={isClassifying}
          onClick={handleSubmit}
        >
          {StringConstants.CLASSIFY}
        </Button>
      </VStack>
    </FormControl>
  );
};

type ClassifyImageFormProps = {
  isClassifying: boolean,
  setIsClassifying: Dispatch<SetStateAction<boolean>>,
  setClassification: Dispatch<SetStateAction<string>>,
  customizedClassifier?: boolean,
};

export default ClassifyImageForm;
