import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveChanelsPage } from './live-chanels';

@NgModule({
  declarations: [
    LiveChanelsPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveChanelsPage),
  ],
})
export class LiveChanelsPageModule {}
