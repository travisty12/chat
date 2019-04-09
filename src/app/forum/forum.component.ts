import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Reply } from '../reply.model';
import { Post } from '../post.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  providers: [DatabaseService]
})
export class ForumComponent implements OnInit {
  replies: FirebaseListObservable<any[]>;
  @Input() activeBoard;
  @Input() threadShown;
  @Input() threads;
  a;
  postThread = false;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    // this.threads = this.databaseService.getThreads('Music');
  }
  loadThread(thread) {
    this.replies = thread.replies;
  }

  newThread(text: string, name: string, title: string, board) {
    const image = "image goes here";
    const post = new Post(title, name, text, image);
    const boardName = board['$key'];
    const i = this.threads.length;
    this.databaseService.addThread(post, boardName, i);
    return;
  }

  submitPost(text: string, name: string, thread, board) {
    const image = "image goes here";
    this.a = this.replies;
    let i;
    if (this.a) {
      i = this.a.length;
    } else {
      i = 0;
    }
    const reply = new Reply(text, name, image);
    const boardName = board['$key'];
    for (let j = 0; j < this.threads.length; j++) {
      if (this.threads[j] == thread) {
        const threadIndex = j;
        this.databaseService.addReply(reply, threadIndex, boardName, i);
      }
    }
    return;
  }


}
