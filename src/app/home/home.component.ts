import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'sms';
  currentUser: string;
  haveSignIn: boolean;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.haveSignIn = localStorage.getItem('haveSignIn') === true.toString();
    if (this.haveSignIn) {
      this.currentUser = localStorage.getItem('currentUser');
    }

    // subscribe router event, so we can display signup and signin link again when user sign out
    this.router.events
      .subscribe((event) => {
        this.haveSignIn = localStorage.getItem('haveSignIn') === true.toString();
      });
  }

}
