import { NextFunction, Router, Response } from 'express';
import { PostWithoutId, RequestWithUser } from '../types';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import Post from '../models/PostModel';

const postRouter = Router();

postRouter.post('/', auth ,imagesUpload.single('image'),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {

    const postData = {
      title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      user: req.user
    };

    try {
      const newPost = await new Post(postData);
      await newPost.save();

      return res.status(201).send({message: 'OK', newPost})
    } catch (e) {
      next(e);
    }
  });

export default postRouter;