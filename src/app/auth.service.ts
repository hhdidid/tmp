import { Injectable } from '@angular/core';
import { UserService } from './user/services/user.service';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService,
    private router: Router,
    private msgService: MessageService,
  ) { }

  signinWithCredentials(username: string, password: string) {
    // TODO
    const user = { id: -1, username: username, password: password, email: '', gravatar: '' };
    this.userService.authUser(user)
      .subscribe(
        result => {
          if (result.successful) {
            localStorage.setItem('haveSignIn', result.successful.toString());
            localStorage.setItem('currentUser', result.username);
            localStorage.setItem('email', result.email);
            if (result.cookie) {
              result.cookies.forEach(element => {
                localStorage.setItem(element.name, element.value);
              });
            }
            this.msgService.addMsg('sign in successfully!');
            this.router.navigate(['']); // navigate to home page, TODO navigate to redirect url
          } else {
            this.msgService.addMsg(result.error);
          }
        }
      );
  }


  logout(): void {
    // this.isLoggedIn = false;
    localStorage.removeItem('haveSignIn');
  }

}
