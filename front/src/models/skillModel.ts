
//skill models
export interface SkillModelServer {
    _id: number;
    skill: string;
}
export interface SkillResponse {
    count: number;
    skills: SkillModelServer[];
}

