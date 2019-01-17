import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { MessageService } from 'src/app/message.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator, UniqueUsername4ProfileValidator } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {
  user: User = { id: -1, username: '', password: '', email: '', gravatar: '' };
  profileForm: FormGroup;

  constructor(
    private location: Location,
    private userService: UserService,
    private msgService: MessageService,
    private router: Router,
    private uniqueUsername4Profile: UniqueUsername4ProfileValidator,
  ) { }

  ngOnInit() {
    this.createForm();

    this.getUser();

    // if this.createForm depend on the inite state of this.user,
    // do not put the init code of this.profileForm here, since this.getUser() finially execute an async callback.
  }


  getUser() {
    const username = localStorage.getItem('currentUser');
    this.userService.getUser(username)
      .subscribe(
        result => {
          if (result.successful) {
            this.user.id = result.id;
            this.user.username = result.username;
            this.user.email = result.email;
            this.user.gravatar = result.gravatar;

          } else {
            this.msgService.addMsg(result.error);
          }
        }
      );
  }

  save() {
    // const oldName = this.user.username;
    this.userService.updateUser(this.user)
      .subscribe(
        result => {
          if (result.successful) {
            this.user.id = result.id;
            this.user.username = result.username;
            this.user.email = result.email;
            localStorage.setItem('currentUser', result.username); // Remember
            this.msgService.addMsg('update user successfully');
          } else {
            // useless, since this statement is at a callback function.
            // this.user.username = oldName;
            // this.user.username = localStorage.getItem('currentUser');
            this.msgService.addMsg(result.error);
          }
          this.updateForm(this.user.username, this.user.email);
        }
      );
  }

  delete() {
    this.userService.deleteUser(this.user.username)
      .subscribe(
        result => {
          if (result.successful) {
            localStorage.setItem('haveSignIn', false.toString());
            this.router.navigate(['/home']);
            this.msgService.addMsg('delete account successfully');
          } else {
            this.msgService.addMsg(result.error);
          }
        }
      );
  }

  goBack() {
    this.location.back();
  }

  createForm() {
    this.profileForm = new FormGroup({
      username: new FormControl(localStorage.getItem('currentUser'), {
        validators: [
          Validators.required,
          forbiddenNameValidator(/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/),
        ],
        asyncValidators: [
          this.uniqueUsername4Profile.validate.bind(this.uniqueUsername4Profile),
        ],
        updateOn: 'blur',
      }),
      email: new FormControl(localStorage.getItem('email'), [
        Validators.required,
        Validators.email,
      ])
    });
  }

  updateForm(username: string, email: string) {
    this.profileForm.get('username').setValue(username);
    this.profileForm.get('email').setValue(email);
  }

  get username() { return this.profileForm.get('username'); }
  get email() { return this.profileForm.get('email'); }
}
