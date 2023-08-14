import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function App() {
  const [image, setImage] = useState<File>();
  const [imageURLString, setImageURLString] = useState("");
  const [classification, setClassification] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setImageURLString(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image) {
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
    }
  };

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
          <br />
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
