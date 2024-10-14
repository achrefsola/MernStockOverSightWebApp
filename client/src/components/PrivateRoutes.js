import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(() => {

    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthenticated(!!token);
  }, []);

  return authenticated;
};
function PrivateRoute({ children }) {
    const auth = useAuth();
    return auth ? <>{children}</> : <Navigate to="/login" />;
  }

export default PrivateRoute;