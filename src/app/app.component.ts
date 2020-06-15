import { Component } from '@angular/core';
import { MenuItem } from './models/MenuItem';
import { Router, NavigationStart } from '@angular/router';
import { LoadingService } from './services/LoadingService';
import { OAuthService } from 'angular-oauth2-oidc';
import * as authConfig from './shared/authConfig';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(public loadingSvc: LoadingService,
        private router:Router,
        private oauth: OAuthService
    ) {
    this.oauth.configure(authConfig.authCodeFlowConfig);
    this.oauth.loadDiscoveryDocument();

    this.loadingSvc.isLoading = true;
    this.router.events.subscribe((e) => { if(e instanceof NavigationStart) {this.loadingSvc.isLoading = true;} });
  }

  title = 'OpenReservation';
  year = new Date().getFullYear();

  menus: Array<MenuItem> = [
    { Title: "首页", Link: "/" },
    { Title: "预约", Link: "/reservation/new"},
    { Title: "公告", Link: "/notice" },
    { Title: "关于", Link: "/about" },
  ];
}
