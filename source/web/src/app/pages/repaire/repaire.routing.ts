import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { RepaireComponent } from "./repaire.component";

export const routes: Routes = [
  {
    path: '',
    component: RepaireComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
