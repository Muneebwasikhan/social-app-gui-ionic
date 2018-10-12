import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyVideosPage } from './my-videos';

@NgModule({
  declarations: [
    MyVideosPage,
  ],
  imports: [
    IonicPageModule.forChild(MyVideosPage),
  ],
})
export class MyVideosPageModule {}
