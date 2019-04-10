import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AppService {

  constructor() { }
  public changeNavColor: Subject<any> = new Subject<any>();
}
