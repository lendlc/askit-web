import { Avatar, Box, Card, CardContent, Grid, Typography } from "@mui/material";

export const MessagesCard = (props) => (
  <Card style={{ marginBottom: "16px" }} sx={{ width: "100%" }} {...props}>
    <CardContent
      sx={{
        ":hover": {
          backgroundColor: "#e7e7e7",
          cursor: "pointer",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Typography color="textPrimary" sx={{ fontWeight: "bold" }}>
            {props.name}
          </Typography>
          <Typography color="textSecondary" noWrap>
            {(props.is_curr_user ? "you: " : `${props.name}: `) + props.last_msg}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
