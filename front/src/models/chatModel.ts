
//skill models
export interface ChatModelServer {
    _id: number;
    sender: {
        name: any;
        message: {
            value : string[],
            time : Date
        }
    }
    reciepent: {
        name: any;
        message: {
            value : [],
            time : Date
        }
    }
}
export interface ChatResponse {
    count: number;
    chats: ChatModelServer[];
}

