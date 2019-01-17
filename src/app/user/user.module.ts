import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpEditorComponent } from './sign-up-editor/sign-up-editor.component';
import { SignInEditorComponent } from './sign-in-editor/sign-in-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

@NgModule({
  declarations: [SignUpEditorComponent, SignInEditorComponent, ProfileEditorComponent],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
