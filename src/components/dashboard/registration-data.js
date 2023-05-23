import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect, useRef } from "react";
import useApi from "src/utils/http";

export const RegistrationData = (props) => {
  const theme = useTheme();

  const messagesEndRef = useRef(null);

  const handleSendToggleWrapper = () => {
    console.log("Toggle Was Activated");
    props.handleToggle();
  };

  const componentDidMount = () => {
    this.scrollToBottom();
  };
  const componentDidUpdate = () => {
    this.scrollToBottom();
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const SubmitMessage = async (payload) => {
    const { data, code } = await useApi("POST", "/chat/message/", payload);

    if (code >= 200) {
      console.log("Message Sent");
    }
  };

  const own_msg_style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.msgs]);

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: Yup.object({
      message: Yup.string().max(150),
    }),
    onSubmit: async () => {
      formik.setSubmitting(false);

      const payload = {
        conversation: props.convoData.id,
        message: formik.values.message,
      };

      console.log('asdsadd', props)

      //post message
      await SubmitMessage(payload);

      //set value back to empty string
      formik.values.message = "";
      formik.resetForm();

      handleSendToggleWrapper();
    },
  });

  return (
    <Card>
      <CardHeader title={props.title ?? "No Data"} />
      <Divider />

      <CardContent style={{ maxHeight: "50vh", minHeight: "52vh", overflowY: "auto" }}>
        {props.msgs.length == 0 ?? <h3 className="text-center">Start Messaging</h3>}

        {props.msgs.length >= 0 ? (
          props.msgs.map((item, count) => (
            <Box style={item.current_user ? own_msg_style : null} key={count}>
              <Typography color={item.current_user ? "primary" : null} variant="h6">
                {item.current_user ? "you: " : `${props.convoData.chat_with}: `}
              </Typography>

              <Typography color="textSecondary">{item.message}</Typography>
            </Box>
          ))
        ) : (
          <h3 className="text-center">Find Someone to Chat with Using the Mobile App Now.</h3>
        )}
        <Box ref={messagesEndRef} />
      </CardContent>

      <Box sx={{ flexGrow: 2 }} />
      <Divider />
      <Box sx={{ p: 1, flexGrow: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid
              item
              sx={{
                width: "90%",
                alignItems: "center",
                display: "flex",
              }}
            >
              <TextField
                error={Boolean(formik.touched.message && formik.errors.message)}
                fullWidth
                helperText={formik.touched.message && formik.errors.message}
                margin="dense"
                name="message"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                }}
                type="text"
                // disabled={props.msgs.length <= 0}
                value={formik.values.message}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              sx={{
                width: "10%",
                alignItems: "center",
                display: "flex",
                padding: "0",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                disabled={formik.values.message == ""}
                size="large"
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Divider />
    </Card>
  );
};
