import mongoose from 'mongoose';
import config from './config';
import User from './models/UserModel';
import Post from './models/PostModel';
import Comment from './models/CommentModel';

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('comments');
    await db.dropCollection('posts');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop');
  }


  const [user1, user2, user3, user4] = await User.create(
    {
      username: 'admin',
      password: 'admin123',
      token: 'admin-admin123'
    },
    {
      username: 'admin1',
      password: 'admin123',
      token: 'admin1-admin123'
    },
    {
      username: 'admin2',
      password: 'admin123',
      token: 'admin2-admin123'
    },
    {
      username: 'admin3',
      password: 'admin123',
      token: 'admin3-admin123'
    }
  );

  const [post1, post2] = await Post.create(
    {
      title: 'Candy Joly rancher',
      description: 'Raccoon and lovely Joly rancher',
      user: user1,
      image: 'fixtures/joly-rancher.png',
      comments: []
    },
    {
      title: 'Famous Thailand boy who made it, any questions?',
      description: 'Lived in poor Thai city with mom who worked hard as she could. I`ve been in Tai criminal band and survived',
      user: user2,
      image: 'fixtures/biography-thaiboy.jpeg',
      comments: []
    }
  );

  await Comment.create(
    {
      user: user2,
      post: post1,
      text: 'How it fitted in your bag?'
    },
    {
      user: user3,
      post: post1,
      text: 'Never try this out at home.'
    },
    {
      user: user1,
      post: post2,
      text: 'Where do you live now?'
    },
    {
      user: user4,
      post: post2,
      text: 'Fake person made by AI!!!'
    },
  );

};

void run();