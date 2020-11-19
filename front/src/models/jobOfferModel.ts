
//JobRequest models
export interface JobOfferModelServer {
    _id: number;
    companyId: any;
    jobTitle: string;
    jobDescription: string;
    jobRequirements: any;
    salary: number;
    jobType: string;
    posted: Date;
    expires: Date;
    location: String;
}
export interface JobOfferResponse {
    count: number;
    jobOffers: JobOfferModelServer[];
}

