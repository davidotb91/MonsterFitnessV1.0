import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatosCaracteristicos, Cuenta } from '../../Util/interface';

/**
 * Generated class for the HabitosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-habitos',
  templateUrl: 'habitos.html',
})
export class HabitosPage {

  myForm: FormGroup;
  myForm2: FormGroup;
  comidas:string;
  horasSueno:string;
  toma:string;
  fuma:string;
  enfermedadesCardiacas:string;
  meta:string;
  deportista:string;
  deporte:string = "";
  datos:DatosCaracteristicos;
  datosAntroLogeado: DatosCaracteristicos;
  


  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {
    this.datos = JSON.parse(sessionStorage.getItem("datos"));

    if(sessionStorage.getItem('datosAntroLogeado')){
      this.datosAntroLogeado = JSON.parse(sessionStorage.getItem('datosAntroLogeado'));
      this.comidas = this.datosAntroLogeado.comidas.toString();
      this.horasSueno = this.datosAntroLogeado.horasSueno.toString();
      this.toma = this.datosAntroLogeado.toma.toString();
      this.fuma = this.datosAntroLogeado.fuma.toString();
      this.enfermedadesCardiacas = this.datosAntroLogeado.enfermedadesCardiacas.toString();
      this.meta = this.datosAntroLogeado.meta.toString();
      //this.deportista = this.datosAntroLogeado.deportista.toString();
      if(this.datosAntroLogeado.deporte){
        this.deporte = this.datosAntroLogeado.deporte.toString();
        this.deportista = "SI";
      }
    }

    this.myForm = this.fb.group({
      comidas: ['', [Validators.required, Validators.pattern(/^[0-9]{1}$/)]],
      horasSueno: ['', [Validators.required, Validators.pattern(/^[0-9]{1,2}$/)]],
      toma: ['', [Validators.required]],
      fuma: ['', [Validators.required]],
      enfermedadesCardiacas: ['', [Validators.required]],
    });

    this.myForm2 = this.fb.group({
      meta: ['', [Validators.required]],
      deportista: ['', [Validators.required]],
    })
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad HabitosPage');
  }
  navegarPantalla(){
    const args = {
      icm: this.datos.icm,
      icmCondicion: this.datos.icmCondicion,
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
      comidas:this.comidas,
      horasSueno:this.horasSueno,
      toma:this.toma,
      fuma:this.fuma,
      enfermedadesCardiacas:this.enfermedadesCardiacas,
      meta:this.meta,
      deportista:this.deportista,
      deporte:this.deporte,
    }
    sessionStorage.setItem("datos", JSON.stringify(args));
    console.log(args)
    this.navCtrl.push ("ResultadosFisicosPage");
    }

}
