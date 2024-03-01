import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPosts } from './PostsThunks';
import { selectLoadingPosts, selectPosts } from './PostsSlice';
import { CircularProgress, Grid } from '@mui/material';
import { Posts } from '../../../types';
import PostItem from './PostItem';

const Posts = () => {
  const dispatch = useAppDispatch();
  const posts: Posts[] = useAppSelector(selectPosts);
  const onLoading: boolean = useAppSelector(selectLoadingPosts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (onLoading) {
    return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}} size={60} color="warning"/>;
  }

  const postsContainer: JSX.Element[] = posts.map((postItem) => (
    <PostItem key={postItem._id} post={postItem}/>
  ));

  console.log(posts);

  return (
    <Grid component="div" sx={{mt: 2, maxWidth: '600px', margin: '0 10px 0 auto'}}>
      {postsContainer}
    </Grid>
  );
};

export default Posts;