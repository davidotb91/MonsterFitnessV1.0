export class Constantes{
    public static KEY_PATH_GENERICO = 'http://192.168.1.15:8080/MonsterFitnessSEGv1.0/webresources/';
    public static KEY_OBTENER_RUTINA_POR_ID = Constantes.KEY_PATH_GENERICO +'rutina/obtenerRutinaByCodigo';
    public static KEY_OBTENER_RUTINA_POR_ID_USUARIO = Constantes.KEY_PATH_GENERICO +'rutina/obtenerRutinaByIdUsuario';
    public static KEY_OBTENER_SEMANA_POR_RUTINA = Constantes.KEY_PATH_GENERICO +'rutina/obtenerSemanasByCodigoRutina';
    public static KEY_OBTENER_DIA_POR_SEMANA = Constantes.KEY_PATH_GENERICO +'rutina/obtenerDiasByCodigoSemana';
    public static KEY_OBTENER_EJERCICIOS_POR_MUSCULO = Constantes.KEY_PATH_GENERICO +'rutina/obtenerEjerciciosByMusculo';
    public static KEY_LOGIN = Constantes.KEY_PATH_GENERICO+'login/obtenerLogin';
    public static KEY_VALIDAR_USUARIO = Constantes.KEY_PATH_GENERICO + 'registro/validarUsuario';
    public static KEY_REGISTRAR_USUARIO = Constantes.KEY_PATH_GENERICO + 'registro/registrarUsuario';
    
    //variables de entorno 
    public static KEY_RUTINA_GENERADA_ID_RUTINA = 'idRutina';
    public static KEY_RUTINA_GENERADA_NOMBRE_RUTINA = 'nombreRutina';
    public static KEY_RUTINA_GENERADA_OBJETIVO_RUTINA = 'objetivoRutina';
    public static KEY_USUARIO_ACTUAL = 'usuarioActual';
    public static KEY_RUTINA_GENERADA = 'rutinaGenerada';

    //codigos
    public static KEY_STATUS_LOGIN = '000';
    public static KEY_STATUS_LOGIN_INCORRECTO = '001';
    public static KEY_STATUS_VALIDAR_LOGIN_CORRECTO = '100';
    public static KEY_STATUS_VALIDAR_LOGIN_INCORRECTO = '101';
    

}