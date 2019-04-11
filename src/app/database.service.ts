import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
declare var require: any;
var firebase = require('firebase/app');
var bcrypt = require('bcryptjs');

@Injectable()
export class DatabaseService {
  boards: FirebaseListObservable<any[]>;
  threads: FirebaseListObservable<any[]>;
  chat: FirebaseListObservable<any[]>;
  adminAccess = false;
  a;
  constructor(private database: AngularFireDatabase) {
    this.boards = database.list('boards');
    this.chat = database.list('chat/anonymous');

  }



  checkAuth(user, pass, that) {
    let hash;
    let passToCheck;
    this.database.object(`data/aInfo/${user}/pass`).subscribe(password => {
      passToCheck = password;
      hash = passToCheck['$value'];
      bcrypt.compare(pass, hash).then((res) => {
        if (res) {
          return that.adminAccess = true;
        } else {
          return that.adminAccess = false;
        }

      });
    })
  }
  getBoards() {
    return this.boards;
  }
  getThreads(board) {
    return this.database.object('boards/' + board);
  }
  addReply(reply, threadNum, board, index) {
    this.boards.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]['$key'] == board) {
          const replyString = `boards/${board}/threads/${threadNum}/replies`;
          const replyLocation = this.database.list(`boards/${board}/threads/${threadNum}/replies`);
          const thread = this.database.object(`boards/${board}/threads/${threadNum}/post`);
          thread.update({recentTimestamp: reply.timestamp});

          firebase.database().ref(replyString + '/' + index).set({
            'comment': `${reply.comment}`,
            'image': `${reply.image}`,
            'time': `${reply.time}`,
            'timestamp': `${reply.timestamp}`,
            'username': `${reply.username}`
          });
          location.reload();
          // return;


          // replyLocation.push(reply);
          // this.boards[i].threads[thread].replies.push(reply);
        }
      }
    })
    // this.boards.board.threads.thread.replies.push();
  }


  addThread(post, board, index) {
    const postString = `boards/${board}/threads/`;

    // this.boards.subscribe(data => {
    //   for (let i = 0; i < data.length; i++) {
    //     if (data[i]['$key'] == board) {
    //
    //
    //
    //       // replyLocation.push(reply);
    //       // this.boards[i].threads[thread].replies.push(reply);
    //     }
    //   }
    // })
    const postLocation = this.database.list(postString);
    firebase.database().ref(postString + '/' + index + '/post').set({
      'title': `${post.title}`,
      'comment': `${post.comment}`,
      'image': `${post.image}`,
      'time': `${post.time}`,
      'timestamp': `${post.timestamp}`,
      'username': `${post.username}`
    });
    return;
  }

  getChat() {
    return this.chat;
  }

  addMessage(reply, i) {
    firebase.database().ref(`chat/anonymous/${i}`).set({
      'text': `${reply.text}`,
      'name': `${reply.name}`,
      'time': `${reply.time}`,
      'timestamp': `${reply.timestamp}`
    });
    return;
  }
  getChatById(chatId: string){
  return this.database.object(`chat/anonymous/${chatId}`);
}

  deleteChat(chat, info) {
    let length = info.length;
    let int = parseInt(chat.$key);
    for(let i = int; i < length - 1; i++) {
      let id = this.getChatById(info[i].$key);
      let a = i + 1;
      let currentInfo = info[a];
      let nextname = currentInfo.name;
      let nextText = currentInfo.text
      let nextTime = currentInfo.time;
      let nextTimeStamp = currentInfo.timestamp;
      id.update({name: nextname,
                 text: nextText,
                 time: nextTime,
                 nextTimeStamp: nextTimeStamp});
    }


  }

  deleteLastChat(last) {
    var chatEntryInFirebase = this.getChatById(last.$key);
    chatEntryInFirebase.remove();
  }



  autoDeleteChat(info) {
    let currentTime = Date.now();
    let hour = currentTime - 6000;
    let length = info.length;
    for(let i = 0; i < length; i++) {
      let time = info[i].timestamp;
      if(time < hour) {
        let id = this.getChatById(info[i].$key);
        this.deleteChat(id, info);
      }
    }
  }
}
