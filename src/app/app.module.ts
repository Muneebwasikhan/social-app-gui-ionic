import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OurVisionPage } from '../pages/our-vision/our-vision';
import { BuildingAppPage } from '../pages/building-app/building-app';
import { AppInfoPage } from '../pages/app-info/app-info';
import { LiveChanelsPage } from '../pages/live-chanels/live-chanels';
import { VideoListPage } from '../pages/video-list/video-list';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    OurVisionPage,
    BuildingAppPage,
    AppInfoPage,
    LiveChanelsPage,
    VideoListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    OurVisionPage,
    BuildingAppPage,
    AppInfoPage,
    LiveChanelsPage,
    VideoListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
