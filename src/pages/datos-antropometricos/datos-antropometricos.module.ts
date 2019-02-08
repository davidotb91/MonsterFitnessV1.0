import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosAntropometricosPage } from './datos-antropometricos';

@NgModule({
  declarations: [
    DatosAntropometricosPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosAntropometricosPage),
  ],
})
export class DatosAntropometricosPageModule {}
