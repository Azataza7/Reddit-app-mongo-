import React from 'react';
import { Posts } from '../../../types';
import { Avatar, Button, Grid, Typography } from '@mui/material';
import { apiURL } from '../../constants';
import { deepOrange } from '@mui/material/colors';
import dayjs from 'dayjs';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { NavLink, useNavigate } from 'react-router-dom';

interface Props {
  post: Posts;
}


const PostItem: React.FC<Props> = ({post}) => {
  const navigate = useNavigate();

  const handleContainerClick = (postId) => {
    navigate(`/post/${postId}`);
  };
  return (
    <>
      <Grid component="div"
            sx={{
              padding: 2, mb: 2, borderRadius: '20px', cursor: 'pointer', '&:hover': {bgcolor: '#f3f2f2'}
            }}
            onClick={() => handleContainerClick(post._id)}
      >
        <Grid component="div" sx={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <Avatar sx={{bgcolor: deepOrange[500]}}>
            {post.user.username[0].toUpperCase()}
          </Avatar>
          <Typography
            sx={{fontSize: '12px', fontWeight: 700}}
          >
            {post.user.username}
          </Typography>
          <Typography sx={{fontSize: '12px'}}>
            {dayjs(post.datetime).add(6, 'hour').format('YYYY.MM.DD hh.mm.ss')}
          </Typography>
        </Grid>

        <Grid component="div" sx={{mt: 1, mb: 1}}>
          <Typography variant="p" sx={{fontWeight: 600, fontSize: '20px'}}>{post.title}</Typography>
          <Typography sx={{fontWeight: 400, color: '#615e5e'}}>{post.description}</Typography>
        </Grid>

        <Grid component="div" sx={{maxWidth: '100%'}}>
          <img src={apiURL + '/' + post.image} alt={post.user.username + 'image'}
               style={{maxWidth: '100%', height: 'auto', borderRadius: '10px'}}/>
        </Grid>
      </Grid>
      <Button component={NavLink} to={`/post/${post._id}`}
              sx={{color: '#000', bgcolor: '#EEE', borderRadius: '20px'}}>
        <ChatBubbleOutlineRoundedIcon sx={{mr: 1}}/> {post.commentsCount}
      </Button>
      <hr/>
    </>
  );
};

export default PostItem;