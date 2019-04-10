import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ApiCall {
  constructor(public http: Http) { }
  callApi() {
    return this.http.get('https://newsapi.org/v2/everything?q=cryptocurrency&from=2019-03-10&sortBy=publishedAt&apiKey=402a12f57a0545618f8dbe1d5ce49af5');
  }
}
