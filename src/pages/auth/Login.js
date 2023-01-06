import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/global/Loader";
import {
  getPasswordHelper,
  validatePassword,
} from "../../utils/helperFunctions";
import AuthInput from "../../components/authComponents/AuthInput";
import { Button, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import {
  login,
  resetLoginApi,
  setCurrentUser,
} from "../../redux/slices/authSlice";
import useApi from "../../utils/hooks/useApi";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 350,
    borderRadius: 10,
    padding: 20,
    transition: "0.5s",
    margin: "20px 0px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  title: {
    fontSize: 18,
    color: "#134696",
    margin: "5px 0px",
  },
  account: {
    fontSize: 12,
    color: "#7D7D7D",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginApi } = useSelector((state) => state.auth);
  const [loginData, setLoginData] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const loginResponse = useApi(
    loginApi?.error,
    loginApi?.response,
    "user logged in successfully",
    resetLoginApi
  );

  useEffect(() => {
    if (loginResponse) {
      dispatch(setCurrentUser(loginResponse));
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, [loginResponse]);

  const handleChange = (prop) => (event) => {
    setLoginData((prev) => ({
      ...prev,
      [prop]: event.target.value,
      [`${prop}Validation`]:
        prop === "password" ? validatePassword(event.target.value) : true,
    }));
  };
  const handleLogin = () => {
    // console.log({ loginData });

    dispatch(
      login({
        username: loginData?.username,
        password: loginData?.password,
      })
    );
  };
  return (
    <div className={classes.container}>
      {loginApi?.loading ? (
        <Loader />
      ) : (
        <div className={classes.innerContainer}>
          <span className={classes.title} style={{ color: "#134696" }}>
            Login to your Account
          </span>
          <AuthInput
            placeholder="Enter username"
            value={loginData?.username}
            onChange={handleChange("username")}
            startIcon={
              <EmailIcon
                style={{
                  marginRight: 10,
                  color: "#134696",
                }}
              />
            }
            type="text"
          />

          <AuthInput
            placeholder="Password"
            value={loginData?.password}
            onChange={handleChange("password")}
            startIcon={
              <LockIcon
                style={{
                  color: "#134696",
                  marginRight: 10,
                }}
              />
            }
            type={showPassword ? "text" : "password"}
            endIcon={
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                sx={{ p: 0 }}
              >
                <VisibilityIcon
                  style={{
                    color: "#134696",
                  }}
                />
              </IconButton>
            }
            validating={loginData?.passwordValidation}
            helperText={getPasswordHelper(loginData?.password)}
          />
          <div>
            <span className={classes.account} style={{ color: "#7D7D7D" }}>
              Don’t have an account ?
            </span>
            <Button
              onClick={() => navigate("/signup")}
              sx={{
                textTransform: "none",
                fontSize: 12,
                color: "#134696",
                fontFamily: "medium",
                p: 0,
                m: 0,
              }}
            >
              Sign up
            </Button>
          </div>
          <Button
            sx={{
              textTransform: "none",
              fontSize: 12,
              color: "#FFFFFF",
              backgroundColor: "#134696",
              borderRadius: "10px",
              width: 300,
              maxWidth: "85%",
              marginTop: "10px",
              m2: 1,
              padding: 1,
              "&:hover": {
                color: "#134696",
              },
              "&:disabled": {
                color: "#FFFFFF",
                backgroundColor: "#026FC2",
              },
            }}
            fullWidth
            onClick={handleLogin}
            disabled={!loginData?.passwordValidation}
          >
            Login
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
