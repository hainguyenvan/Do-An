import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { ClassroomListComponent } from "./classroom-list.component";

export const routes: Routes = [
  {
    path: '',
    component: ClassroomListComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
