import { setCurrentUser } from "../redux/slices/authSlice";
import { disconnectChatService } from "./sockets/sockets";

export const handleLogout = (dispatch) => {
  dispatch(setCurrentUser(null));
  disconnectChatService();
};
export const validatePassword = (input) => {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  if (!input.match(passwordRegex)) return false;

  return true;
};
export const getPasswordHelper = (pass) => {
  return (
    <span>
      Password must have
      {pass?.length < 8 && (
        <span>
          <br />8 characters
        </span>
      )}
      {!/[A-Z]/.test(pass) && (
        <span>
          <br />1 uppercase
        </span>
      )}
      {!/[a-z]/.test(pass) && (
        <span>
          <br />1 lowercase
        </span>
      )}
      {!/\d/.test(pass) && (
        <span>
          <br /> 1 number or special character
        </span>
      )}
      <br />
      <br />
    </span>
  );
};
