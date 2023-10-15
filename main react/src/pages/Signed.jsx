import { useLocation } from 'react-router-dom'

export function Signed() {
  const location = useLocation();
  const { state } = location;
  const { email } = state;

  return (
    <div className='d-flex bg-body-secondary align-items-center flex-column pt-3'>
      <h1 className='d-flex mt-5 pt-5'>
        Account created
      </h1>
      <p className='d-flex '>
        Your account has been created
      </p>
      <p className='d-flex '>
        Check your email: -<strong>{email}</strong>- to activate your account
      </p>
    </div>
  )
}

