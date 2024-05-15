export interface ICompany {
    industry: string;
    yearOfFoundation: string;
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
