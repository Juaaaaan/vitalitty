export interface citasClient {
    id_cita: number,
    id_cliente: number,
    id_dieta: number,
    notas_cita: string,
    fecha_cita: string,
    cita_con_dieta: string
}
export interface dietasClient {
    id_dieta: number,
    id_clientes: number,
    dietas_historica: number,
    url_dieta: string,
    fecha_subida_pdf: string,
    id_dieta_user: string,
    observaciones_dieta: string
}

export interface allCitasCliente {
    status_code: string;
    body: {
        arrDataUsers: citasClient[];
    }
}