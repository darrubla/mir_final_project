import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loading } from '../animation/Loading';
import { Alert } from 'react-bootstrap';
import { activateStudent } from '../api/students';

export function ActivateStudent() {
  const params = useParams();
  const { token } = params;

  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function activate(userToken) {
    setLoading(true);
    setError('');

    try {
      await activateStudent(userToken);

      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      activate(token);
    }
  }, [token]);

  return (
    <div className="vh-100 d-flex bg-body-secondary align-items-center flex-column pt-2nav">
      <h1 className="d-flex mt-5 pt-5">Account activation</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Loading />
      ) : success ? (
        <p className="d-flex ">
          Your account has been activated. Go to{' '}
          <Link to="/auth/login">Sign In</Link>
        </p>
      ) : (
        <p>
          If you want to generate a new activation link{' '}
          <Link to="/confirmation_student">Click here</Link>
        </p>
      )}
    </div>
  );
}
