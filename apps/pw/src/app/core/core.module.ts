import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ng-zorro.module';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from '@ui-core/state/auth';
import { environment } from '@ui-environment/environment';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AuthGuard } from './guards';

const MODULES = [CommonModule, FormsModule, NgZorroModule];

@NgModule({
  declarations: [],
  imports: [
    ...MODULES,
    // NGXS
    NgxsModule.forRoot([AuthState], {
      developmentMode: !environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
  ],
  exports: [...MODULES],
  providers: [AuthGuard],
})
export class CoreModule {}
