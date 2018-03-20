import { Document } from 'mongoose';
import { IChat } from '../interfaces/chat';
export interface IChatModel extends IChat, Document {

}