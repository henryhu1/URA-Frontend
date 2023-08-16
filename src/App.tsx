import React, { useState, useEffect , ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function App() {
  const [image, setImage] = useState<File>();
  const [imageURLString, setImageURLString] = useState("");
  const [classification, setClassification] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);
  const [dataset, setDataset] = useState<File>();
  const [isDataOverLimit, setIsDataOverLimit] = useState(false);

  const ref = React.useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.setAttribute("directory", "");
      ref.current.setAttribute("webkitdirectory", "");
    }
  }, [ref]);

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
      setIsClassifying(true);
      await axios.post('/classify/', formData, {
        headers: {
          'enctype': 'multipart/form-data',
          // 'X-CSRFToken': csrftoken,
        }
      }).then(response => {
        setClassification(response.data);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsClassifying(false);
    }
  };

  const handleFolderInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // let totalSize = 0;
    // for (let i = 0; i < files.length; i++) {
    //     totalSize += files[i].size;
    // }

    const MAX_SIZE = 10 * 1024 * 1024;  // 10 MB
    console.log(file.size)
    console.log(MAX_SIZE)
    if (file.size > MAX_SIZE) {
        alert('Total file size exceeds the 10 MB limit!');
        setIsDataOverLimit(true);
        return;
    }
    setDataset(file)
    setIsDataOverLimit(false);
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    if (!dataset) return;
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
