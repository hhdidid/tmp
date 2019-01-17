import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { forbiddenNameValidator } from 'src/app/shared/custom-validators.directive';

@Component({
  selector: 'app-sign-in-editor',
  templateUrl: './sign-in-editor.component.html',
  styleUrls: ['./sign-in-editor.component.css']
})
export class SignInEditorComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        forbiddenNameValidator(/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

  signin() {
    this.authService.signinWithCredentials(this.signinForm.value['username'], this.signinForm.value['password']);
  }
}
