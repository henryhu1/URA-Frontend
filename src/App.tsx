import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { api } from 'axiosConfig';
import AuthProvider from 'components/AuthProvider';
import Login from 'components/Login';
import Logout from 'components/Logout';
import Main from 'components/Main';
import MyAccount from 'components/MyAccount';
import Navbar from 'components/Navbar';
import VerifyAccount from 'components/VerifyAccount';
import 'App.css';

const App = () => {

  const getCSRF = async () => {
    await api.get('/classify/get_csrf_token/', { withCredentials: true })
      .then(() => {
        console.log("CSRF cookie fetched successfully!");
      })
      .catch(error => {
        console.error("Error fetching CSRF cookie:", error);
      });
  };

  useEffect(() => {
    getCSRF();
    console.log({"something": !!localStorage.getItem('token')});
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider alreadyAuthenticated={!!localStorage.getItem('token')}>
          <Navbar />
          <Routes>
            <Route path="/" Component={Main} />
            <Route path="/login" Component={Login} />
            <Route path="/logout" Component={Logout} />
            <Route path="/verifyaccount" Component={VerifyAccount} />
            <Route path="/myaccount" Component={MyAccount} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
