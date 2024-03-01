export interface User {
  _id: string;
  username: string;
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