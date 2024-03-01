import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../Users/usersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { User, userComment } from '../../../types';
import { addComment } from './CommentThunks';
import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { getPostById } from '../Posts/PostsThunks';
import { selectCommentLoading } from './CommentSlice';

const AddComment = () => {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser);
  const postId = useParams().id.toString();
  const navigate = useNavigate();

  const [commentText, setCommentText] = useState('');
  const onLoading = useAppSelector(selectCommentLoading);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSendComment = async () => {
    const newComment: userComment = {
      text: commentText,
      post: postId,
      token: user.token
    };
    await dispatch(addComment(newComment));
    await dispatch(getPostById(postId));
    setCommentText('');
  };

  return (
    <Grid component="div" sx={{display: 'flex'}}>
      <TextField
        variant="outlined"
        type="text"
        fullWidth
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Enter your comment..."
      />
      <Button disabled={onLoading} type="submit" color="warning" onClick={handleSendComment}>
        Send <SendIcon color="warning"/>
      </Button>
    </Grid>
  );
};

export default AddComment;
