import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from 'components/Login';
import Main from 'components/Main';
import MyAccount from 'components/MyAccount';
import Navbar from 'components/Navbar';
import VerifyAccount from 'components/VerifyAccount';
import 'App.css';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const App = () => (
  <div className="App">
    <BrowserRouter>
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

      <Navbar />
      <Routes>
        <Route path="/" Component={Main} />
        <Route path="/login" Component={Login} />
        <Route path="/verifyaccount" Component={VerifyAccount} />
        <Route path="/myaccount" Component={MyAccount} />
        {/* Add more routes as needed */}
      </Routes>

  </BrowserRouter>
    
  </div>
);

export default App;
