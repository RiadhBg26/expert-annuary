export interface ExpertProfileModel {
    personalInfos: [{
        image: string,
        username: string,
        fname: string,
        lname: string,
        biography: string
    }],
    education: [{
        degree: string,
        institution: string,
        year: string
        document: any[]
    }],
    experience: [{
        company: string,
        from: Date
        to: Date
        document: any[]
    }],
    awards: [{
        name: string,
        prizeYear: Date
    }],
    address: string,
}