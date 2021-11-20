export interface registerUser {
    name: string;
    surname: string;
    email: string;
    password: string;
    tel: number;
    gender: string;
    accept: boolean;
    observations?: string;
    rol: string;
}
export interface responseRegisterUser {
    status: string;
    status_code: string;
}

export interface registerPostUser { 
    body: registerUser;
}

export interface clientData {
    status_code: string;
    body: {
        arrDataUsers: allDataClient[];
    }
}


export interface clientSearch {
    name: string;
    profilePic: string;
    about: string;
  }

export interface allDataClient {
    id_clientes: string;
    id_user: string;
    nombre: string;
    apellidos: string;
    fecha_creacion: string;
    fecha_nacimiento: string;
    email: string;
    telefono: string;
    genero: string;
    observaciones: string;
}