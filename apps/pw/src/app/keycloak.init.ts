import { APP_INITIALIZER, Provider } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'pw',
        clientId: 'spa',
      },
      bearerPrefix: 'Bearer',
      initOptions: {

        // checkLoginIframe: false,
        // flow: 'standard',
        // onLoad: 'check-sso',
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
        // redirectUri: 'http://localhost:4200',
      },
    });
}

export const KeycloakProvider: Provider = {
  provide: APP_INITIALIZER,
  useFactory: initializeKeycloak,
  multi: true,
  deps: [KeycloakService],
};
