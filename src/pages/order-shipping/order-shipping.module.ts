import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderShippingPage } from './order-shipping';

@NgModule({
  declarations: [
    OrderShippingPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderShippingPage),
  ],
})
export class OrderShippingPageModule {}
