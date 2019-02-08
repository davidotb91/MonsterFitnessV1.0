import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatosCaracteristicos } from '../../Util/interface';

/**
 * Generated class for the ActualizarDatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-actualizar-datos',
  templateUrl: 'actualizar-datos.html',
})
export class ActualizarDatosPage {

  datos:DatosCaracteristicos;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.datos = JSON.parse(sessionStorage.getItem("datos"));
  }

  ionViewDidLoad() {
    
    console.log("Peso: "+this.datos.peso);
    console.log('ionViewDidLoad ActualizarDatosPage');
  }

  actualizarDatos(){
    this.navCtrl.push("DatosAntropometricosPage")
  }

  verRutina(){
    this.navCtrl.push("RutinaGeneradaPage")
  }

}
