import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserToRegister } from '../_models/userToRegister';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  //form-controls
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  confirmPasswordFormControl: FormControl;
  userNameFormControl: FormControl;
  nameFormControl: FormControl;
  surnameFormControl: FormControl;
  phoneNumberFormControl: FormControl;
  //role
  checked: boolean = false;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.initalize();
  }

  initalize() {
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.passwordFormControl = new FormControl('', [Validators.required]);

    this.confirmPasswordFormControl = new FormControl('', [
      Validators.required,
    ]);

    this.userNameFormControl = new FormControl('', [Validators.required]);

    this.nameFormControl = new FormControl('', [Validators.required]);

    this.surnameFormControl = new FormControl('', [Validators.required]);

    this.phoneNumberFormControl = new FormControl('', [Validators.required]);
  }

  passwordMatchValidator(): boolean {
    return (
      this.passwordFormControl.value === this.confirmPasswordFormControl.value
    );
  }

  isValid(): boolean {
    return (
      this.emailFormControl.valid &&
      this.passwordFormControl.valid &&
      this.confirmPasswordFormControl.valid &&
      this.userNameFormControl.valid &&
      this.nameFormControl.valid &&
      this.surnameFormControl.valid &&
      this.phoneNumberFormControl.valid &&
      this.passwordMatchValidator()
    );
  }

  matcher = new MyErrorStateMatcher();

  register() {
    const user: UserToRegister = {
      email: this.emailFormControl.value,
      userName: this.userNameFormControl.value,
      name: this.nameFormControl.value,
      surname: this.surnameFormControl.value,
      password: this.passwordFormControl.value,
      phoneNumber: this.phoneNumberFormControl.value,
      role: this.checked ? 'Admin' : 'User',
    };

    this.authService.register(user).subscribe(
      (next) => {
        debugger;
        this.alertify.success('Dziękujemy za rejestrację.');
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
}
