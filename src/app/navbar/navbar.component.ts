import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [DatabaseService]
})
export class NavbarComponent implements OnInit {

  constructor(private database: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.style = document.getElementsByClassName('all');
  }
  loginShown = false;
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
  checkAuth(pass) {
    this.database.checkAuth(pass);
    this.loginShown = false;
    return;
  }
}
