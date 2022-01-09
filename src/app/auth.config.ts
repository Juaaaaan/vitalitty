import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {

    // issuer: 'https://idsvr4.azurewebsites.net',
    issuer: 'https://accounts.google.com/o/oauth2/auth',
    loginUrl: 'https://accounts.google.com/o/oauth2/auth',

    redirectUri: 'http://localhost:8100',
  

    clientId: '1071430120392-el307509tli06fkutvitosopushhe5bc.apps.googleusercontent.com',

    dummyClientSecret: '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',
    requestAccessToken: true,
  
    responseType: 'code',

    scope: 'https://www.googleapis.com/auth/calendar.events',
  
    showDebugInformation: true,
  };