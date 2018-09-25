import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { AccountComponent } from "./account.component";

export const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
