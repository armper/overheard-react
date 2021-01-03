import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IPost } from 'app/shared/model/post.model';

export interface IOverheardComment {
  id?: string;
  content?: string;
  date?: string;
  ranking?: number;
  user?: IUser;
  post?: IPost;
}

export const defaultValue: Readonly<IOverheardComment> = {};
