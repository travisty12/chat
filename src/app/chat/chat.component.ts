import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Message } from '../message.model';
import { cleanInput, sanitize } from '../sanitize';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [DatabaseService]
})
export class ChatComponent implements OnInit {
  chats: FirebaseListObservable<any[]>;
  messages: FirebaseListObservable<any[]>;
  @Input() allChats;
  a;
  b;
  autoDelete;
  loginShown = false;
  adminAccess = false;
  constructor(private databaseService: DatabaseService) {
}

  ngOnInit() {
    this.chats = this.databaseService.getChat();
    this.main();
  }

  main() {
    setInterval(() => {
      this.autoDeleteMessage();
    },1000)

  }

  sendMessage(message: string, name: string) {
    let user;
    let that = this;
    name = sanitize(name);
    if (name != "") {
      user = name;
    } else {
      user = "Anonymous";
    }
    this.chats.subscribe(info => {
      that.a = info;
      that.b = info;
    })
    let i;
    if(this.a) {
      i = this.a.length;
    } else {
      i = 0;
    }
    const reply = new Message(sanitize(message), user);
    this.databaseService.addMessage(reply, i);
    return;
  }


  deleteThisMessage(chat) {
    let that = this;
    this.chats.subscribe(info => {
      that.b = info;
    });
    this.databaseService.deleteChat(chat, this.b);
    let length = this.b.length;
    var last = this.b[length - 1];
    this.databaseService.deleteLastChat(last);
  }


  autoDeleteMessage() {
    let that = this;
    this.chats.subscribe(info => {
      that.b = info;
    });
    this.autoDelete = this.b;
    var last = this.autoDelete[length - 1];
    this.databaseService.autoDeleteChat(this.autoDelete);
  }
  checkAuth(user,pass) {
    this.loginShown = false;

    this.databaseService.checkAuth(user,pass, this);
    // if() {
    //   console.log("yes");
    //   return true;
    //
    // } else {
    //   console.log("no");
    //
    //   return false;
    // }
  }
}
