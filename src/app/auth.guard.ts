import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    // if(this.authService.haveSignIN) { return true; }
    if (localStorage.getItem('haveSignIn') === true.toString()) {
      return true;
    }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;
    localStorage.setItem('redirectUrl', url);

    this.router.navigate(['/signin']);
    this.msgService.addMsg('You have to log in first!');
    return false;
  }

}
