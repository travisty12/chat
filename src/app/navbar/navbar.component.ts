import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.style = document.getElementsByClassName('all')
    console.log(this.style[0]);
  }
  style;
  extendMenu;

  menu(){
    if (this.extendMenu){
      return "extended";
    }else {
      return "navbar";
    }
  }
  toChat(){
    this.router.navigate(['chat']);
    this.extendMenu = false;
    this.style[0].classList = 'all purple';
  }
  toForum(){
    this.router.navigate(['boards']);
    this.extendMenu = false;
    this.style[0].classList = 'all green';
  }
  toNews(){
    this.router.navigate(['news']);
    this.extendMenu = false;
    this.style[0].classList = 'all orange'
  }
}
