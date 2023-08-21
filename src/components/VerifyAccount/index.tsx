import VerifyAccountForm from 'components/forms/VerifyAccountForm';
import StringConstants from 'constants/strings';
import './index.css';

const VerifyAccount = () => {
  return (
    <div className="Verify">
      {StringConstants.VERIFICATION_CODE}
      <VerifyAccountForm />
    </div>
  );
};

export default VerifyAccount;
