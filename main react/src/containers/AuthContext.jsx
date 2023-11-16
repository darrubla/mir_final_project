import { createContext, useState } from 'react';

const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [accountType, setAccountType] = useState();

  return (
    <AuthContext.Provider
      value={{
        accountType,
        setAccountType,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
