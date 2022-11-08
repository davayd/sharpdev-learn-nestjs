import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards';
import { NgZorroModule } from './ng-zorro.module';

const MODULES = [CommonModule, FormsModule, NgZorroModule];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
  providers: [AuthGuard],
})
export class CoreModule {}
