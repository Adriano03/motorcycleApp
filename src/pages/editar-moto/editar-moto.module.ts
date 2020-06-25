import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarMotoPage } from './editar-moto';

@NgModule({
  declarations: [
    EditarMotoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarMotoPage),
  ],
})
export class EditarMotoPageModule {}
