import React, { Suspense, lazy, useState, useMemo, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, IconButton } from "@mui/material";
import Loader from "../../global/Loader";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import {
  getConversationMessages,
  setNewMessage,
  updateAllConversations,
} from "../../../redux/slices/chatSlice";
import { sendMessage } from "../../../utils/sockets/sockets";

const Messages = lazy(() => import("./Messages"));

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexGrow: 1,
    flex: 1,
    flexDirection: "column",
    alignItems: "space-between",
    justifyContent: "space-between",
    height: "calc(100vh - 100px)",
  },
  upper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    borderBottom: "1px solid #D7DFE8",
  },
  upperLeftMain: {
    display: "flex",
    alignItems: "center",
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    objectFit: "cover",
    margin: "0 10px",
    cursor: "pointer",
  },
  username: {
    fontFamily: "bold",
    fontSize: 18,
    color: "#292929",
  },
  userEmail: {
    fontFamily: "light",
    fontSize: 16,
    color: "#89949F",
  },
  upperRightMain: {
    display: "flex",
  },
  icons: {
    cursor: "pointer",
    margin: "0 5px",
  },
  lower: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderTop: "1px solid #D7DFE8",
  },
  inputMain: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F6F8FA",
    borderRadius: 10,
    padding: "0 10px",
  },
  input: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: 35,
    border: "none",
    fontFamily: "medium",
    fontSize: 16,
    "&:focus": {
      outline: "none",
    },
    color: "#9DAFBD",
    backgroundColor: "#F6F8FA",
    // borderRadius: 10,
    // padding: '0 10px',
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const MessagesContainer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chatMessage, setChatMessage] = useState("");
  const [messagesToShow, setMessagesToShow] = useState([]);

  const {
    selectedConversation,
    conversationMessages,
    newMessage,
    allConversations,
    allChatsApi,
  } = useSelector((state) => state.chats);
  const currentUser = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    if (newMessage) {
      if (newMessage?.conversation === selectedConversation?._id)
        setMessagesToShow((prev) => [...prev, newMessage]);

      dispatch(
        updateAllConversations(
          allConversations?.map((elem) => {
            if (elem?._id === newMessage?.conversation)
              return {
                ...elem,
                lastMessage: newMessage?.content,
                lastMessageTime: newMessage?.createdAt,
              };
            else return elem;
          })
        )
      );

      dispatch(setNewMessage(null));
    }
    // eslint-disable-next-line
  }, [newMessage]);
  useEffect(() => {
    // console.log({ conversationMessages });
    if (conversationMessages?.length > 0)
      setMessagesToShow(conversationMessages);
  }, [conversationMessages]);
  useEffect(() => {
    if (selectedConversation?._id) {
      dispatch(getConversationMessages(selectedConversation?._id));
    }
    // eslint-disable-next-line
  }, [selectedConversation]);
  const sender = useMemo(() => {
    if (selectedConversation?.type === "GROUP")
      return { name: selectedConversation?.title };
    return selectedConversation?.participants?.filter(
      (elem) => elem?._id !== currentUser?._id
    )[0];
  }, [selectedConversation, currentUser]);
  const handleSendMessage = () => {
    // console.log({ chatMessage });
    if (chatMessage?.length > 0)
      sendMessage(currentUser?._id, chatMessage, selectedConversation?._id);

    setChatMessage("");
  };
  return (
    <div className={classes.container}>
      <div className={classes.upper}>
        <div className={classes.upperLeftMain}>
          <Avatar
            src={"photo"}
            alt={sender?.name}
            className={classes.profilePic}
          />

          <div>
            <p className={classes.username}>{sender?.name}</p>
          </div>
        </div>
        <div className={classes.upperRightMain}></div>
      </div>
      {allChatsApi?.gettingConversationMessages ? (
        <Loader />
      ) : (
        <>
          {messagesToShow?.length > 0 && (
            <Suspense fallback={<Loader />}>
              {selectedConversation && (
                <Messages conversationMessages={messagesToShow} />
              )}
            </Suspense>
          )}
        </>
      )}

      <div className={classes.lower}>
        <div className={classes.inputMain}>
          <input
            type="text"
            className={classes.input}
            placeholder={"Type"}
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            onKeyUp={(key) => key?.code === "Enter" && handleSendMessage()}
          />

          <IconButton
            sx={{ p: 0, m: 0 }}
            onClick={handleSendMessage}
            disabled={!chatMessage?.length}
          >
            <SendIcon
              style={{
                margin: "0 5px",
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
