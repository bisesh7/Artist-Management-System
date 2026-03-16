import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../helpers/isLoggedIn";

const PrivateRoute = ({ children }) => {
  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
