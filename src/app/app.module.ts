import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { ChatComponent } from './chat/chat.component';
import { LandingComponent } from './landing/landing.component'
import { SplashComponent } from './splash/splash.component';
import { BoardsComponent } from './boards/boards.component';
import { NewsComponent } from './news/news.component';
import { NavbarComponent } from './navbar/navbar.component';


export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket,
  messagingSenderId: masterFirebaseConfig.messagingSenderId
};

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    ChatComponent,
    LandingComponent,
    SplashComponent,
    BoardsComponent,
    NewsComponent
    NavbarComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
