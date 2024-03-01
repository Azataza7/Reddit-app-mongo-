import React from 'react';
import { Avatar, Grid, Typography } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import dayjs from 'dayjs';
import { CommentType } from '../../../types';

interface Props {
  comment: CommentType
}

const CommentItem:React.FC<Props> = ({comment}) => {
  return (
    <>
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
    </>
  );
};

export default CommentItem;