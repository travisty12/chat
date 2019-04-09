import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  extendMenu = false

  menu(){
    if (this.extendMenu){
      return "extended";
    }else {
      return 'navbar';
    }
  }
}
