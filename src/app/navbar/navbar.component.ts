import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  extendMenu;

  menu(){
    if (this.extendMenu){
      return "extended";
    }else {
      return 'navbar';
    }
  }
}
