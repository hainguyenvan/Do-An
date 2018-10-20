import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        component: ECommerceComponent,
      },
      {
        path: 'support',
        loadChildren: './support/support.module#SupportModule',
      },
      {
        path: 'students',
        loadChildren: './student/student.module#StudentModule',
      },
      {
        path: 'classroom-list',
        loadChildren: './classroom/classroom-list/classroom-list.module#ClassroomListModule',
      },
      {
        path: 'study-manager',
        loadChildren: './classroom/study-manager/study-manager.module#StudyManagerModule',
      },
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
      },
      {
        path: 'position',
        loadChildren: './position/position.module#PositionModule',
      },
      {
        path: 'cetificate-category',
        loadChildren: './cetificate/cetificate-category/cetificate-category.module#CetificateCategoryModule',
      },
      {
        path: 'cetificate-list',
        loadChildren: './cetificate/cetificate-list/cetificate-list.module#CetificateListModule',
      },
      {
        path: 'cetificate-log',
        loadChildren: './cetificate/log/log.module#LogModule',
      },
      {
        path: 'iot-dashboard',
        component: DashboardComponent,
      },
      {
        path: 'ui-features',
        loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule',
      },
      {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule',
      },
      {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule',
      },
      {
        path: 'editors',
        loadChildren: './editors/editors.module#EditorsModule',
      },
      {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule',
      },
      {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule',
      },
      {
        path: 'miscellaneous',
        loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
      },
      {
        path: '',
        redirectTo: 'account',
        pathMatch: 'full',
      },
      {
        path: '**',
        component: NotFoundComponent,
      }
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
