// This api will come in the next version

import { AuthConfig } from 'angular-oauth2-oidc';

export const authPasswordFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://id.weihanli.xyz',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/account/callback',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: 'reservation-angular-client',

  dummyClientSecret: 'f6f1f917-0899-ef36-63c8-84728f411e7c',

  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: 'openid profile',

  showDebugInformation: true,

  oidc: false
};

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://id.weihanli.xyz',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/account/callback',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'reservation-angular-client',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  dummyClientSecret: 'f6f1f917-0899-ef36-63c8-84728f411e7c',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: false
    ? 'openid profile'
    : 'openid profile offline_access',

  // ^^ Please note that offline_access is not needed for silent refresh
  // At least when using idsvr, this even prevents silent refresh
  // as idsvr ALWAYS prompts the user for consent when this scope is
  // requested

  // This is needed for silent refresh (refreshing tokens w/o a refresh_token)
  // **AND** for logging in with a popup
  //silentRefreshRedirectUri: `${window.location.origin}/silent-refresh.html`,

  useSilentRefresh: false,

  showDebugInformation: true,

  sessionChecksEnabled: true,

  //timeoutFactor: 0.01,
  // disablePKCI: true,

  clearHashAfterLogin: false
};