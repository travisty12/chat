import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { masterFirebaseConfig } from './api-keys';

@Injectable()
export class ApiCall {
  constructor(public http: Http) { }
  callApi() {
    return this.http.get(`https://newsapi.org/v2/everything?q=cryptocurrency&from=2019-04-10&sortBy=publishedAt&apiKey=${masterFirebaseConfig.newsApi}`);
  }
}
