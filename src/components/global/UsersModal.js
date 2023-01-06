import React, { useEffect, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Modal } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/authSlice";
import { startConversation } from "../../redux/slices/chatSlice";
import Loader from "./Loader";

const useStyles = makeStyles(() => ({
  mainContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 330,
  },

  content: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    background: "rgba(255, 255, 255, 0.31)",
    borderRadius: 16,
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(10.1px)",
    "-webkit-backdrop-filter": "blur(10.1px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    padding: "10px 0px",
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
  },
  "@media (max-width: 630px)": {
    mainContainer: {
      width: "80%",
      height: "50%",
    },
  },
}));

const UsersModal = ({ isOpen, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { allUsers } = useSelector((state) => state.auth);
  const { allConversations, allChatsApi } = useSelector((state) => state.chats);

  useEffect(() => {
    // console.log({ allUsers });
    if (!allUsers) dispatch(getAllUsers());
    // eslint-disable-next-line
  }, [allUsers]);

  const dataToShow = useMemo(() => {
    if (allUsers?.length) {
      return allUsers
        ?.filter((elem) => elem?._id !== currentUser?._id)
        .filter((elem) => {
          let toRet = true;
          allConversations?.forEach((element) => {
            const remainingParticipants = element?.participants?.filter(
              (participant) => participant?._id !== currentUser?._id
            )[0];
            if (remainingParticipants?._id === elem?._id) toRet = false;
          });
          return toRet;
        });
    }
    // eslint-disable-next-line
  }, [allUsers, allConversations]);

  //   console.log({ dataToShow });

  const handleCardClick = (card) => {
    // console.log({ card });
    dispatch(
      startConversation({
        receiver: card?._id,
        sender: currentUser?._id,
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
            {dataToShow?.map((elem, index) => (
              <div
                className={classes.userCard}
                key={index}
                onClick={() => handleCardClick(elem)}
              >
                <Avatar
                  src={elem?.photo}
                  style={{ height: 30, width: 30 }}
                  alt={elem?.name}
                />
                <span style={{ marginLeft: 20 }}>{elem?.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UsersModal;
