import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from "angularfire2/database";



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MotoProvider } from '../providers/moto/moto';

const firebaseConfig = {
  apiKey: "AIzaSyCTx1q03b0nTqO51w-vwx_avPj6pj12cKE",
  authDomain: "motocaapp-b5469.firebaseapp.com",
  databaseURL: "https://motocaapp-b5469.firebaseio.com",
  projectId: "motocaapp-b5469",
  storageBucket: "motocaapp-b5469.appspot.com",
  messagingSenderId: "891035419197",
  appId: "1:891035419197:web:78a7e6c38aea649bf5e054"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MotoProvider
  ]
})
export class AppModule {}
