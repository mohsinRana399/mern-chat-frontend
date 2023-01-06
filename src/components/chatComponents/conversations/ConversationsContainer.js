import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import ConversationCard from "./ConversationCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllConversations,
  getGroupConversations,
  setSelectedConversation,
} from "../../../redux/slices/chatSlice";
import PublicIcon from "@mui/icons-material/Public";
import Loader from "../../global/Loader";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import AccordionContainer from "../../global/AccordionContainer";
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "calc(100vh - 100px)",
    margin: "0px 10px",
  },
  chatRoomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "10px 0px",
    borderBottom: "1px solid #D7DFE8",
    paddingBottom: 5,
    cursor: "pointer",
    height: 46,
  },
  sender: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 0,
    color: "#000",
    marginLeft: 20,
    textAlign: "center",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const ConversationsContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const { allConversations, allGroups, allChatsApi } = useSelector(
    (state) => state.chats
  );
  useEffect(() => {
    dispatch(getAllConversations(currentUser?._id));
    dispatch(getGroupConversations(currentUser?._id));

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={classes.chatRoomContainer}
        onClick={() => dispatch(setSelectedConversation(null))}
      >
        <PublicIcon style={{ color: "#bdbdbd", fontSize: 35 }} />
        <p className={classes.sender}>Public Chat Room</p>
      </div>
      <AccordionContainer
        titleIcon={
          <GroupIcon
            style={{ color: "#bdbdbd", fontSize: 35, marginBottom: 5 }}
          />
        }
        title="Groups"
        details={
          <>
            {allChatsApi?.gettingGroups ? (
              <Loader />
            ) : (
              <>
                {allGroups?.map((elem, index) => (
                  <ConversationCard key={index} conversation={elem} group />
                ))}
                {allGroups?.length === 0 && (
                  <p>Create a group to see it here</p>
                )}
              </>
            )}
          </>
        }
      />
      <AccordionContainer
        titleIcon={
          <ChatIcon
            style={{ color: "#bdbdbd", fontSize: 35, marginBottom: 5 }}
          />
        }
        title="Conversations"
        details={
          <>
            {allChatsApi?.gettingConversation ? (
              <Loader />
            ) : (
              <>
                {allConversations?.map((elem, index) => (
                  <ConversationCard key={index} conversation={elem} />
                ))}
                {allConversations?.length === 0 && (
                  <p>start a conversation to see it here</p>
                )}
              </>
            )}
          </>
        }
      />
    </div>
  );
};

export default ConversationsContainer;
