import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Button, Checkbox, Modal, TextField } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/authSlice";
import { startGroupConversation } from "../../redux/slices/chatSlice";
import Loader from "./Loader";
import { toast } from "react-toastify";
import useSearch from "../../utils/hooks/useSearch";
import Searchbar from "./SearchBar";

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    maxHeight: 600,
  },

  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",

    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "10px 0px",
  },
  input: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: "0px 5%",
    maxHeight: 50,
    backgroundColor: "white",
  },
  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "5px",
    },
    scrollBehavior: "smooth !important",
  },
  userCard: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: "0px 5%",
    maxHeight: 50,
    boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
    margin: "5px 20px",
    backgroundColor: "white",
    borderRadius: 8,
    cursor: "pointer",
    justifyContent: "space-between",
  },
  "@media (max-width: 630px)": {
    mainContainer: {
      width: "80%",
      height: "50%",
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
  m: 2,
  "&:hover": {
    backgroundColor: "#134696",
  },
};
const GroupModal = ({ isOpen, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { allUsers } = useSelector((state) => state.auth);
  const { allChatsApi } = useSelector((state) => state.chats);

  const [groupName, setGroupName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState();

  const filteredUsers = useSearch(
    searchQuery,
    allUsers?.filter((filterEl) => filterEl?._id !== currentUser?._id),
    "name"
  );

  useEffect(() => {
    // console.log({ allUsers });
    if (!allUsers) dispatch(getAllUsers());
    // eslint-disable-next-line
  }, [allUsers]);

  const handleCheckBox = (elem) => {
    if (selectedUsers?.includes(elem?._id)) {
      setSelectedUsers(
        selectedUsers?.filter((filterEl) => filterEl !== elem?._id)
      );
    } else setSelectedUsers((prev) => [...prev, elem?._id]);
  };
  const handleCreateGroup = () => {
    console.log({ groupName, selectedUsers });
    if (selectedUsers?.length === 0)
      toast.error("At least 1 other member is required", {
        position: toast.POSITION.TOP_CENTER,
        progressStyle: { backgroundColor: "#014493" },
      });
    else
      dispatch(
        startGroupConversation({
          participants: selectedUsers,
          initiator: currentUser?._id,
          title: groupName,
        })
      );
    setOpen(false);
  };
  return (
    <Modal open={isOpen} onClose={() => setOpen((prev) => !prev)}>
      <div className={classes.mainContainer}>
        {allChatsApi?.startingConversation ? (
          <Loader />
        ) : (
          <div className={classes.content}>
            <Searchbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <TextField
              label="Group name"
              variant="outlined"
              value={groupName || ""}
              onChange={(e) => setGroupName(e.target.value)}
              sx={{ backgroundColor: "white", margin: "5px 20px" }}
            />
            <div className={classes.itemsContainer}>
              {filteredUsers?.map((elem, index) => (
                <div className={classes.userCard} key={index}>
                  <Avatar
                    src={elem?.photo}
                    style={{ height: 30, width: 30 }}
                    alt={elem?.name}
                  />
                  <span style={{ marginLeft: 20 }}>{elem?.name}</span>
                  <Checkbox
                    checked={selectedUsers?.includes(elem?._id)}
                    onChange={() => handleCheckBox(elem)}
                  />
                </div>
              ))}
            </div>

            <Button
              sx={buttonSx}
              onClick={handleCreateGroup}
              disabled={!groupName?.length}
            >
              Create Group
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GroupModal;
