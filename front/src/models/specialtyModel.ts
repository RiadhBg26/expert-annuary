
//speciality models
export interface SpecialityModelServer {
    _id: number;
    title: string;
    file: any
}
export interface SpecialityResponse {
    count: number;
    specialties: SpecialityModelServer[];
}

