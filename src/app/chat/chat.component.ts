import { Injectable, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  provider: [AngularFireAuth]
})
export class ChatComponent implements OnInit {
  user;
  information;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit() {
  }


  navigate() {
    this.information = this.list.list('chats');
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  login() {
   this.afAuth.auth.signInAnonymously().catch(function(error) {
     let errorMessage = error.message;
     alert(errorMessage)
     console.log("YEET")
   });
  };





}
