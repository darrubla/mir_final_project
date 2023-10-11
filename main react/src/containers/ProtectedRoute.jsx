import { useContext } from 'react'
import UserContext from '../containers/UserContext'
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext)
  return user?.type ? children : <Navigate to='/signin/student' />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
