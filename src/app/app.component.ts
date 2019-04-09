import { Component } from '@angular/core';
import { DatabaseService } from './database.service';
import { FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatabaseService]
})
export class AppComponent {
  title = 'app';
  boards: FirebaseListObservable<any[]>;
  threads: FirebaseListObservable<any[]>;
  replies: FirebaseListObservable<any[]>;

  constructor(private database: DatabaseService){}

  ngOnInit() {
    this.boards = this.database.getBoards();
    // this.threads = this.database.getThreads('Music');
  }
  loadBoard(board) {
    this.threads = board.threads;
  }
}
