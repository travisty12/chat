import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
declare var require: any;
var firebase = require('firebase/app');

@Injectable()
export class DatabaseService {
  boards: FirebaseListObservable<any[]>;
  threads: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
    this.boards = database.list('boards');
  }

  getBoards() {
    return this.boards;
  }
  getThreads(board) {
    return this.database.object('boards/' + board);
  }
  addReply(reply, thread, board, index) {
    this.boards.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]['$key'] == board) {
          const replyString = `boards/${board}/threads/${thread}/replies`;
          const replyLocation = this.database.list(`boards/${board}/threads/${thread}/replies`);
          console.log(reply);

          firebase.database().ref(replyString + '/' + index).set({
            'comment': `${reply.comment}`,
            'image': `${reply.image}`,
            'timestamp': `${reply.timestamp}`,
            'username': `${reply.username}`
          });
          location.reload();
          return;


          // replyLocation.push(reply);
          // this.boards[i].threads[thread].replies.push(reply);
        }
      }
      console.log(data[0]['$key']);
    })
    // console.log(this.boards.{board});
    // console.log(this.boards[board].threads.thread.replies);
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
            location.reload();
            return;


            // replyLocation.push(reply);
            // this.boards[i].threads[thread].replies.push(reply);
          }
        }
      })
    }
}
