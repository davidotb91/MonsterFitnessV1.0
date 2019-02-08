import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cuenta, DatosCaracteristicos } from '../../Util/interface';
import { formulas } from '../../Util/formulas';


/**
 * Generated class for the DatosAntropometricosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-antropometricos',
  templateUrl: 'datos-antropometricos.html',
})
export class DatosAntropometricosPage {


  myForm: FormGroup;
  //formGroup: FormGroup = null; // Create object of FormGroup
  peso:string;
  sexo:string;
  edad:string;
  talla:string;
  datos:Cuenta;
  calculadora: formulas;
  datosAntro: DatosCaracteristicos;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {

    //this.datos = JSON.parse(sessionStorage.getItem("usuario"));
    this.calculadora = new formulas();
    if(sessionStorage.getItem('datos')){
      this.datosAntro = JSON.parse(sessionStorage.getItem('datos'));
      sessionStorage.setItem('datosAntroLogeado', JSON.stringify(this.datosAntro));
      this.peso = this.datosAntro.peso.toString();
      this.sexo = this.datosAntro.sexo.toString();
      this.talla = this.datosAntro.talla.toString();
      this.edad = this.datosAntro.edad.toString();
    }
  /*  var _builder = new FormBuilder();
    this.formGroup = _builder.group({}); // Use the builder to create object

    this.formGroup.addControl('peso', new
            FormControl('',Validators.required));*/
    this.myForm = this.fb.group({
      peso: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
      sexo: ['', [Validators.required, ]],
      edad: ['', [Validators.required, Validators.pattern(/^[0-9]{2}$/)]],
      talla: ['', [Validators.required, Validators.pattern(/^[0-9]{2,3}$/)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosAntropometricosPage');
  }

  navegarPantalla(){
    const icm = this.calculadora.calcularIMC(parseInt(this.peso), parseInt(this.talla));
    const icmCondicion = this.calculadora.clasificacionImc(icm);
    const args = {
      peso: this.peso,
      sexo: this.sexo,
      edad: this.edad,
      talla: this.talla,
      icm: icm,
      icmCondicion: icmCondicion
    }
    sessionStorage.setItem("datos", JSON.stringify(args))
    this.navCtrl.push ("DatosAntropometricosDosPage");
  }

}
