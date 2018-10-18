import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { StudentComponent } from "./student.component";

export const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
