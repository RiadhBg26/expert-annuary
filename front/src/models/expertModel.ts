
//expert models
export interface ExpertModelServer {
    _id: number;
    username: string;
    bday: Date;
    specialty: string;
    image: string;
    email: string;
    password: string;
    isConfirmed: boolean;
    isLoggedIn: boolean;
    profile: any
    jobRequests: any
    chatBox: any[]
}
export interface ExpertResponse {
    count: number;
    experts: ExpertModelServer[];
}

