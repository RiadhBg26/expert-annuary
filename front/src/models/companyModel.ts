
//Company models
export interface CompanyModelServer {
    _id: number;
    name: string;
    image: any;
    gallery: any[];
    specialty:string;
    email: string;
    password: string;
    isConfirmed: boolean;
    isLoggedIn: boolean;
    profile: any;
    jobOffers: any;
    chatBox: any[]
}

export interface CompanyResponse {
    count: number;
    companies: CompanyModelServer[]
}
