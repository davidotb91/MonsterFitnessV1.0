import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuenta } from '../../Util/interface';
import { ServicioSEGProvider } from '../../providers/servicio-SEG';
import { Constantes } from '../../config/Constantes';
import { Textos } from '../../config/Textos';
import { alertas } from '../../Util/alertas';

/**
 * Generated class for the RegistrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  myForm: FormGroup;
  nombre:string;
  apellido:string;
  usuario:string;
  correo:string;
  password:string;
  cuenta:Cuenta;

  constructor(public navCtrl: NavController,private servicioSEG:ServicioSEGProvider,  public navParams: NavParams, public fb: FormBuilder, private alertCtrl:AlertController) {
     
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      usuario: ['', [Validators.required, Validators]],
      correo: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]], // validar correo
      password: ['', [Validators.required, ]],
      

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarPage');
  }

  onClickSiguiente(){
    const args = {
      usuario: this.usuario
    }
    this.enviarPeticionSEG(Constantes.KEY_VALIDAR_USUARIO, args);

  }

  enviarPeticionSEG(urlPeticion: string, argumentos: any){

    //alert(item);

    const observableSEG$ = this.servicioSEG.getDataSEG_HttpClient(argumentos, urlPeticion);

    observableSEG$
      .subscribe(
        (respuesta: any) => {
          if(urlPeticion === Constantes.KEY_VALIDAR_USUARIO){
            if(respuesta.status === Constantes.KEY_STATUS_VALIDAR_LOGIN_CORRECTO){
              console.log("usuario validado")
              const args = {
                nombreUsuario: this.nombre,
                apellidoUsuario: this.apellido,
                nickUsuario: this.usuario,
                correoUsuario: this.correo,
                clave: this.password
              };
              sessionStorage.setItem("usuario", JSON.stringify(args))
              this.navCtrl.push("DatosAntropometricosPage")
            
            }else{
              alertas.presentarDialogoGenerico(this.alertCtrl, respuesta.mensaje, [Textos.TEXTO_BTN_ERROR])
              this.usuario="";
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
