import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { CategoryComponent } from "./category.component";

export const routes: Routes = [
  {
    path: '',
    component: CategoryComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
