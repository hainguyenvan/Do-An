import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { OperationHistoryComponent } from "./operation-history.component";

export const routes: Routes = [
  {
    path: '',
    component: OperationHistoryComponent,
    children: []
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
