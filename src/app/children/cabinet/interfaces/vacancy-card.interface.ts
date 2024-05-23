export interface IVacancyCard {
    id?: string;
    name: string;
    salary: number;
    description?: string;
    city: string;
    employment: string;
    experience?: string;
    companyId?: string;
}

export interface IVacancyCardRequest {
    id?: string;
    name: string;
    salary: number;
    description?: string;
    city: string;
    employment: string;
    experience?: string;
    company_id?: string;
}
