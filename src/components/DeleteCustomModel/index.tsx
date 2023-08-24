import React, { MouseEvent } from 'react';
import StringConstants from 'constants/strings';

const DeleteCustomModel = ({handleDeleteModel}: DeleteCustomModelProps) => {
  return (
    <>
      {StringConstants.ONE_MODEL}
      <button onClick={handleDeleteModel}>
        {StringConstants.DELETE}
      </button>
    </>
  );
};

type DeleteCustomModelProps = {
  handleDeleteModel: (e: MouseEvent<HTMLButtonElement>) => void,
};

export default DeleteCustomModel;
