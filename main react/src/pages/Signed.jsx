import { useLocation } from 'react-router-dom';
import { NLogo } from '../assets/icons/NLogo';

export function Signed() {
  const location = useLocation();
  const { state } = location;
  const { email } = state;

  return (
    <div className="d-flex align-items-center flex-column pt-3">
      <h1 className="d-flex">Account created</h1>
      <p className="d-flex mb-5">🎉 Your account has been created 🎉</p>
      <p className="fw-light text-nexus-dark">
        We have sent an email to -
        <strong className="text-nexus-accent">{email}</strong>- to confirm the
        validity of your email address. After receiving the email follow the
        link provided to complete your registration proccess.
      </p>
    </div>
  );
}
