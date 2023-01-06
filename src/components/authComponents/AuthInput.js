import React from "react";
import { makeStyles } from "@mui/styles";
import "./authStyles.css";

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    minWidth: "80%",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "15px 10px",
    borderRadius: 10,
  },
  helperText: {
    fontSize: 12,
    color: "red",
    alignSelf: "flex-start",
    marginTop: 3,
  },
}));
const AuthInput = ({
  placeholder,
  value,
  onChange,
  startIcon,
  endIcon,
  type,
  validating,
  helperText,
  inputRef,
  onFocus,
  onBlur,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.mainContainer}>
      <div
        className={classes.container}
        style={{
          border:
            validating === false ? "1px solid #D83F50" : "1px solid #b2b2c9",
        }}
      >
        {startIcon}
        <input
          ref={inputRef}
          type={type}
          className="auth-input"
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {endIcon}
      </div>
      {validating === false && (
        <span className={classes.helperText}>{helperText}</span>
      )}
    </div>
  );
};

export default AuthInput;
