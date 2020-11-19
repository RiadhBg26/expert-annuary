
//JobRequest models
export interface JobRequestModelServer {
    _id: number;
    expertId: any
    jobTitle: string;
    jobDescription: string;
    skills: any[]
}
export interface JobRequestResponse {
    count: number;
    jobRequests: JobRequestModelServer[];
}

