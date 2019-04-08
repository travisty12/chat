import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [DatabaseService]
})
export class ForumComponent implements OnInit {
  replies: FirebaseListObservable<any[]>;
  @Input() activeBoard;
  @Input() threadShown;
  @Input() threads;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    // this.threads = this.databaseService.getThreads('Music');
  }
  loadThread(thread) {
    this.replies = thread.replies;
  }
}
