import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.less']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router:Router) { 
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(_=> router.navigate(['/reservation/new']));
  }
  ngOnInit(): void {
  }

}
