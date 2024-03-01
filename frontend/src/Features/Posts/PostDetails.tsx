import React, { useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPostById } from './PostsThunks';
import { selectLoadingPostDetail, selectPostDetail } from './PostsSlice';
import { Avatar, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import dayjs from 'dayjs';
import { apiURL } from '../../constants';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import { PostDetailType } from '../../../types';

const PostDetails = () => {
  const postId = useParams().id.toString();
  const dispatch = useAppDispatch();
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
    <Grid key={comment._id}
          sx={{
            mb: 3,
            bgcolor: '#f3f2f2',
            borderRadius: '15px',
            padding: 2,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '-10px',
              left: '10px',
              width: 0,
              height: 0,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              borderRight: '10px solid #f3f2f2',
            }
          }}
    >
      <Grid component="div" sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        <Avatar sx={{bgcolor: deepOrange[500]}}>
          {comment.user.username[0].toUpperCase()}
        </Avatar>
        <Typography>{comment.user.username}</Typography>
        <Typography>
          {dayjs(comment.datetime).add(6, 'hour').format('YYYY.MM.DD hh.mm.ss')}
        </Typography>
      </Grid>
      <Typography sx={{ml: 6.5}}>{comment.text}</Typography>
    </Grid>
  ));

  return (
    <>
      <Grid component="div"
            sx={{
              padding: 2, mb: 10, borderRadius: '20px', cursor: 'pointer', '&:hover': {bgcolor: '#f3f2f2'}
            }}
      >
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
      <div ref={commentsContainerRef}>
        {commentsContainer}
      </div>
    </>
  );
};

export default PostDetails;
