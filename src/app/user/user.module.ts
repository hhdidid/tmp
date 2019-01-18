import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpEditorComponent } from './sign-up-editor/sign-up-editor.component';
import { SignInEditorComponent } from './sign-in-editor/sign-in-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';
import { MomentsModule } from '../moments/moments.module';

@NgModule({
  declarations: [
    SignUpEditorComponent,
    SignInEditorComponent,
    ProfileEditorComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    MomentsModule,
    ReactiveFormsModule,
  ],
  /*
  Can't bind to 'moment' since it isn't a known property of 'app-moment-detail'.
  1. If 'app-moment-detail' is an Angular component and it has 'moment' input, then verify that it is part of this module.
  2. If 'app-moment-detail' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of
  this component to suppress this message.
  3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.
  */
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  // But it seems that it doesn't works.
  // another solution is that export MomentDetailComponent in MomentsModule and import MomentModule in UserModule.
})
export class UserModule { }
