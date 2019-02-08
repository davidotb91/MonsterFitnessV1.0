import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the InteresesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intereses',
  templateUrl: 'intereses.html',
})
export class InteresesPage {

  myForm: FormGroup;
  meta:string;
  deportista:string;
  deporte:string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FormBuilder) {

    this.myForm = this.fb.group({
      meta: ['', [Validators.required]],
      deportista: ['', [Validators.required]],
      //deporte: ['', [Validators.required]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InteresesPage');
  }
  navegarPantalla(){
    sessionStorage.setItem('meta',JSON.stringify(this.meta));
    sessionStorage.setItem('deportista',JSON.stringify(this.deportista));
    sessionStorage.setItem('deporte',JSON.stringify(this.deporte));

    this.navCtrl.push ("ResultadosFisicosPage");
  }


}
