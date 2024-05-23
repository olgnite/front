export interface ICompany {
    industry: string;
    yearOfFoundation: number;
    city: string;
    street: string;
    house: string;
    numberOfEmployees: string;
    aboutCompany: string;
    site: string;
    phone: string;
    email: string;
    link: string;
}

export interface ICompanyV2 {
    id?: string;
    email: string;
    isActive?: boolean;
    isSuperUser?: boolean;
    isVerified?: boolean;
    inn: string;
    companyName: string;
    description: string;
    fieldOfActivity: string;
    yearОfFoundation: number;
    city: string;
    street: string;
    house: string;
    numberOfEmployees: string;
    image: string;
    personalSite: string;
    phone: string;
    contactEmail: string;
    socialNetworkLink: string;
    registeredAt: string;
}

export interface ICompanyV2Request {
    id?: string;
    email?: string;
    is_active?: boolean;
    is_superuser?: boolean;
    is_verified?: boolean;
    inn?: string;
    company_name?: string;
    description: string;
    field_of_activity: string;
    year_of_foundation: number;
    city: string;
    street: string;
    house: string;
    number_of_employees: string;
    image_id?: string;
    personal_site: string;
    phone: string;
    contact_email: string;
    social_network_link: string;
    registered_at?: string;
}
