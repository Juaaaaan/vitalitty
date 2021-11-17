export interface registerUser {
    name: string;
    surname: string;
    email: string;
    password: string;
    tel: number;
    gender: string;
    accept: boolean;
    observaciones?: string;
    rol: string;
}
export interface responseRegisterUser {
    status: string;
    status_code: string;
}

export interface registerPostUser { 
    body: registerUser;
}