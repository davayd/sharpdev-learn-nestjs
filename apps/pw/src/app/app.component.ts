import { HttpClient } from '@angular/common/http';
import { KeycloakService } from 'keycloak-angular';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'sharpdev-pw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.keycloakService.isLoggedIn().then((status) => {
      console.log(status);
    });

    this.keycloakService.keycloakEvents$
      .asObservable()
      .pipe(
        tap({
          next: (v) => {
            console.log('keycloakEvents next', v);
          },
          error: (e) => {
            console.log('keycloakEvents error', e);
          },
          complete: () => {
            console.log('keycloakEvents complete');
          },
        })
      )
      .subscribe();

    this.test();
  }

  login() {
    this.keycloakService.login({
      redirectUri: 'http://localhost:4200',
    });
  }

  test() {
    this.httpClient.get('/api/users/1').subscribe((response) => {
      console.log(response);
    });
  }
}
