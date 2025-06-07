import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import AuthRedirect from "./components/AuthRedirect";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Docs from "./pages/Docs";
import Profile from "./pages/Profile";
import HomeRedirect from "./components/HomeRedirect";

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

      <Route index element={<HomeRedirect />} />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route path="/docs" element={<Docs />} />
    </Route>
  )
);

export default router;
