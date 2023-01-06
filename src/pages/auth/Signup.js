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
  register,
  resetLoginApi,
  setCurrentUser,
} from "../../redux/slices/authSlice";
import PersonIcon from "@mui/icons-material/Person";
import useApi from "../../utils/hooks/useApi";
import { toast } from "react-toastify";

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
const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registrationData, setRegistrationData] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const { loginApi } = useSelector((state) => state.auth);

  const registrationResponse = useApi(
    loginApi?.error,
    loginApi?.response,
    "user registered successfully",
    resetLoginApi
  );

  useEffect(() => {
    if (registrationResponse) {
      dispatch(setCurrentUser(registrationResponse));
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, [registrationResponse]);

  const handleChange = (prop) => (event) => {
    setRegistrationData((prev) => ({
      ...prev,
      [prop]: event.target.value,
      [`${prop}Validation`]:
        prop === "password"
          ? validatePassword(event.target.value)
          : prop === "name"
          ? event.target.value?.length >= 2
          : event.target.value?.length >= 5,
    }));
  };
  const handleSignup = () => {
    // console.log({ registrationData });
    if (
      !registrationData?.passwordValidation ||
      !registrationData?.nameValidation ||
      !registrationData?.usernameValidation
    )
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    else
      dispatch(
        register({
          username: registrationData?.username,
          password: registrationData?.password,
          name: registrationData?.name,
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
            Create an Account
          </span>
          <AuthInput
            placeholder="Full Name"
            value={registrationData?.name}
            onChange={handleChange("name")}
            type="text"
            startIcon={
              <PersonIcon
                style={{
                  marginRight: 10,
                  color: "#134696",
                }}
              />
            }
            validating={registrationData?.nameValidation}
            helperText={"Name must be at least 2 characters"}
          />
          <AuthInput
            placeholder="Enter Username"
            value={registrationData?.username}
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
            validating={registrationData?.usernameValidation}
            helperText={"Username must be at least 5 characters"}
          />

          <AuthInput
            placeholder="Password"
            value={registrationData?.password}
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
            validating={registrationData?.passwordValidation}
            helperText={getPasswordHelper(registrationData?.password)}
          />
          <div>
            <span className={classes.account} style={{ color: "#7D7D7D" }}>
              already have an account ?
            </span>
            <Button
              onClick={() => navigate("/login")}
              sx={{
                textTransform: "none",
                fontSize: 12,
                color: "#134696",
                fontFamily: "medium",
                p: 0,
                m: 0,
              }}
            >
              Login
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
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
};

export default Signup;
