import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext({});

export function UserProvider({ children, overrides }) {
  const [user, setUser] = useState(overrides);
  // Mounted
  useEffect(() => {
    const json = localStorage.getItem('user');
    if (json) {/*Si hay algo guardado en user*/
      try {
        const data = JSON.parse(json);
        setUser(data);//le paso el dato a user
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  // Updated
  useEffect(() => {
    if (user === null) {
      localStorage.removeItem('user');//Si noy anda en user, remuevo la propiedad
    }
    if (user !== undefined) {//Si no es undefined, guardo la información en localStorage
      localStorage.setItem( 'user', JSON.stringify(user))
    }
  }, [user]);//Sólo se ejecuta si user cambia

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}{/*Los componentes hijos se renderizan y tienen acceso a user*/}
    </UserContext.Provider>
  );
}

export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  overrides: PropTypes.shape({
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
}
