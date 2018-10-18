import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { CetificateCategoryComponent } from "./cetificate-category.component";

export const routes: Routes = [
  {
    path: '',
    component: CetificateCategoryComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
