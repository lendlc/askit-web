import { Box, Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { MessagesCard } from "./card";

export const MessagesBar = (props) => {
  const handleConversationClick = (id) => {
    console.log('HELLOELLASDLA', id)
    props.handleconvoselect(id);
  };

  return (
    <Card>
      <CardHeader title="Messages" />
      <Divider />
      <CardContent style={{ maxHeight: "40vh", minHeight: "60vh", overflowY: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {props.conversations.length > 0 ? (
            props.conversations.map((x, count) => (
              <MessagesCard
                key={count}
                onClick={() => handleConversationClick(count)}
                name={x.chat_with}
                last_msg={x.last_message?.message}
                is_curr_user={x.last_message?.current_user}
              />
            ))
          ) : (
            <Typography>No Messages</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
