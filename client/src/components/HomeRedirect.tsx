import { useAuth } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";

const HomeRedirect = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Dashboard />;
  return <Home />;
};

export default HomeRedirect;
