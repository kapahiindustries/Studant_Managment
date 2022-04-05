import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth-service';
import { LoginModel } from '../constant/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isError = false;
  isCreating = false;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role_id: new FormControl('')
  });

  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
  }

  public login() {
    this.isCreating = true;
    this.loginForm.patchValue({
      role_id: 0
    });
    const data = this.loginForm.value;
    this.authService.login(data).subscribe((result: LoginModel) => {
      if (result.success) {
        this.isError = false;
        localStorage.setItem('token', result.token);
        localStorage.setItem('name', `${result.profile.name} ${result.profile.last_name}`);
        localStorage.setItem('email', `${result.profile.email}`);

        this.router.navigateByUrl('/home');
        this.isCreating = false;
      } else {
        this.isError = true;
        this.isCreating = false;
      }
    },
      (error) => {
        this.isCreating = false;
        console.log("error", error)
      });
  }

}
