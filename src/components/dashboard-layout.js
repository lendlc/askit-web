import { useState, useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import Login from '../pages/login';
import { UserContext } from '../../context/UserContext/index'
import Messenger from 'src/pages/messenger';


const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const {user, setUser} = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(()=>{
    setUser(localStorage.getItem('user'))
    setIsLoggedIn(user ? true : false)
  },[user])
  

  return (
    <>
      {isLoggedIn 
      ? <>
          <Messenger/>
        </>
      : <>
          <Login/>
        </>
      }
    </>
  );
};
