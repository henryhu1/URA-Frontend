import React, { MouseEvent } from 'react';
import { Button, Center, Text, VStack } from '@chakra-ui/react';
import StringConstants from 'constants/strings';

const DeleteCustomModel = ({ deletingCustomModel, handleDeleteModel }: DeleteCustomModelProps) => {
  return (
    <Center w="100%" h="100%">
      <VStack spacing={4}>
        <Text>{StringConstants.ONE_MODEL}</Text>
        <Button onClick={handleDeleteModel} isLoading={deletingCustomModel}>
          {StringConstants.DELETE}
        </Button>
      </VStack>
    </Center>
  );
};

type DeleteCustomModelProps = {
  deletingCustomModel: boolean,
  handleDeleteModel: (e: MouseEvent<HTMLButtonElement>) => void,
};

export default DeleteCustomModel;
