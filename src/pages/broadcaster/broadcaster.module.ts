import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BroadcasterPage } from './broadcaster';

@NgModule({
  declarations: [
    BroadcasterPage,
  ],
  imports: [
    IonicPageModule.forChild(BroadcasterPage),
  ],
})
export class BroadcasterPageModule {}
