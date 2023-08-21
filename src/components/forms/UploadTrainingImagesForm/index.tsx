import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import compressFiles from 'utils/files';
import NumberConstants from 'constants/numbers';
import StringConstants from 'constants/strings';
import 'components/forms/forms.css';

const UploadTrainingImagesForm = () => {
  const [zippedDataset, setZippedDataset] = useState<Blob>();
  const [isDataOverLimit, setIsDataOverLimit] = useState(false);

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

    // let totalSize = 0;
    // Array.from(fileList).forEach(file => {
    //   totalSize += file.size;
    //   console.log(file.webkitRelativePath)
    // });
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
    try {
      await axios.post('/classify/upload_and_train/', formData, {
        headers: {
          'enctype': 'multipart/form-data',
          // 'X-CSRFToken': csrftoken,
        }
      }).then(response => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    // } finally {
    }
  };

  return (
    <form onSubmit={handleUpload}>
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
      <button type="submit" disabled={isDataOverLimit}>
        {StringConstants.UPLOAD}
      </button>
    </form>
  );
};

export default UploadTrainingImagesForm;
