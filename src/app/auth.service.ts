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
    const user = { id: -1, username: username, password: password, email: '', gravatar: '' };
    this.userService.authUser(user)
      .subscribe(
        resultWithCookie => {
          if (resultWithCookie.successful) {
            localStorage.setItem('haveSignIn', resultWithCookie.successful.toString());
            localStorage.setItem('currentUser', username);
            localStorage.setItem(resultWithCookie.cookie.name, resultWithCookie.cookie.value);
            this.msgService.addMsg('sign in successfully!');
            this.router.navigate(['/home']);
          } else {
            this.msgService.addMsg(resultWithCookie.error);
          }
        }
      );
  }


}
