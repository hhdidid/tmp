import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MomentService } from '../services/moment.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-moment-editor',
  templateUrl: './moment-editor.component.html',
  styleUrls: ['./moment-editor.component.css']
})
export class MomentEditorComponent implements OnInit {
  momentEditor: FormControl;

  constructor(
    private momentService: MomentService,
  ) { }

  ngOnInit() {
    this.momentEditor = new FormControl('', [
      Validators.required
    ]);
  }

  submit() {
    this.momentService.addMoment({
      id: -1, content: this.momentEditor.value,
      author: localStorage.getItem('currentUser'), created: formatDate(new Date(), 'yyyy-MM-dd', 'en')
    });
  }

  get editor() { return this.momentEditor; }
}
