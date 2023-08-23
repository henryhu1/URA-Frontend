import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import VerifyAccountForm from 'components/forms/VerifyAccountForm';
import StringConstants from 'constants/strings';
import './index.css';

const VerifyAccount = () => {
  // TODO maybe combine with login to remove this page
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/myaccount');
    }
  }, []);

  return (
    <div className="Verify">
      {StringConstants.VERIFICATION_CODE}
      <VerifyAccountForm />
    </div>
  );
};

export default VerifyAccount;
