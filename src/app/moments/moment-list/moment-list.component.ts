import { Component, OnInit } from '@angular/core';
import { Moment } from '../moment';
import { MomentService } from '../services/moment.service';

@Component({
  selector: 'app-moment-list',
  templateUrl: './moment-list.component.html',
  styleUrls: ['./moment-list.component.css']
})
export class MomentListComponent implements OnInit {
  moments: Moment[] = [];

  constructor(
    private momentService: MomentService
  ) { }

  ngOnInit() {
    let update = false;
    if (localStorage.getItem('updateMomentList') === true.toString()) {
      update = true;
      localStorage.removeItem('updateMomentList');
    }
    this.momentService.getMoments(update)
      .subscribe(moments => {
        // console.log('before: ' + this.moments);
        this.moments = moments === null ? [] : moments;
        // console.log('after: ' + this.moments);
        /*
        if (moments !== null) {
          moments.forEach(m => this.moments.push(m));
        }
        */
      });
  }

}
