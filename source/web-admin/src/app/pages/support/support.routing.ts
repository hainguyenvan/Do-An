import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { SupportComponent } from "./support.component";

export const routes: Routes = [
  {
    path: '',
    component: SupportComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
