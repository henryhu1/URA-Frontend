import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { api } from 'axiosConfig';
// import useAuth from 'auth/useAuth';
import useAuth from 'auth/useAuth';
import './index.css';

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="Logout">
      You have logged out.
    </div>
  );
};

export default Logout;
