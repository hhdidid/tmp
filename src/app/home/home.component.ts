import { Component, OnInit } from '@angular/core';

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
  ) { }

  ngOnInit() {
    this.haveSignIn = localStorage.getItem('haveSignIn') === true.toString();
    if (this.haveSignIn) {
      this.currentUser = localStorage.getItem('currentUser');
    }
  }

}
