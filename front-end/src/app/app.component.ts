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
    if (token) {
      this.isAuthenticated = true;
      this.router.navigateByUrl('/home');
    } else {
      this.isAuthenticated = false;
      this.router.navigateByUrl('/login');
    }
  }

}
