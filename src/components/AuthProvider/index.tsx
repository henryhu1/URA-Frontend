import React, { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from 'axiosConfig';
import AuthContext from './authContext';

const AuthProvider = ({
  alreadyAuthenticated = false,
  children
}: {
  alreadyAuthenticated?: boolean,
  children: ReactNode
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(alreadyAuthenticated);

  const login = () => {
    // await api.post('/classify/authenticate_user/', formData, {
    //   headers: {
    //     'enctype': 'multipart/form-data',
    //   }
    // }).then(response => {
    //   if (response?.status == 200) {
    //     if (response.data.is_verified) {
    //       login();
    //       const token = response.data.access_token;
    //       localStorage.setItem('token', token);
    //       navigate('/myaccount');
    //     } else {
    //       navigate('/verifyaccount');
    //     }
    //   }
    // }).catch(error => {
    //   if (isAxiosError(error)) {
    //     setFormSubmitError(error.response?.data.error ?? error.response?.data);
    //   } else {
    //     setFormSubmitError(StringConstants.UNEXPECTED_ERROR);
    //   }
    // });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await api.post('/classify/logout/')
      .then(response => {
        if (response?.status == 200) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      })
      .catch(() => {
        navigate('/');
      });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
