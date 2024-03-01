import mongoose from 'mongoose';
import { Router } from 'express';
import User from '../models/UserModel';
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

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

userRouter.post('/sessions', async (req, res, next) => {
  try {
    const token = randomUUID();

    const user = await User.findOne({username: req.body.username});

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send({error: 'Username or password is wrong'});
    }

    user.token = token;
    await user.save();

    return res.send({message: 'Success!', user});
  } catch (e) {
    next(e);
  }
});

export default userRouter;