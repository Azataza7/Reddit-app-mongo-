import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPostById } from './PostsThunks';
import { selectLoadingPostDetail, selectPostDetail } from './PostsSlice';
import { Avatar, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import dayjs from 'dayjs';
import { apiURL } from '../../constants';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { PostDetailType, User } from '../../../types';
import CommentItem from '../Comment/CommentItem';
import AddComment from '../Comment/AddComment';
import { selectUser } from '../Users/usersSlice';

const PostDetails = () => {
  const postId = useParams().id.toString();
  const dispatch = useAppDispatch();
  const user: User = useAppSelector(selectUser);
  const postDetails: PostDetailType = useAppSelector(selectPostDetail);
  const onLoading: boolean = useAppSelector(selectLoadingPostDetail);
  const commentsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  const scrollToComments = () => {
    commentsContainerRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  if (onLoading || !postDetails) {
    return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}} size={60} color="warning"/>;
  }

  const commentsContainer: JSX.Element[] = postDetails.comments.map((comment) => (
    <CommentItem key={comment._id} comment={comment}/>
  ));

  return (
    <>
      <Grid component="div"
            sx={{
              padding: 2, mb: 10, borderRadius: '20px', cursor: 'pointer',
            }}>
        <Grid component="div" sx={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <Avatar sx={{bgcolor: deepOrange[500]}}>
            {postDetails.user.username[0].toUpperCase()}
          </Avatar>
          <Typography
            sx={{fontSize: '12px', fontWeight: 700}}
          >
            {postDetails.user.username}
          </Typography>
          <Typography sx={{fontSize: '12px'}}>
            {dayjs(postDetails.datetime).add(6, 'hour').format('YYYY.MM.DD hh.mm.ss')}
          </Typography>
          <Button component="div" sx={{color: '#000', bgcolor: '#EEE', borderRadius: '20px'}}
                  onClick={scrollToComments}>
            <ChatBubbleOutlineRoundedIcon sx={{mr: 1}}/>
            {postDetails.comments.length}
          </Button>
        </Grid>

        <Grid component="div" sx={{mt: 1, mb: 1}}>
          <Typography variant="p" sx={{fontWeight: 600, fontSize: '20px'}}>
            {postDetails.title}
          </Typography>
          <Typography sx={{fontWeight: 400, color: '#615e5e'}}>
            {postDetails.description}
          </Typography>
        </Grid>

        <Grid component="div" sx={{maxWidth: '100%'}}>
          {postDetails.image && (
            <img src={apiURL + '/' + postDetails.image} alt={postDetails.user.username + 'image'}
                 style={{maxWidth: '100%', height: 'auto', borderRadius: '10px'}}/>
          )}
        </Grid>
      </Grid>
      {user && (
        <Grid component="div" sx={{padding: 5}}>
          <AddComment/>
        </Grid>
      )}
      <Grid ref={commentsContainerRef}>
        {commentsContainer.reverse()}
      </Grid>
    </>
  );
};

export default PostDetails;
