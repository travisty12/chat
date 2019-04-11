import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { masterFirebaseConfig } from './api-keys';

@Injectable()
export class ApiCall {
  constructor(public http: Http) { }
  callApi() {
    let currentDay = Date.now();
    let time = currentDay - 1728000000;
    let currentTime = new Date(time);
    let day = currentTime.getDate();
    let dayString;
    if(day < 10) {
      dayString = "0" + day.toString();
      day = parseInt(dayString)
    }
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth();
    let monthString;
    if(month < 10) {
      monthString = "0" + month.toString();
      month = parseInt(monthString);
    }
    return this.http.get(`https://newsapi.org/v2/everything?q=cryptocurrency&from=${year}-${month}-${day}10&sortBy=publishedAt&apiKey=${masterFirebaseConfig.newsApi}`);
  }
}
