import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { MessageService } from '../../message.service';
import { User } from '../models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'/*, 'withCredentials': 'true'*/ })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private msgService: MessageService,
  ) { }

  host = 'http://192.168.233.128:9999';
  profile = '/profile';
  singup = '/signup';
  signin = '/signin';


  getUser(username: string): Observable<any> {
    const url = `${this.host}${this.profile}/${username}`;
    const options = { headers: new HttpHeaders({ 'sessionid': localStorage.getItem('sessionid') }) };
    return this.http.get<any>(url, options)
      .pipe(
        catchError(this.handleError<any>('getUser')),
      );
  }

  authUser(user: User): Observable<any> {
    return this.http.post<any>(this.host + this.signin, user, httpOptions)
      .pipe(
        catchError(this.handleError<any>('authUser')),
      );
  }

  uniqueUser(username: string): Observable<boolean> {
    const url = `${this.host}/unique/${username}`;
    return this.http.get<boolean>(url);
  }


  updateUser(user: User): Observable<any> {
    const url = `${this.host}${this.profile}`;
    const options = { headers: new HttpHeaders({ 'sessionid': localStorage.getItem('sessionid') }) };
    return this.http.put<any>(url, user, options)
      .pipe(
        catchError(this.handleError<any>('updateUser')),
      );
  }

  addUser(user: User): Observable<any> {
    return this.http.post<any>(this.host + this.singup, user, httpOptions)
      .pipe(
        catchError(this.handleError<any>('addUser')),
      );
  }

  deleteUser(username: string): Observable<any> {
    const url = `${this.host}${this.profile}/${username}`;
    const options = { headers: new HttpHeaders({ 'sessionid': localStorage.getItem('sessionid') }) };
    return this.http.delete<any>(url, options)
      .pipe(
        catchError(this.handleError<any>('deleteUser')),
      );
  }

  log(msg: string) {
    this.msgService.addMsg(msg);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
