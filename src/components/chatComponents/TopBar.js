import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { handleLogout } from "../../utils/helperFunctions";
import UsersModal from "../global/UsersModal";
import GroupModal from "../global/GroupModal";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    borderBottom: "1px solid #D7DFE8",
    padding: "5px 20px",
  },
  left: {
    display: "flex",
    flexDirection: "column",
  },
  user: {
    fontSize: 24,
    fontFamily: "light",
    color: "#134696",
    textTransform: "capitalize",
  },
  date: {
    fontSize: 16,
    fontFamily: "light",
    color: "#ADA7A7",
  },
  right: {
    display: "flex",
  },
  iconButton: {
    height: 52,
    width: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #6B7B88",
    borderRadius: 10,
    cursor: "pointer",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "row",
    },
  },
}));
const buttonSx = {
  color: "#ffffff",
  backgroundColor: "#134696",
  height: 52,
  padding: "0px 20px",
  borderRadius: 2,
  cursor: "pointer",
  fontFamily: "light",
  fontSize: 16,
  textTransform: "none",
  ml: 2,
  mr: 2,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const TopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);

  // console.log({ currentUser });
  return (
    <div className={classes.container}>
      {openUsersModal && (
        <UsersModal isOpen={openUsersModal} setOpen={setOpenUsersModal} />
      )}
      {openGroupModal && (
        <GroupModal isOpen={openGroupModal} setOpen={setOpenGroupModal} />
      )}
      <div className={classes.left}>
        <div className={classes.user}>Welcome, {currentUser?.name}</div>
        <div className={classes.date}>
          {moment().format("dddd, DD MMMM YYYY")}
        </div>
      </div>
      <div className={classes.right}>
        <Button sx={buttonSx} onClick={() => setOpenUsersModal(true)}>
          New Conversation
        </Button>
        <Button sx={buttonSx} onClick={() => setOpenGroupModal(true)}>
          New Group
        </Button>

        <Button sx={buttonSx} onClick={() => handleLogout(dispatch)}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
