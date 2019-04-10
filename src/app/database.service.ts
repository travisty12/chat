import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
declare var require: any;
var firebase = require('firebase/app');

@Injectable()
export class DatabaseService {
  boards: FirebaseListObservable<any[]>;
  threads: FirebaseListObservable<any[]>;
  chat: FirebaseListObservable<any[]>;
  a;
  chatLength;
  constructor(private database: AngularFireDatabase) {
    this.boards = database.list('boards');
    this.chat = database.list('chat/anonymous');

  }

  checkAuth(pass) {

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
    this.boards.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]['$key'] == board) {
          const postString = `boards/${board}/threads/`;
          const postLocation = this.database.list(postString);

          firebase.database().ref(postString + '/' + index + '/post').set({
            'title': `${post.title}`,
            'comment': `${post.comment}`,
            'image': `${post.image}`,
            'timestamp': `${post.timestamp}`,
            'username': `${post.username}`
          });
          return;


          // replyLocation.push(reply);
          // this.boards[i].threads[thread].replies.push(reply);
        }
      }
    })
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

  removeChat(id) {
    id.remove();
  }

  autoDeleteChat(info) {
    let currentTime = Date.now();
    let hour = currentTime - 36000;
    let length = info.length;
    let array = [];
    for(let i = 0; i < length; i++) {
      let selected = [];
      let time = info[i].timestamp;
      if(time < hour) {
        array.push(i);
      }
    }
    for(let e = 0; e < array.length; e++) {
      this.reAssign(info);
      let id = this.getChatById(info[e].$key);
      this.removeChat(id);

    }
  }

  reAssign(info) {
    let length = info.length;
    let last = this.getChatById(info[length - 1].$key);
    for(let i = 0; i < length; i++) {
      let id = this.getChatById(info[i].$key);
      let a = i + 1;
      let currentInfo = info[a];
      let nextname;
      let nextText;
      let nextTime;
      let nextTimeStamp;
      if(currentInfo) {
        nextname = currentInfo.name;
        nextText = currentInfo.text
        nextTime = currentInfo.time;
        nextTimeStamp = currentInfo.timestamp;

      }
      firebase.database().ref(`chat/anonymous/${i}`).set({
        'text': `${nextText}`,
        'name': `${nextname}`,
        'time': `${nextTime}`,
        'timestamp': `${nextTimeStamp}`
      });
    }
  }
}
