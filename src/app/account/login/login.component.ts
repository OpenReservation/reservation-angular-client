import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
    standalone: false
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit(): void {
    this.oauthService.initLoginFlow();
  }

}
