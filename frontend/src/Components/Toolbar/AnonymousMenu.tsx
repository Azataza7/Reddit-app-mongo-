import React from 'react';
import { Button, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';

const AnonymousMenu = () => {
  return (
    <>
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
    </>
  );
};

export default AnonymousMenu;