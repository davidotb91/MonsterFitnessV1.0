import { Component } from '@angular/core';
import { ServicioSEGProvider } from '../../providers/servicio-SEG';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constantes } from '../../config/Constantes';
import { DatosCaracteristicos, Cuenta } from '../../Util/interface';
import { alertas } from '../../Util/alertas';
import { Textos } from '../../config/Textos';

/**
 * Generated class for the ResultadosFisicosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultados-fisicos',
  templateUrl: 'resultados-fisicos.html',
})
export class ResultadosFisicosPage {

  myForm: FormGroup;
  resistencia: String;
  flexibilidad: String;
  fuerza: String;
  velocidad: String;
  datos: DatosCaracteristicos;
  cuenta: Cuenta;
  usuarioLogeado: Cuenta;
  datosAntroLogeado: DatosCaracteristicos;


  constructor(public navCtrl: NavController, public navParams: NavParams, private servicioSEG: ServicioSEGProvider, public fb: FormBuilder, private alertCtrl: AlertController) {
    this.datos = JSON.parse(sessionStorage.getItem("datos"));
    if(sessionStorage.getItem('datosAntroLogeado')){
      this.datosAntroLogeado = JSON.parse(sessionStorage.getItem('datosAntroLogeado'));
      this.resistencia = this.datosAntroLogeado.resistencia.toString();
      this.fuerza = this.datosAntroLogeado.fuerza.toString();
      this.velocidad = this.datosAntroLogeado.velocidad.toString();
      this.flexibilidad = this.datosAntroLogeado.flecibilidad.toString();
    }
    this.cuenta = JSON.parse(sessionStorage.getItem("usuario"));
    this.myForm = this.fb.group({
      resistencia: ['', [Validators.required]],
      flexibilidad: ['', [Validators.required]],
      fuerza: ['', [Validators.required]],
      velocidad: ['', [Validators.required]],
    });
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ResultadosFisicosPage');
  }
  navegarPantalla() {

    const args = {
      icm: this.datos.icm.toString(),
      icmCondicion: this.datos.icmCondicion,
      nombre: this.cuenta.nombreUsuario,
      apellido: this.cuenta.apellidoUsuario,
      usuario: this.cuenta.nickUsuario,
      correo: this.cuenta.correoUsuario,
      clave: this.cuenta.claveUsuario,
      peso: this.datos.peso,
      sexo: this.datos.sexo,
      edad: this.datos.edad,
      talla: this.datos.talla,
      cuello: this.datos.cuello,
      brazo: this.datos.brazo,
      pecho: this.datos.pecho,
      cintura: this.datos.cintura,
      cadera: this.datos.cadera,
      pierna: this.datos.pierna,
      pantorilla: this.datos.pantorilla,
      comidas: this.datos.comidas,
      horasSueno: this.datos.horasSueno,
      toma: this.datos.toma,
      fuma: this.datos.fuma,
      enfermedadesCardiacas: this.datos.enfermedadesCardiacas,
      meta: this.datos.meta,
      deportista: this.datos.deportista,
      deporte: this.datos.deporte,
      resistencia: this.resistencia,
      flexibilidad: this.flexibilidad,
      fuerza: this.fuerza,
      velocidad: this.velocidad,
    }
    console.log(args)
    this.enviarPeticionSEG(Constantes.KEY_REGISTRAR_USUARIO, args);

  }
  enviarPeticionSEG(url: String, item: any) {

    const observableSEG$ = this.servicioSEG.getDataSEG_HttpClient(item, url);

    observableSEG$
      .subscribe(
        (respuesta: any) => {
          console.log(respuesta);

          if (url === Constantes.KEY_REGISTRAR_USUARIO) {
            if (respuesta.status === '500') {
              const alertaRespuesta = this.alertCtrl.create({
                title: Textos.TEXTO_TITULO_PRINCIPAL,
                message: respuesta.mensaje,
                buttons: [
                  {
                    text: Textos.TEXTO_BTN_ACEPTAR,
                    handler: () => {
                      //this.navCtrl.push(LoginPage);
                      this.navCtrl.popToRoot();
                    }
                  }
                ]
              });
              alertaRespuesta.present();
            }
            if (respuesta.status === '600') {

              const alertaRespuesta = this.alertCtrl.create({
                title: Textos.TEXTO_TITULO_PRINCIPAL,
                message: respuesta.mensaje,
                buttons: [
                  {
                    text: Textos.TEXTO_BTN_ACEPTAR,
                    handler: () => {
                      const argumentos = {
                        usuario:this.cuenta.nickUsuario,
                        clave:this.cuenta.claveUsuario
                      }
                      this.enviarPeticionSEG(Constantes.KEY_LOGIN,argumentos);
                    }
                  }
                ]
              });
              alertaRespuesta.present();
            }

          }
          if (url === Constantes.KEY_OBTENER_RUTINA_POR_ID) {
            console.log(respuesta);
            sessionStorage.setItem(Constantes.KEY_RUTINA_GENERADA, JSON.stringify(respuesta));
            this.navCtrl.push("RutinaGeneradaPage");
          }
          if (url === Constantes.KEY_LOGIN) {
            if (respuesta.status === "000") {
              sessionStorage.setItem('datos', JSON.stringify(respuesta.datos));
              console.log(respuesta)
              const argumentos = {
                codRutina: respuesta.datos.idRutina

              }
              this.enviarPeticionSEG(Constantes.KEY_OBTENER_RUTINA_POR_ID, argumentos);
            }
          }

        },

        (error) => {

          console.log('error', error);

        }
      )
  }

}
