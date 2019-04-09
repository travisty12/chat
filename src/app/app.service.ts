import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

  constructor() { }
  public changeNavColor: subject = new Subject<any>();
}
