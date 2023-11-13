import { createContext, useContext, useEffect, useState } from "react";
import { Loader } from "react-feather";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(true)
    setLoading(false);
  }, []);

  const contextData = { user };
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? (
        <center>
          <Loader />
        </center>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
