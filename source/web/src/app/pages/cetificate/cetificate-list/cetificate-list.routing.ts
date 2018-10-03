import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { CetificateListComponent } from "./cetificate-list.component";

export const routes: Routes = [
  {
    path: '',
    component: CetificateListComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
