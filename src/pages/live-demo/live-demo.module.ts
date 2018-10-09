import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveDemoPage } from './live-demo';

@NgModule({
  declarations: [
    LiveDemoPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveDemoPage),
  ],
})
export class LiveDemoPageModule {}
