import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DemoPageVideoPage } from './demo-page-video';

@NgModule({
  declarations: [
    DemoPageVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(DemoPageVideoPage),
  ],
})
export class DemoPageVideoPageModule {}
