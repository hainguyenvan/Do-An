import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { EquipmentsComponent } from "./equipments.component";

export const routes: Routes = [
  {
    path: '',
    component: EquipmentsComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
