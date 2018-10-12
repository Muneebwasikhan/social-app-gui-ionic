import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoLivePage } from './go-live';

@NgModule({
  declarations: [
    GoLivePage,
  ],
  imports: [
    IonicPageModule.forChild(GoLivePage),
  ],
})
export class GoLivePageModule {}
