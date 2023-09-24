import { createContext } from 'react';
import AuthContextType from './authContextType';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
