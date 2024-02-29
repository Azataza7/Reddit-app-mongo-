import { Request } from 'express';

export interface UserFields {
  _id: Object;
  username: string;
  password: string;
  token: string;
}

export interface Post {
  _id: Object;
  user: UserFields;
  title: string;
  description: string | null;
  image: string | null;
}

export interface PostWithComments extends Post {
  commentsCount: number;
  comments: [];
}

export interface CommentType {
  user: UserFields;
  post: Post;
  text: string;
}

export type UserFieldsWithoutId = Omit<UserFields, '_id'>
export type PostWithoutId = Omit<Post, '_id'>

export interface RequestWithUser extends Request {
  user?: UserFields;
}