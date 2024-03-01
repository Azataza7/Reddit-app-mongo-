import React from 'react';
import { AppBar, Avatar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../Features/Users/usersSlice';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';

const AppToolBar = () => {
  const user = useAppSelector(selectUser);
  
  return (
    <Box sx={{flexGrow: 1, color: '#242424'}}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: 'none', borderBottom: '1px solid #E2DBDBFF'}}>
        <Toolbar sx={{ display: "flex", justifyContent: 'space-between'}}>
          <Link to="/">
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/220px-Reddit_Logo_Icon.svg.png"
              sx={{
                flexGrow: 1,
                maxWidth: 40,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            />
          </Link>
          {user ? (<UserMenu/>) : (<AnonymousMenu/>)}

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;

