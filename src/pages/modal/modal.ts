import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  nombreEjer:string;
  series:string;
  rep:string;
  img:string;
  intensidad:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.nombreEjer = navParams.get('nombreEjercicio')
    this.series = navParams.get('series')
    this.rep = navParams.get('repeticiones')
    this.img = navParams.get('imagen')
    this.intensidad = navParams.get('intensidad')
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ModalPage');
  }
  ionViewDidEnter(){
    document.title = this.nombreEjer;
  }

  public closeModal(){
    this.viewCtrl.dismiss();

  }

}
