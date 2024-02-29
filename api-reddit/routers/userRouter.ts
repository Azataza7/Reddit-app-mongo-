import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../models/UserModel';

const userRouter = Router();

userRouter.get('/', async (req, res) => {
  const results = await User.find();

  return res.send(results);
});

userRouter.post('/', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const user = new User({username, password});

    user.generateToken();

    await user.save();
    res.status(201).send({message: 'ok', user});

  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    next(e);
  }
});

export default userRouter;