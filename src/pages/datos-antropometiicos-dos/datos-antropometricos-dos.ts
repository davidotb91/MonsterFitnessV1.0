import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatosCaracteristicos, Cuenta } from '../../Util/interface';

/**
 * Generated class for the DatosAntropometiicosDosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-antropometricos-dos',
  templateUrl: 'datos-antropometricos-dos.html',
})
export class DatosAntropometricosDosPage {
  
  myForm: FormGroup;
  cuello:string;
  brazo:string;
  pecho:string;
  cintura:string;
  cadera:string;
  pierna:string;
  pantorilla:string;
  datos:DatosCaracteristicos;
  cuenta:Cuenta;
  datosAntroLogeado: DatosCaracteristicos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
   this.datos = JSON.parse(sessionStorage.getItem("datos"));
   if(sessionStorage.getItem('datosAntroLogeado')){
    this.datosAntroLogeado = JSON.parse(sessionStorage.getItem('datosAntroLogeado'));
    this.pecho = this.datosAntroLogeado.pecho.toString();
    this.cuello = this.datosAntroLogeado.cuello.toString();
    this.brazo = this.datosAntroLogeado.brazo.toString();
    this.cintura = this.datosAntroLogeado.cintura.toString();
    this.cadera = this.datosAntroLogeado.cadera.toString();
    this.pierna = this.datosAntroLogeado.pierna.toString();
    this.pantorilla = this.datosAntroLogeado.pantorilla.toString();
  }

    this.myForm = this.fb.group({
      cuello: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
      brazo: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
      pecho: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
      cintura: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
      cadera: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
      pierna: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
      pantorilla: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosAntropometiicosDosPage');
  }
navegarPantalla() {
  const args = {
    icm: this.datos.icm,
    icmCondicion: this.datos.icmCondicion,
    peso: this.datos.peso,
    sexo: this.datos.sexo,
    edad: this.datos.edad,
    talla: this.datos.talla,
    cuello: this.cuello,
    brazo: this.brazo,
    pecho: this.pecho,
    cintura: this.cintura,
    cadera: this.cadera,
    pierna: this.pierna,
    pantorilla: this.pantorilla,
  }
  sessionStorage.setItem("datos", JSON.stringify(args));
  console.log(args);
  this.navCtrl.push ("HabitosPage");
}

}
