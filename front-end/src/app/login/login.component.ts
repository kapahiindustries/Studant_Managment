import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth-service';
import { LoginModel } from '../constant/constants';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
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

  constructor(private readonly router: Router, private readonly authService: AuthService, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm.patchValue({
      role_id: 0
    })
  }

  public login() {
    this.isCreating = true;
    const { role_id } = this.loginForm.value;
    this.loginForm.patchValue({
      role_id: parseInt(role_id)
    })
    const data = this.loginForm.value;
    this.authService.login(data).subscribe((result: LoginModel) => {
      if (result.success) {
        this.isError = false;
        localStorage.setItem('token', result.token);
        localStorage.setItem('name', `${result.profile.name} ${result.profile.last_name}`);
        localStorage.setItem('email', `${result.profile.email}`);
        localStorage.setItem('role_id', `${result.profile.role_id}`);

        if (result.profile.role_id === '1') {
          this.router.navigateByUrl('/courses');
        } else {
          this.router.navigateByUrl('/home');
        }

        this.isCreating = false;
      } else {
        this.isError = true;
        this.isCreating = false;
      }
    },
      (error) => {
        this.isError = true;
        this.isCreating = false;
        console.log("error", error)
      });
  }

  public openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false, restoreFocus: false
    });
  }

}
