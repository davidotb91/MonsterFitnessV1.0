import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Constantes} from "../../config/Constantes";
import { ServicioSEGProvider } from '../../providers/servicio-SEG';
import { alertas } from '../../Util/alertas';
import {Textos } from '../../config/Textos';
import { Cuenta } from '../../Util/interface';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  usuario:string;
  clave:string;
  usuarioLogeado: Cuenta;


  constructor(public navCtrl: NavController, public navParams: NavParams, private servicioSEG:ServicioSEGProvider, private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  navegarPantalla(){
    this.navCtrl.push ("RegistrarPage");
  }

  /**
   * Metodo que sirve para verificar la ultima estadiatica del usuario
   *
   */
  onClickIngresar(){
    const argumentos = {
      usuario:this.usuario,
      clave:this.clave
    }
    this.enviarPeticionSEG(Constantes.KEY_LOGIN,argumentos);

  }

  enviarPeticionSEG(urlPeticion: string, argumentos: any){

    //alert(item);

    const observableSEG$ = this.servicioSEG.getDataSEG_HttpClient(argumentos, urlPeticion);

    observableSEG$
      .subscribe(
        (respuesta: any) => {
          if(urlPeticion === Constantes.KEY_LOGIN){
            if(respuesta.status === "000"){
              sessionStorage.setItem('datos', JSON.stringify(respuesta.datos));
              //this.usuarioLogeado = JSON.parse(respuesta.usuario);
             // this.usuarioLogeado.clave = this.clave;

              sessionStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
              console.log(respuesta)
              const argumentos = {
                codRutina: respuesta.datos.idRutina

              }
              this.enviarPeticionSEG(Constantes.KEY_OBTENER_RUTINA_POR_ID, argumentos);
             
            }else{
              alertas.presentarDialogoGenerico(this.alertCtrl, respuesta.mensaje, [Textos.TEXTO_BTN_ERROR])
              this.usuario="";
              this.clave="";
            }
          }
            if (urlPeticion === Constantes.KEY_OBTENER_RUTINA_POR_ID){
              console.log(respuesta)
              sessionStorage.setItem(Constantes.KEY_RUTINA_GENERADA, JSON.stringify(respuesta))
              this.navCtrl.push("RutinaGeneradaPage")
            }
            
          

        },

        (error) => {

          console.log('erroren Login', error);

        }
      )
  }

  

}
