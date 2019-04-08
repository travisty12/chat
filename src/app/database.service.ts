import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class DatabaseService {
  boards: FirebaseListObservable<any[]>;
  threads: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
    this.boards = database.list('Boards');
  }

  getBoards() {
    return this.boards;
  }
  getThreads(board) {
    return this.database.object('Boards/' + board);
  }
}
