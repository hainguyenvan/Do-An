import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { LogComponent } from "./log.component";

export const routes: Routes = [
  {
    path: '',
    component: LogComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
