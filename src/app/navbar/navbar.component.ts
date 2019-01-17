import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  haveSignIn: boolean;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    // subscribe router event, so we can display signup and signin link again when user sign out
    this.router.events
      .subscribe((event) => {
        // example: NavigationStart, RoutesRecognized, NavigationEnd
        // console.log(event);
        this.haveSignIn = localStorage.getItem('haveSignIn') === true.toString();
      });
  }

  signout() {
    localStorage.setItem('haveSignIn', false.toString());
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionid');
    this.router.navigate(['']);
  }
}
