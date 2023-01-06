import React, { Suspense, lazy, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import PublicIcon from "@mui/icons-material/Public";
import Loader from "../../global/Loader";
import { sendBroadcast } from "../../../utils/sockets/sockets";
import { setNewMessage } from "../../../redux/slices/chatSlice";

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
  sender: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 0,
    color: "#000",
    marginLeft: 20,
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
const PublicChat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [chatMessage, setChatMessage] = useState("");
  const [messagesToShow, setMessagesToShow] = useState([]);

  const { publicMessages, allChatsApi, newBroadcast } = useSelector(
    (state) => state.chats
  );
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    if (newBroadcast) {
      setMessagesToShow((prev) => [...prev, newBroadcast]);
      dispatch(setNewMessage(null));
    }
    // eslint-disable-next-line
  }, [newBroadcast]);
  useEffect(() => {
    // console.log({ conversationMessages });
    if (publicMessages?.length > 0) setMessagesToShow(publicMessages);
  }, [publicMessages]);
  const handleSendMessage = () => {
    // console.log({ chatMessage });
    if (chatMessage?.length > 0) sendBroadcast(currentUser?._id, chatMessage);
    setChatMessage("");
  };
  return (
    <div className={classes.container}>
      <div className={classes.upper}>
        <div className={classes.upperLeftMain}>
          <PublicIcon style={{ color: "#bdbdbd", fontSize: 35 }} />
          <p className={classes.sender}>Public Chat Room</p>
        </div>
        <div className={classes.upperRightMain}></div>
      </div>
      {allChatsApi?.gettingPublicMessages ? (
        <Loader />
      ) : (
        <>
          {messagesToShow?.length > 0 && (
            <Suspense fallback={<Loader />}>
              <Messages conversationMessages={messagesToShow} />
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

export default PublicChat;
