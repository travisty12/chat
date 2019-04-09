import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FirebaseListObservable } from 'angularfire2/database';

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

  constructor(private database: DatabaseService) { }

  ngOnInit() {
    this.boards = this.database.getBoards();
    // this.threads = this.database.getThreads('Music');
  }
  loadBoard(board) {
    this.threads = board.threads;
  }

}
