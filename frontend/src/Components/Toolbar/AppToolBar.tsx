import React from 'react';
import { AppBar, Avatar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';

const AppToolBar = () => {
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
          <Grid component="div">
            <Button
              component={NavLink} to="/login"
              sx={{
                padding: 1.5, borderRadius: 10, color: '#FFF', bgcolor: '#d93a00', fontWeight: 600,
                '&:hover': {
                  bgcolor: '#ab3517',
                }
              }}>
              Log In
            </Button>
            <Button
              component={NavLink} to="/register"
              sx={{
                padding: 1.5, borderRadius: 10, color: '#d93a00', bgcolor: '#FFF', fontWeight: 600,
                '&:hover': {
                  bgcolor: '#d93a00',
                  color: '#FFF'
                }
              }}>
              Sign Up
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolBar;

