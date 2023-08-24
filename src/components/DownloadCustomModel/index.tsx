import React, { MouseEvent } from 'react';
import StringConstants from 'constants/strings';

const DownloadCustomModel = ({downloadingModel, handleDownloadModel}: DownloadCustomModelProps) => {
  return (
    <>
      {downloadingModel && StringConstants.DOWNLOADING_MODEL}
      <button onClick={handleDownloadModel}>
        {StringConstants.DOWNLOAD}
      </button>
    </>
  );
};

type DownloadCustomModelProps = {
  downloadingModel: boolean,
  handleDownloadModel: (e: MouseEvent<HTMLButtonElement>) => void,
};

export default DownloadCustomModel;
