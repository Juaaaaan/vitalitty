export interface dietasClient {
    id_dietas: number,
    id_clientes: number,
    dietas_historica: number,
    url_dieta: string;
    fecha_subida_pdf: string;
    id_dieta_user: string;
    observaciones?: string
}

export interface dietasCliente {
    status_code: string;
    body: {
        arrDietasUsers: dietasClient[];
    }
}