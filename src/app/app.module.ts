import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LiveChanelsPage } from '../pages/live-chanels/live-chanels';
import { VideoListPage } from '../pages/video-list/video-list';
import { PopoverPage } from '../pages/popover/popover';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { IndexPage } from '../pages/index';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DatePipe, CommonModule } from '@angular/common';
import { AlertProvider } from '../providers/alert/alert';
import { CameraProvider } from '../providers/camera/camera';
import { LoadingProvider } from '../providers/loading/loading';
import { File } from '@ionic-native/file';
import { createTranslateLoader } from '../providers/translate/translate';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { IndexPopoverPage } from '../pages/index-popover/index-popover';
import { SettingsPage } from '../pages/settings/settings';
import { AddProductPage } from '../pages/add-product/add-product';
import { ProductsPage } from '../pages/products/products';
import { OrdersPage } from '../pages/orders/orders';
import { PaymentsPage } from '../pages/payments/payments';
import { MyPurchasesPage } from '../pages/my-purchases/my-purchases';
import { OrderShippingPage } from '../pages/order-shipping/order-shipping';
import { ProfilePage } from '../pages/profile/profile';
import { MyVideosPage } from '../pages/my-videos/my-videos';
import { FollowersPage } from '../pages/followers/followers';
import { FollowingPage } from '../pages/following/following';
import { MyStreamHistoryPage } from '../pages/my-stream-history/my-stream-history';
import { GoLivePage } from '../pages/go-live/go-live';
import { BroadcasterPage } from '../pages/broadcaster/broadcaster';
import { CartPage } from '../pages/cart/cart';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicPlayerPage } from '../pages/basic-player/basic-player';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StoreProvider } from '../providers/store/store';
import { SetStoreInfoPage } from '../pages/set-store-info/set-store-info';
import { ProductViewPage } from '../pages/product-view/product-view';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { SelectProductPage } from '../pages/select-product/select-product';





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LiveChanelsPage,
    VideoListPage,
    PopoverPage,
    IndexPopoverPage,
    ProductDetailsPage,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    IndexPage,
    SettingsPage,
    AddProductPage,
    ProductsPage,
    OrdersPage,
    PaymentsPage,
    MyPurchasesPage,
    OrderShippingPage,
    ProfilePage,
    MyVideosPage,
    FollowersPage,
    FollowingPage,
    MyStreamHistoryPage,
    GoLivePage,
    BroadcasterPage,
    CartPage,
    BasicPlayerPage,
    SetStoreInfoPage,
    ProductViewPage,
    SelectProductPage
  ],
  imports: [
   
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    [CommonModule,],
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http]
      }
    }),



  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LiveChanelsPage,
    VideoListPage,
    PopoverPage,
    IndexPopoverPage,
    ProductDetailsPage,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    IndexPage,
    SettingsPage,
    AddProductPage,
    ProductsPage,
    OrdersPage,
    PaymentsPage,
    MyPurchasesPage,
    OrderShippingPage,
    ProfilePage,
    MyVideosPage,
    FollowersPage,
    FollowingPage,
    MyStreamHistoryPage,
    GoLivePage,
    BroadcasterPage,
    CartPage,
    BasicPlayerPage,
    SetStoreInfoPage,
    ProductViewPage,
    SelectProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    //MediaCapture,
    //Media,
    File,
    Camera,
    FilePath,
    FileTransfer,
    LocalNotifications,
    //Calendar,
    DatePipe,
    //HeaderColor,
    AlertProvider,
    LoadingProvider,
    CameraProvider,
    AlertProvider,
    CameraProvider,
    LoadingProvider,
    StoreProvider,
    WheelSelector,
  ]
})
export class AppModule {}
