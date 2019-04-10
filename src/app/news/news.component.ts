import { Component, OnInit } from '@angular/core';
import { ApiCall } from '../apiCall';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  providers: [ApiCall]
})
@Injectable()
export class NewsComponent implements OnInit {

  constructor(private api: ApiCall) { }
  articles: any[] = null;
  obj;
  ngOnInit() {
    let that = this;
    this.api.callApi().subscribe(response => {
      // this.info = response.json()
      that.obj = response.json();
      console.log(that.obj);
      this.gatherInfo();
    });
  }



  gatherInfo() {
    console.log("Is working");
    let length = this.obj.articles.length;
    let array = [];
    console.log(length);
    for(let i = 0; i < length; i++) {
      let info = {};
      let instance = this.obj.articles[i];
      let author = instance.author;
      let content = instance.content;
      let description = instance.description;
      let title = instance.title;
      let url = instance.url;
      let image = instance.urlToImage;
      console.log(author);
      info = {author: author, content: content, description: description, title: title, url: url, image: image};
      array.push([info]);
    }
    this.articles = array;
  }

}
