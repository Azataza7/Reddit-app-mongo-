import { NextFunction, Request, Response, Router } from 'express';
import { PostWithComments, PostWithoutId, RequestWithUser } from '../types';
import { imagesUpload } from '../multer';
import auth from '../middleware/auth';
import Post from '../models/PostModel';
import mongoose from 'mongoose';
import Comment from '../models/CommentModel';

const postRouter = Router();

postRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts: PostWithComments[] = await Post.find().populate('user', 'username').lean();

    for (let post of posts) {
      const comments = await Comment.find({post: post._id}).lean();
      post.commentsCount = comments.length;
    }

    return res.send(posts);
  } catch (e) {
    next(e);
  }
});

postRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id).populate('user', 'username').lean();

    if (!post) {
      return res.status(404).send({message: 'Post not found'});
    }

    post.comments = await Comment.find({post: id}).populate('user', 'username').lean();

    return res.send(post);
  } catch (error) {
    next(error);
  }
});


postRouter.post('/', auth, imagesUpload.single('image'),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const description = req.body.description;
    const image = req.file;

    if (!description && !image) {
      return res.status(400).send({error: 'Fill image or description area. Or both of them'});
    }

    const postData = <PostWithoutId>{
      title: req.body.title,
      description: req.body.description || null,
      image: req.file ? req.file.filename : null,
      user: req.user
    };

    try {
      const newPost = await new Post(postData);
      await newPost.save();

      return res.status(201).send({message: 'OK', newPost});
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  });

export default postRouter;