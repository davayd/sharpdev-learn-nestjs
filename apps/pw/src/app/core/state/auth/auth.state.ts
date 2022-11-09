import { KeycloakService } from 'keycloak-angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import {
  Action,
  NgxsAfterBootstrap,
  NgxsOnInit,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SetUserAuthenticated } from './auth.actions';

const AUTH_TOKEN: StateToken<AuthStateModel> = new StateToken('auth');

export interface AuthStateModel {
  isAuthenticated: boolean;
}

@State<AuthStateModel>({
  name: AUTH_TOKEN,
  defaults: {
    isAuthenticated: false,
  },
})
@Injectable()
export class AuthState implements NgxsAfterBootstrap {
  constructor(
    private readonly router: Router,
    private readonly keycloakService: KeycloakService
  ) {}

  async ngxsAfterBootstrap(ctx: StateContext<AuthStateModel>) {
    const isLoggedIn = await this.keycloakService.isLoggedIn();
    ctx.setState({
      isAuthenticated: isLoggedIn,
    });
  }

  @Action(SetUserAuthenticated)
  setUserAuth(ctx: StateContext<AuthStateModel>, action: SetUserAuthenticated) {
    return of(action.payload).pipe(
      tap(() => {
        ctx.patchState({
          isAuthenticated: action.payload,
        });
      })
    );
  }
}
