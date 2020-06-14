import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router:Router) { 
    this.oauthService.loadDiscoveryDocument()
      .then(_=> this.oauthService.initLoginFlow());
  }

  ngOnInit(): void {
    
  }

}
