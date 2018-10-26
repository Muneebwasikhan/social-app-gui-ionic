import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectProductPage } from './select-product';

@NgModule({
  declarations: [
    SelectProductPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectProductPage),
  ],
})
export class SelectProductPageModule {}
