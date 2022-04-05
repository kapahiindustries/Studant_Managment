import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name = '';
  email = '';

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('name')) {
      this.name = JSON.parse(JSON.stringify(localStorage.getItem('name')));
      this.email = JSON.parse(JSON.stringify(localStorage.getItem('email')));
    }

  }

  public logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
