export interface IRegistration {
    email: string;
    password: string;
    is_active: boolean,
    is_superuser: boolean,
    is_verified: boolean;
    inn: string;
}

export interface IRegistrationResponse {
    email: string;
}

export interface ILogin {
    username: string;
    password: string;
}
