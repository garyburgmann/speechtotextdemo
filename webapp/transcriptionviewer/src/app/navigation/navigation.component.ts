import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../navigation.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private user: string;

  constructor(
    private navigationService: NavigationService,
    private authService: AuthService
  ) {
    this.authService.$user.subscribe(user => {
      this.user = user;
      console.log('DEBUG: NavigationComponent: user: ', user);
    })
  }

  ngOnInit() {
  }

}
