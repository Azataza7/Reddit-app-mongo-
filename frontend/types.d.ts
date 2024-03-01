export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface Posts {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: User;
  datetime: string;
  commentsCount: number;
}

export interface PostDetailType {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: User;
  datetime: string;
  comments: CommentType[]
}

export interface CommentType {
  _id: string;
  user: User;
  text: string;
  datetime: string
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface userPost {
  title: string;
  description: string | null;
  image: File | null;
  token: string
}

export interface userComment {
  text: string;
  post: string;
  token: string
}