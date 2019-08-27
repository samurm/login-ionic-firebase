import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ErrorUser } from './exceptions/global.exception';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot(), // Storage Ionic
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, AngularFireDatabaseModule,
    HttpClientModule
    ],
  providers: [
    PhotoViewer,
    StatusBar,
    SplashScreen,
    HttpClient,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: ErrorUser }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
