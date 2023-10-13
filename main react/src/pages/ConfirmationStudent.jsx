import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Loading } from '../animation/Loading';
import { confirmStudent } from '../api/students';

export default function ConfirmationStudent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const { email: emailInput } = event.target.elements;

    setLoading(true);
    setError('');

    try {
      await confirmStudent(emailInput.value);

      setEmail(emailInput.value);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='d-flex bg-body-secondary align-items-center flex-column pt-3'>
      <h1 className="d-flex mt-5 pt-5">Send Confirmation Link</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <Loading />}
      {email ? (
        <>
          <p className="d-flex">
            If your email is in our system, an email will be send to your inbox
          </p>
          <p className="d-flex">
            Check your email: <strong>{email}</strong> to activate your account.
          </p>
        </>
      ) : (
        <>
          <Form onSubmit={handleSubmit} className="mb-3 d-flex flex-column align-items-center">
            <Form.Group className=" mb-3 d-flex flex-column align-items-center">
              <Form.Label className=" mb-3 d-flex flex-column">Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                className='d-flex'
                name="email" />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="rounded-pill text-white px-4 d-flex"
            >
              Submit
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
