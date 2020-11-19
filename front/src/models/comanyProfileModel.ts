
export interface CompanyProfileModel {
    technicalInfos: [{ 
        _id: number
        name: string
        image: string
        gallery: any[],
        website: string
        about: string
        fields: string[]
        comanySize: number
        founded: Date;
        location: string;
    }],
    awards: [{
        _id: number
        prize: string
        prizeYear: Date
    }],

}