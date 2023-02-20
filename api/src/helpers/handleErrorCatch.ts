/**
 * !!No hace falta darle tipado al error en el catch.
 //TODO: Funcion handle Error instance para catch 
 * @param error =>  Recibe el error del catch
 * @param message => Recibe un mensaje en format de string 
 * @returns Retorna un Objeto con la propiedad message con el mensage del error directamente
 */
export default function getErrorMessage (error?: unknown, message?: string) {
    if(message) return {message: message}
    if (error instanceof Error) return {message: error.message}
    if(error instanceof Object )return {message: {...error}}
    return {message: String(error)}
    
  }
  