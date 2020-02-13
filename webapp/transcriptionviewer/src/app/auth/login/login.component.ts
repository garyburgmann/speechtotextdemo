import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.authService.logout();
    const token = this.route.snapshot.queryParamMap.get('REF');
    if (token) {
      this.authService.login(token);
    }
  }

  mockLogin() {
    this.authService.redirect();
  }
}
