import { useSelector } from "react-redux";
import Login from "../pages/auth/Login";
const PrivateRoute = ({ children, redirectTo }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return currentUser ? children : <Login />;
};

export default PrivateRoute;
