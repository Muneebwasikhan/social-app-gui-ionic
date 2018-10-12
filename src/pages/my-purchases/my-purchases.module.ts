import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPurchasesPage } from './my-purchases';

@NgModule({
  declarations: [
    MyPurchasesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPurchasesPage),
  ],
})
export class MyPurchasesPageModule {}
