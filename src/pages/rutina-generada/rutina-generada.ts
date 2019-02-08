import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Semana, Dia, Ejercicio, Musculo, Rutina, DatosCaracteristicos } from '../../Util/interface';
import { ServicioSEGProvider } from '../../providers/servicio-SEG';
import { Constantes } from '../../config/Constantes';
import { ModalController } from 'ionic-angular';
import { ModalPage } from '../modal/modal';

/**
 * Generated class for the RutinaGeneradaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rutina-generada',
  templateUrl: 'rutina-generada.html',
})
export class RutinaGeneradaPage {

  rutinaGenerada: Rutina;
  numeroSemana: Semana[];
  musculoAfectado: Musculo[];
  ejercicio: Ejercicio[];
  idSemana: String;
  numeroDia: Dia[];
  banderaDia: boolean;
  banderaSemana: boolean;
  banderaEjercicio: boolean;
  numSem:string;
  numDia:string;
  musculo: string;
  mostarDias: boolean;
  datos:DatosCaracteristicos;

  constructor(public navCtrl: NavController, public navParams: NavParams, private servicioSEG: ServicioSEGProvider, public modalCtrl : ModalController) {
    this.rutinaGenerada = JSON.parse(sessionStorage.getItem(Constantes.KEY_RUTINA_GENERADA));
  }
  navegarPantalla(){
    this.navCtrl.push("ActualizarDatosPage")
  }

  ionViewDidLoad() {
    this.banderaEjercicio = false;
    this.banderaSemana = false;
    this.mostarDias = false;

    console.log('ionViewDidLoad RutinaGeneradaPage');
  }
  ionViewWillLoad(){
    
    this.datos = JSON.parse(sessionStorage.getItem("datos"));
    console.log(this.datos.peso);
    const item = {
      codRutina: this.rutinaGenerada.idRutina
      //codRutina: "1"

    };
    console.log(item);
    this.enviarPeticionSEG(Constantes.KEY_OBTENER_SEMANA_POR_RUTINA, item);
  }

  enviarPeticionSEG(url: String, item: any) {
    // alert(item);

    const observableSEG$ = this.servicioSEG.getDataSEG_HttpClient(item, url);

    observableSEG$
      .subscribe(
        (respuesta: any) => {
          if (url === Constantes.KEY_OBTENER_SEMANA_POR_RUTINA) {
            this.numeroSemana = respuesta;
            console.log(this.numeroSemana);
          }
          if (url === Constantes.KEY_OBTENER_DIA_POR_SEMANA) {
            this.numeroDia = respuesta;
            console.log(this.numeroDia);
          }
          if (url === Constantes.KEY_OBTENER_EJERCICIOS_POR_MUSCULO) {
            this.musculoAfectado = respuesta;
            //this.ejercicio = respuesta;
            console.log('estos son los musculos afectados ',this.musculoAfectado);
          }
        },

        (error) => {

          console.log('error', error);

        }
      )
  }

  cargarDias(sem: Semana) {
    sessionStorage.setItem('numSem', sem.idSemana.toString());
    const itemDias = {
      //codRutina: "1",
      codRutina: this.rutinaGenerada.idRutina,
      codSemana: sem.idSemana

    }
    console.log(itemDias);
    
    this.enviarPeticionSEG(Constantes.KEY_OBTENER_DIA_POR_SEMANA, itemDias)
    this.banderaSemana = false;
  }
  mostrarListaSemana() {
    this.banderaSemana = true;


  }

  mostrarDias() {
    this.mostarDias = true;
  }

  cargarEjercicio(dia:Dia){
    const itemEjercicio = {
      codRutina: this.rutinaGenerada.idRutina,
      //codRutina: "1",
      //codSemana: "1",
      codSemana: sessionStorage.getItem('numSem'),
      codDia: dia.idDia.toString()
    }
    console.log(itemEjercicio)
    this.enviarPeticionSEG(Constantes.KEY_OBTENER_EJERCICIOS_POR_MUSCULO, itemEjercicio)
    this.banderaEjercicio = true;
  }
  seleccionarEjercicio(m:Musculo){
    
    this.ejercicio = m.Ejercicios;
    
    console.log('este es el m seleccionado',this.ejercicio);
    
     }

  public openModal(ej: Ejercicio){
  
      const argumentos = {
        nombreEjercicio: ej.nombreEjercicio.toString(),
        series: ej.series.toString(),
        repeticiones: ej.repeticiones.toString(),
        intensidad: ej.intensidad.toString(),
        imagen: ej.imagen.toString()
      }
      this.navCtrl.push(ModalPage, argumentos)
     
    
  } 

}
