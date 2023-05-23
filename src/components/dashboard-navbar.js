import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useRouter } from 'next/router';
import { AppBar, Button, IconButton, Toolbar, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext } from "react";
import { UserContext } from "context/UserContext";

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
  const router = useRouter();
  const { onSidebarOpen, ...other } = props;
  const { user, setUser } = useContext(UserContext);
  const user_json = JSON.parse(user);

  return (
    <>
      <DashboardNavbarRoot {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: "inline-flex",
                lg: "none",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>

          <Typography color="textPrimary" sx={{ m: 1 }} variant="h4">
            Ask IT
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              //api call here
              localStorage.removeItem("user");
              setUser(null)
              //router.reload(window.location.pathname)
              //setUser(null);
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};
