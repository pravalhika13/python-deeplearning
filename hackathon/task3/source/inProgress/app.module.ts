import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http'; 


import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';
import { ReserveSpotPage } from '../pages/reserveSpot/reserveSpot';
import { SubmitAvailabilityPage} from '../pages/submitAvailability/submitAvailability';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from './app.firebase.config';

import { DecimalPipe } from '@angular/common';



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    HomePage,
    SubmitAvailabilityPage,
    ReserveSpotPage,
    TabsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    HomePage,
    SubmitAvailabilityPage,
    ReserveSpotPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DecimalPipe,
    AngularFireAuthModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
