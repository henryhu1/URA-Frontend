import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import compressFiles from './utils/files';
import ClassifyImageForm from './components/forms/classifyImageForm';
import './App.css';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function App() {
  const [classification, setClassification] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [dataset, setDataset] = useState<FileList>();
  const [isDataOverLimit, setIsDataOverLimit] = useState(false);

  const ref = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

  const handleFolderInput = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    let totalSize = 0;
    Array.from(fileList).forEach(file => {
        totalSize += file.size;
    });

    const MAX_SIZE = 10 * 1024 * 1024;  // 10 MB
    if (totalSize > MAX_SIZE) {
        alert('Total file size exceeds the 10 MB limit!');
        setIsDataOverLimit(true);
        return;
    }
    setDataset(fileList);
    setIsDataOverLimit(false);
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dataset) return;

    const zipBlob = await compressFiles(dataset);
    const formData = new FormData();
    // formData.append('dataset', dataset);
    formData.append('dataset', zipBlob, 'compressed_folder.zip');
    try {
      await axios.post('/classify/upload_and_train/', formData, {
        headers: {
          'enctype': 'multipart/form-data',
          // 'X-CSRFToken': csrftoken,
        }
      }).then(response => {
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <body className="App-body">
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
            id="stylized"
            type="file"
            name="upload dataset"
            onChange={handleFolderInput}
            ref={ref}
          />
          <button type="submit" disabled={isDataOverLimit}>
            Upload
          </button>
        </form>
        <ClassifyImageForm setIsClassifying={setIsClassifying} setClassification={setClassification} />
        {/* <form onSubmit={handleSubmit}>
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
        </form> */}
        {isClassifying ? (
          <div className="loader" />
        ) :
        classification ?? <></>
        }
      </body>
    </div>
  );
}

export default App;
