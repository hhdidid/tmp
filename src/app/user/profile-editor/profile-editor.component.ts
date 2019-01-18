import { Component, OnInit } from '@angular/core';
import { User } from '../use';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';
import { MessageService } from 'src/app/message.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forbiddenNameValidator, UniqueUsername4ProfileValidator } from 'src/app/shared/custom-validators.directive';
import { MomentService } from 'src/app/moments/services/moment.service';
import { Moment } from 'src/app/moments/moment';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {
  user: User = new User(-1, localStorage.getItem('currentUser'), '', '', '');
  moments: Moment[] = [];
  profileForm: FormGroup;

  constructor(
    private location: Location,
    private userService: UserService,
    private msgService: MessageService,
    private momentService: MomentService,
    private router: Router,
    private uniqueUsername4Profile: UniqueUsername4ProfileValidator,
  ) { }

  ngOnInit() {
    this.createForm();

    this.getUser();
    this.getMoments();

    // if this.createForm depend on the inite state of this.user,
    // do not put the init code of this.profileForm here, since this.getUser() finially execute an async callback.
  }


  getUser() {
    const username = localStorage.getItem('currentUser');
    this.userService.getUser(username)
      .subscribe(
        result => {
          if (result.successful) {
            this.user = result.user;
            this.updateForm(this.user.username, this.user.email);
          } else {
            this.msgService.addMsg(result.error);
          }
        }
      );
  }

  getMoments() {
    console.log('xx');
    const username = localStorage.getItem('currentUser');
    this.momentService.getMomentsOf(username)
      .subscribe(result => {
        if (result.successful) {
          this.moments = result.moments === null ? [] : result.moments;
        } else {
          this.msgService.addMsg(result.error);
        }
      });
  }

  save() {
    // const oldName = this.user.username;
    // const newUser = this.user;   // shallow copy
    const newUser = new User(this.user.id, this.user.username, this.user.password, this.user.email, this.user.gravatar);
    newUser.username = this.profileForm.get('username').value;
    newUser.email = this.profileForm.get('email').value;
    this.userService.updateUser(newUser)
      .subscribe(
        result => {
          if (result.successful) {
            this.user = result.user;
            localStorage.setItem('currentUser', this.user.username); // remember
            this.msgService.addMsg('update user successfully');
          } else {
            // useless, since this statement is at a callback function.
            // this.user.username = oldName;
            this.msgService.addMsg(result.error);
          }
          this.updateForm(this.user.username, this.user.email);   // if error, restore the updateForm
        }
      );
  }

  delete() {
    this.userService.deleteUser(this.user.username)
      .subscribe(
        result => {
          if (result.successful) {
            // also update local moment list, emit a signal
            localStorage.setItem('updateMomentList', true.toString());

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
      email: new FormControl('retriving', [
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
