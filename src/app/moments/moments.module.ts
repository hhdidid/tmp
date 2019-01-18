import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentsRoutingModule } from './moments-routing.module';
import { MomentListComponent } from './moment-list/moment-list.component';
import { MomentDetailComponent } from './moment-detail/moment-detail.component';
import { MomentEditorComponent } from './moment-editor/moment-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MomentListComponent,
    MomentDetailComponent,
    MomentEditorComponent,
  ],
  imports: [
    CommonModule,
    MomentsRoutingModule,
    HttpClientModule, // note that we import HttpClientModule rather than HttpClient here
    ReactiveFormsModule,
  ],
  exports: [
    MomentEditorComponent,
    MomentListComponent,
    MomentDetailComponent,
  ]
})
export class MomentsModule { }
