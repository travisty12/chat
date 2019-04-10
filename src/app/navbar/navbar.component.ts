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
  }
  extendMenu;

  menu(){
    if (this.extendMenu){
      return "extended";
    }else {
      return 'navbar';
    }
  }
  toChat(){
    this.router.navigate(['chat']);
    this.extendMenu = false;
  }
  toForum(){
    this.router.navigate(['boards']);
    this.extendMenu = false;
  }
  toNews(){
    this.router.navigate(['news']);
    this.extendMenu = false;
  }
}
