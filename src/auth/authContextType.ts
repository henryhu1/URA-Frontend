type AuthContextType = {
  isAuthenticated: boolean,
  login: () => void,
  logout: () => void,
};

export default AuthContextType;
