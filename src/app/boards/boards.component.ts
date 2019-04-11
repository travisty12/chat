import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Reply } from '../reply.model';
import { Post } from '../post.model';
import { cleanInput, sanitize } from '../sanitize';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  providers: [DatabaseService]
})
export class BoardsComponent implements OnInit {
  boards: FirebaseListObservable<any[]>;
  threads: FirebaseListObservable<any[]>;
  replies: FirebaseListObservable<any[]>;
  threadShown = false;

  constructor(private database: DatabaseService, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.boards = this.database.getBoards();
    // this.threads = this.database.getThreads('Music');
  }
  loadBoard(board) {
    this.threads = board.threads;
  }

  extendMenu;

  menu(){
    if (this.extendMenu){
      return "none";
    }else {
      return 'navbar';
    }
  }
  a;
  postThread = false;

  loadThread(thread) {
    this.replies = thread.replies;
  }

  newThread(text: string, name: string, title: string, board) {
    const image = sanitize("image goes here");
    text = sanitize(text);
    name = sanitize(name);
    title = sanitize(title);
    const post = new Post(title, name, text, image);
    const boardName = board['$key'];
    let i;
    if (this.threads) {
      i = this.threads;
      i = i.length;
    } else {
      i = 0;
    }
    this.databaseService.addThread(post, boardName, i);
    return;
  }

  submitPost(text: string, name: string, thread, board) {
    const image = sanitize("image goes here");
    text = sanitize(text);
    if (name != "") {
      name = sanitize(name);
    } else {
      name = "Anonymous";
    }
    this.a = this.replies;
    let i;
    if (this.a) {
      i = this.a.length;
    } else {
      i = 0;
    }
    const reply = new Reply(text, name, image);
    const boardName = board['$key'];
    let jLength;
    jLength = this.threads;
    jLength = jLength.length;
    for (let j = 0; j < jLength; j++) {
      if (this.threads[j] == thread) {
        const threadIndex = j;
        this.databaseService.addReply(reply, threadIndex, boardName, i);
      }
    }
    return;
  }


  getDate(time) {
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date(time);
    var month = d.getMonth();
    var day = d.getDate();
    var year = d.getFullYear();
    let monthName = months[month];
    let string = monthName + " " + day + ", " + year;
    return string;
  }

}
