import { ValidatorFn, AbstractControl, AsyncValidator, ValidationErrors, NG_ASYNC_VALIDATORS, Validator } from '@angular/forms';
import { Injectable, Directive, forwardRef, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserService } from '../user/services/user.service';
import { map, catchError, tap } from 'rxjs/operators';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (ctrl: AbstractControl): { [key: string]: any } | null => {
        const match = nameRe.test(ctrl.value);
        return !match ? { 'forbiddenName': { value: ctrl.value } } : null;
    };
}

@Injectable({ providedIn: 'root' })
export class UniqueUsernameValidator implements AsyncValidator {
    constructor(
        private userService: UserService,
    ) { }

    validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
        return this.userService.uniqueUser(ctrl.value)
            .pipe(
                /*
                tap(unique => {
                    console.log(unique);
                    console.log(unique === true);
                }),
                */
                map(exist => exist ? { uniqueUser: true } : null),
                catchError(() => null)
            );
    }
}

@Injectable({ providedIn: 'root' })
export class UniqueUsername4ProfileValidator implements AsyncValidator {
    constructor(
        private userService: UserService,
    ) { }

    validate(ctrl: AbstractControl): Observable<ValidationErrors | null> {
        if (ctrl.value === localStorage.getItem('currentUser')) {
            return of(null);
        } else {
            return this.userService.uniqueUser(ctrl.value)
                .pipe(
                    map(exist => exist ? { uniqueUser: true } : null),
                    catchError(() => null)
                );
        }
    }
}

@Injectable({ providedIn: 'root' })
export class PwdEqualValidator implements Validator {
    constructor() { }

    validate(ctrl: AbstractControl): { [key: string]: any } | null {
        return ctrl.get('password').value === ctrl.get('comfirm').value ? null : { 'pwdEqual': { value: ctrl.value } };
    }
}


/*
@Directive({
    selector: '[appUniqueUsername]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => UniqueUsernameValidator),
            multi: true
        }
    ]
})
export class UniqueUsernameValidatorDirective {
    constructor(private validator: UniqueUsernameValidator) { }

    validate(control: AbstractControl) {
        this.validator.validate(control);
    }
}
*/
