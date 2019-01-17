import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { SignUpEditorComponent } from './sign-up-editor/sign-up-editor.component';
import { SignInEditorComponent } from './sign-in-editor/sign-in-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

const routes: Routes = [
  { path: 'profile', component: ProfileEditorComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignUpEditorComponent},
  { path: 'signin', component: SignInEditorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
