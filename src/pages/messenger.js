import { useEffect, useState } from "react";

import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { RegistrationData } from "src/components/dashboard/registration-data";
import { MessagesBar } from "src/components/dashboard/messages-bar";
import { DashboardNavbar } from "src/components/dashboard-navbar";

import useApi from "src/utils/http";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [messages, setMessages] = useState({ messages: [] });
  const [sendToggle, setSendToggle] = useState(false);
  const [tick, setTick] = useState(0);

  const handleConversationSelect = (id) => {
    setSelectedConversation(id);
  };

  const handleSendToggle = () => {
    //trigger a reload when a message is sent
    setSendToggle(!sendToggle);
  };

  const counter = () => {
    setInterval(() => setTick((tick += 1)), 5000);
  };

  const GetConversationList = async () => {
    const { data, code } = await useApi("GET", `/chat/conversations/`);

    if (code >= 200) {
      setConversations(data);
    }
  };

  const GetConversationMessages = async () => {
    if (conversations.length > 0) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { data, code } = await useApi(
        "GET",
        `/chat/conversations/${conversations[selectedConversation]?.id}/`
      );

      if (code >= 200) {
        setMessages(data);
      }
    }
  };

  useEffect(() => {
    GetConversationList();
    GetConversationMessages();
    counter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation, sendToggle, tick]);

  return (
    <>
      <Head>
        <title>Ask IT - Home</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <DashboardNavbar />
        <Container maxWidth={"lg"} 
          spacing={2}>
          <Box sx={{ pt: 6 }}>
            <Grid container >
              <Grid item 
              // eslint-disable-next-line react/jsx-max-props-per-line
              lg={4} md={6} xl={3} xs={12}>
                <MessagesBar
                  conversations={conversations}
                  sx={{ height: "100%" }}
                  handleconvoselect={handleConversationSelect}
                />
              </Grid>
              <Grid item 
              // eslint-disable-next-line react/jsx-max-props-per-line
              lg={8} md={12} xl={9} xs={12}>
                <RegistrationData
                  title={conversations[selectedConversation]?.chat_with}
                  msgs={messages.messages}
                  convoData={conversations[selectedConversation]}
                  handleToggle={handleSendToggle}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Messenger;
