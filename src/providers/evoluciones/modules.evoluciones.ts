export interface evolucionClient {
    id_evolucion: number;
    id_cita: number;
    id_cliente: number;
    peso: number;
    altura: number;
    porcentaje_graso: number;
    porcentaje_muscular: number;
    cintura: number;
    cadera: number;
    abdomen: number;
    fecha_evolucion: number;
}

export interface allEvolucionCliente {
    status_code: string;
    body: {
        arrDataUsers: evolucionClient[];
    }
}