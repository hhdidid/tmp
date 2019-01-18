import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Moment } from '../moment';
import { Subscribable, of, Observable } from 'rxjs';
import { MessageService } from 'src/app/message.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  host = 'http://192.168.233.128:9999/moments';
  firstGet = true;
  // note here, it is null, very different from a empty array. for example, null have no property of push.
  // moments: Moment[];
  moments: Moment[] = [];

  constructor(
    private http: HttpClient,
    private msgService: MessageService,
  ) { }

  getMoments(update = false): Subscribable<Moment[]> {
    if (this.firstGet || update) {
      return this.http.get<any>(this.host)
        .pipe(
          tap((resultWithMomentList) => {   // peek the data before notify the observer
            if (resultWithMomentList.successful) {
              // note here, dangerous if this.moments===null
              // note here, this assignment make the two moments array point to the same memory.
              this.moments = resultWithMomentList.moments === null ? [] : resultWithMomentList.moments;
            }
          }),
          map((resultWithMomentList) => {
            return resultWithMomentList.successful === true ? resultWithMomentList.moments : null;
          }),
        );
    } else {
      return of(this.moments);
    }
  }

  getMomentsOf(username: string): Subscribable<any> {
    const options = { headers: new HttpHeaders({ 'sessionid': localStorage.getItem('sessionid') }) };
    return this.http.get<any>(`${this.host}/${username}`, options);
  }

  addMoment(moment: Moment) {
    const options = { headers: new HttpHeaders({ 'sessionid': localStorage.getItem('sessionid') }) };
    this.http.post<any>(this.host, moment, options)
      .subscribe((resultWithMoment) => {
        if (resultWithMoment.successful) {
          moment.id = resultWithMoment.id;
          // note here, it will also update MomentListComponent.moments, since it is a ref of this moment.
          // thus will update the moment list.
          this.moments.push(moment);
          this.msgService.addMsg('add moment successfully');
        } else {
          this.msgService.addMsg('add moment failed');
        }
      });
  }

  deleteMoment(id: number): Observable<any> {
    const options = { headers: new HttpHeaders({ 'sessionid': localStorage.getItem('sessionid') }) };
    return this.http.delete(`${this.host}/${id}`, options);
  }

}
