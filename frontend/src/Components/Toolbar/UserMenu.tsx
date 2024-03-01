import React, { useState } from 'react';
import { Avatar, Button, Grid, Menu, MenuItem } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logoutUser, selectUser } from '../../Features/Users/usersSlice';
import LogOutModal from '../Modals/LogOutModal';
import AddIcon from '@mui/icons-material/Add';


const UserMenu = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = async () => {
    await dispatch(logoutUser());
    return navigate('/');
  };

  return (
    <>
      <LogOutModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onLogout={logOutHandler}
      />
      <Grid>
        <Button component={NavLink} to="/addPost" type="button" sx={{color: '#000', bgcolor: '#EEE', borderRadius: '20px', fontWeight: 600}}>
          <AddIcon/> Create
        </Button>

        <Button color="inherit" onClick={handleClick}>
          <Avatar src="/broken-image.jpg" sx={{marginX: 2}}/>
          {user.username}
        </Button>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} keepMounted>
          <MenuItem onClick={() => setOpenModal(true)}>Logout</MenuItem>
        </Menu>
      </Grid>
    </>
  );
};

export default UserMenu;