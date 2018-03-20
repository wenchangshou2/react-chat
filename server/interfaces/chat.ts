export interface IChat {
    chatid: string;
    from: string;
    to: string;
    read: boolean;
    content: string;
    create_time: Date
}