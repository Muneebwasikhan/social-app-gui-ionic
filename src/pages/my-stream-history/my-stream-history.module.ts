import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyStreamHistoryPage } from './my-stream-history';

@NgModule({
  declarations: [
    MyStreamHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MyStreamHistoryPage),
  ],
})
export class MyStreamHistoryPageModule {}
