import { Model } from 'mongoose'
import { IUserModel } from './user'
import { IChatModel } from './chat';
export interface IModel {
    user: Model<IUserModel>,
    chat:Model<IChatModel>
}