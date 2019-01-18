import { Component, OnInit, Input } from '@angular/core';
import { Moment } from '../moment';
import { MomentService } from '../services/moment.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-moment-detail',
  templateUrl: './moment-detail.component.html',
  styleUrls: ['./moment-detail.component.css']
})
export class MomentDetailComponent implements OnInit {
  @Input() moment: Moment;
  @Input() deletable: boolean;

  constructor(
    private momentService: MomentService,
    private msgService: MessageService,
  ) { }

  ngOnInit() {
  }

  delete() {
    console.log('xxx');
    this.momentService.deleteMoment(this.moment.id)
      .subscribe(result => {
        if (result.successful === true) {
          // emit a signal to notify MomentList to update its moment list
          localStorage.setItem('updateMomentList', true.toString());
          this.msgService.addMsg('delete moment successfully');
        } else {
          this.msgService.addMsg(result.error);
        }
      });
  }
}
