import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import AuthRedirect from "./components/AuthRedirect";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        path="login"
        element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        }
      />

      <Route
        index
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Route>
  )
);

export default router;
