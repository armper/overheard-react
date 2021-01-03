import { Moment } from 'moment';
import { IOverheardComment } from 'app/shared/model/overheard-comment.model';
import { IUser } from 'app/shared/model/user.model';
import { ITopic } from 'app/shared/model/topic.model';

export interface IPost {
  id?: string;
  title?: string;
  content?: string;
  date?: string;
  rankOne?: number;
  rankTwo?: number;
  rankThree?: number;
  rankFour?: number;
  rankFive?: number;
  rankSix?: number;
  rankSeven?: number;
  overheardComments?: IOverheardComment[];
  user?: IUser;
  topic?: ITopic;
}

export const defaultValue: Readonly<IPost> = {};
