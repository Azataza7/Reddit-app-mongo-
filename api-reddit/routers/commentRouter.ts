import { Router, Response, NextFunction } from 'express';
import { CommentType, RequestWithUser } from '../types';
import auth from '../middleware/auth';
import mongoose from 'mongoose';
import Comment from '../models/CommentModel';

const commentRouter = Router();

commentRouter.post('/', auth, async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const commentData = <CommentType>{
    user: req.user,
    post: req.body.post,
    text: req.body.text
  };

  try {
    const newComment = await new Comment(commentData);

    await newComment.save();

    return res.status(201).send({message: 'OK', newComment});
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

export default commentRouter;