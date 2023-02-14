// SOLO PARA DEFINICION - TIPOS GLOBALES
// ?: El campo puede existir o no. Permitiendo redefinir el modelo
export type User = {
    firstname?: string | undefined;
    lastname?: string | undefined;
    // Registro
    fullname: string;
    password: string;
    email: string;
    news_letter?: boolean;
    //
    id?: number;
    id_role?: number | undefined;
  };