import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, ColorModeScript, VStack } from '@chakra-ui/react';
import { api } from 'axiosConfig';
import AuthProvider from 'components/AuthProvider';
import ServerStatusProvider from 'components/ServerStatusProvider';
import Login from 'components/Login';
import Logout from 'components/Logout';
import Main from 'components/Main';
import MyAccount from 'components/MyAccount';
import Navbar from 'components/Navbar';
import theme from 'theme';

const App = () => {
  const [isServerDown, setIsServerDown] = useState(false);

  const getCSRF = async () => {
    await api.get('/classify/get_csrf_token/', { withCredentials: true })
      .catch(() => {
        setIsServerDown(true);
      });
  };

  useEffect(() => {
    getCSRF();
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthProvider alreadyAuthenticated={!!localStorage.getItem('token')}>
          <ServerStatusProvider isServerDown={isServerDown}>
            <ChakraProvider theme={theme}>
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <VStack h="100vh" overflow="auto" align="left">
                <Navbar />
                <Routes>
                  <Route path="/" Component={Main} />
                  <Route path="/login" Component={Login} />
                  <Route path="/logout" Component={Logout} />
                  <Route path="/myaccount" Component={MyAccount} />
                </Routes>
              </VStack>
            </ChakraProvider>
          </ServerStatusProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
