import React, { Suspense, lazy, useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";
import ConversationsContainer from "../components/chatComponents/conversations/ConversationsContainer";
import TopBar from "../components/chatComponents/TopBar";
import {
  disconnectChatService,
  joinChatService,
  newConversationListener,
  newGroupListener,
  receiveBroadcast,
  receiveMessages,
} from "../utils/sockets/sockets";
import { useDispatch, useSelector } from "react-redux";
import {
  getPublicMessages,
  updateAllConversations,
  updateGroupConversations,
} from "../redux/slices/chatSlice";
import Loader from "../components/global/Loader";
const MessagesContainer = lazy(() =>
  import("../components/chatComponents/messages/MessagesContainer")
);
const PublicChat = lazy(() =>
  import("../components/chatComponents/messages/PublicChat")
);

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  "@media (max-width: 1024px)": {
    container: {
      flexDirection: "column",
    },
  },
}));
const Chats = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { selectedConversation, allConversations, allGroups } = useSelector(
    (state) => state.chats
  );

  const [updatedConversation, setUpdatedConversation] = useState();
  const [updatedGroup, setUpdatedGroup] = useState();

  useEffect(() => {
    if (updatedConversation) {
      dispatch(
        updateAllConversations([...allConversations, updatedConversation])
      );
      setUpdatedConversation(null);
    }
    // eslint-disable-next-line
  }, [updatedConversation]);
  useEffect(() => {
    if (updatedGroup) {
      dispatch(updateGroupConversations([...allGroups, updatedGroup]));
      setUpdatedGroup(null);
    }
    // eslint-disable-next-line
  }, [updatedGroup]);
  useEffect(() => {
    if (currentUser) {
      joinChatService(currentUser?._id);
      receiveMessages(dispatch);
      receiveBroadcast(dispatch);
      newConversationListener(setUpdatedConversation);
      newGroupListener(setUpdatedGroup);
    }

    return () => {
      disconnectChatService();
    };
    // eslint-disable-next-line
  }, [currentUser]);
  useEffect(() => {
    if (!selectedConversation) dispatch(getPublicMessages());
    // eslint-disable-next-line
  }, [selectedConversation]);

  return (
    <div className={classes.container}>
      <TopBar />
      <Grid container>
        <Grid item sm={12} md={3}>
          <ConversationsContainer />
        </Grid>
        <Grid item sm={12} md={9}>
          <Suspense fallback={<Loader />}>
            {selectedConversation ? <MessagesContainer /> : <PublicChat />}
          </Suspense>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chats;
