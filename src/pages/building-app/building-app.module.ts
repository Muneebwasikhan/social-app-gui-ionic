import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuildingAppPage } from './building-app';

@NgModule({
  declarations: [
    BuildingAppPage,
  ],
  imports: [
    IonicPageModule.forChild(BuildingAppPage),
  ],
})
export class BuildingAppPageModule {}
