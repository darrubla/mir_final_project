import { createContext, useState } from 'react';

const AuthContext = createContext({});

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
