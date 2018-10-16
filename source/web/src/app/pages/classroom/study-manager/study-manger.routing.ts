import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { StudyManagerComponent } from "./study-manager.component";

export const routes: Routes = [
  {
    path: '',
    component: StudyManagerComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
