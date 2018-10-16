import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BasicPlayerPage } from './basic-player';

@NgModule({
  declarations: [
    BasicPlayerPage,
  ],
  imports: [
    IonicPageModule.forChild(BasicPlayerPage),
  ],
})
export class BasicPlayerPageModule {}
