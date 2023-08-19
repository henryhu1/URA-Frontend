import React, { useState, } from 'react';
import axios from 'axios';
import ClassifyImageForm from './components/forms/ClassifyImageForm';
import 'App.css';
import UploadTrainingImagesForm from 'components/forms/UploadTrainingImagesForm';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

function App() {
  const [classification, setClassification] = useState("");
  const [isClassifying, setIsClassifying] = useState(false);

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
        <UploadTrainingImagesForm />
        <ClassifyImageForm setIsClassifying={setIsClassifying} setClassification={setClassification} />
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
