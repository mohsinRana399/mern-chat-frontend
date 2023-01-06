import React, { useMemo } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setSelectedConversation } from "../../../redux/slices/chatSlice";
import { joinConversion } from "../../../utils/sockets/sockets";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "10px 0px",
    borderBottom: "1px solid #D7DFE8",
    paddingBottom: 5,
    cursor: "pointer",
  },
  left: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  sender: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 0,
    color: "#000",
  },
  message: {
    fontSize: 16,
    margin: 0,
    color: "#bdbdbd",
  },
}));
const ConversationCard = ({ conversation, group }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const sender = useMemo(() => {
    if (group) return { name: conversation?.title };
    return conversation?.participants?.filter(
      (elem) => elem?._id !== currentUser?._id
    )[0];
  }, [conversation, currentUser, group]);
  const handleConversationClick = () => {
    joinConversion(conversation?._id);
    dispatch(setSelectedConversation(conversation));
  };
  return (
    <div className={classes.container} onClick={handleConversationClick}>
      <div className={classes.left}>
        <Avatar
          src={conversation?.photo}
          alt={sender?.name}
          style={{
            height: 35,
            width: 35,
          }}
        />
        <div style={{ marginLeft: 20 }}>
          <p className={classes.sender}>{sender?.name}</p>
          <p className={classes.message}>
            {conversation?.lastMessage || "Start conversation..."}
          </p>
        </div>
      </div>
      <span> {moment(conversation?.lastMessageTime).fromNow()}</span>
    </div>
  );
};

export default ConversationCard;
