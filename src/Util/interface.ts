export interface Rutina {
    codRutina: string;
    idRutina: string;
    nivelRutina: string;
    objetivoRutina: string;
}

export interface Semana {
    numeroSemana: String;
    idSemana: String;
}

export interface Dia {
    numeroDia: String;
    idDia: String;
}
export interface Musculo {
    musculoAfectado: String;
    Ejercicios: Ejercicio[];
}
export interface Ejercicio {
    nombreEjercicio: String;
    series: String;
    repeticiones: String;
    intensidad: String;
    imagen: String;
    video: String;

}
export interface Cuenta {
    nombreUsuario: String;
    apellidoUsuario: String;
    nickUsuario: String;
    correoUsuario: String;
    claveUsuario: String;
}

export interface DatosCaracteristicos {
      peso: String;
      talla: String;
      edad: String;
      sexo: String;
      cuello: String;
      brazo: String;
      pecho: String;
      cintura: String;
      cadera: String;
      pierna: String;
      pantorilla: String;
      comidas: String;
      horasSueno: String;
      toma: String;
      fuma: String;
      enfermedadesCardiacas: String;
      meta: String;
      deportista: String;
      deporte: String;
      resistencia: String;
      flecibilidad: String;
      fuerza: String;
      velocidad: String;
      icm: String;
      icmCondicion: String;
}

