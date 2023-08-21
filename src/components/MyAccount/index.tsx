import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';

const MyAccount = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await axios.get('/classify/my_account', {
        headers: {
          // 'X-CSRFToken': csrftoken,
        }
      }).then(response => {
        if (response?.status == 200) {
          if (!response.data.is_verified) {
            navigate('/verifyaccount')
          }
        }
      });
    } catch (error) {
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="Account"></div>
  );
};

export default MyAccount;
