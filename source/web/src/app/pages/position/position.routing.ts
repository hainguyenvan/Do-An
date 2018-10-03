import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { PositionComponent } from "./position.component";

export const routes: Routes = [
  {
    path: '',
    component: PositionComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
