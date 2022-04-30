import { createContext, useState } from 'react';
import { getPermission } from 'Utils/Utils';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [context, setContext] = useState(
    getPermission() || typeof getPermission() === 'number' ? true : false
  );
  return <AuthContext.Provider value={[context, setContext]}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
