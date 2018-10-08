import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoListPage } from './video-list';

@NgModule({
  declarations: [
    VideoListPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoListPage),
  ],
})
export class VideoListPageModule {}
