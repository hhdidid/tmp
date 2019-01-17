import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/message.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models';
import { forbiddenNameValidator, UniqueUsernameValidator, PwdEqualValidator } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-sign-up-editor',
  templateUrl: './sign-up-editor.component.html',
  styleUrls: ['./sign-up-editor.component.css']
})
export class SignUpEditorComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private msgService: MessageService,
    private userService: UserService,
    private router: Router,
    private uniqueUserValidator: UniqueUsernameValidator,
    private pwdEqualValidator: PwdEqualValidator,
  ) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl('', {
        validators: [
          Validators.required,
          forbiddenNameValidator(/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/),
        ],
        asyncValidators: [
          this.uniqueUserValidator.validate.bind(this.uniqueUserValidator),
        ],
        updateOn: 'blur',
      }),
      passwords: new FormGroup(
      {
        password: new FormControl('', Validators.required),
        comfirm: new FormControl('', Validators.required)
      },
      {
        validators: [
          this.pwdEqualValidator.validate.bind(this.pwdEqualValidator),
        ],
        updateOn: 'blur',
      }),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  // required, otherwise "ERROR TypeError: Cannot read property 'invalid' of undefine" when "<div *ngIf="username.invalid"
  get username() { return this.signupForm.get('username'); }
  get passwords() { return this.signupForm.get('passwords'); }
  get password() { return this.signupForm.get('passwords').get('password'); }
  get comfirm() { return this.signupForm.get('passwords').get('comfirm'); }
  get ack() { return this.signupForm.get('ack'); }
  get email() { return this.signupForm.get('email'); }



  signup() {
    this.userService.addUser(
      new User(-1,
        this.signupForm.value['username'], this.signupForm.get('passwords').value['password'], this.signupForm.value['email'], ''))
      .subscribe(
        result => {
          if (result.successful) {
            this.msgService.addMsg('sign up successfully, please sign in');
            this.router.navigate(['/signin']);
          } else {
            this.msgService.addMsg(result.error);
          }
        },
      );
  }
}
