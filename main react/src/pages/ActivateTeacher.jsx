import { useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom'
import { activateTeacher } from '../api/teachers';
import { Loading } from '../animation/Loading';
import { Alert } from 'react-bootstrap';

export function ActivateTeacher() {
  const params = useParams();
  const { token } = params;

  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function activate(userToken) {
    setLoading(true);
    setError('');

    try {
      await activateTeacher(userToken);

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
    <div className='d-flex bg-body-secondary align-items-center flex-column pt-3'>
      <h1 className='d-flex mt-5 pt-5'>Account activation</h1>
      {loading && <Loading />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading ? (
        success ? (
          <p className='d-flex '>
            Your account has been activated. Go to {' '}
            <Link to='/signin/teacher'> Sign In</Link>
          </p>
        ) : (
          <> </>
        )
      ) : null}
    </div>
  );
}
