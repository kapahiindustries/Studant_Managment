import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated = false;
  constructor(private readonly router: Router) {
  }

  ngOnInit() {
    let token = localStorage.getItem('token');
    let roleId = localStorage.getItem('role_id');
    if (token) {
      this.isAuthenticated = true;
      if (roleId == "0") {
        this.router.navigateByUrl('/home');
      } else {
        this.router.navigateByUrl('/courses')
      }

    } else {
      this.isAuthenticated = false;
      this.router.navigateByUrl('/login');
    }
  }

}
