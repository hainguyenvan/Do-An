import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ButtonViewComponent } from '../pages/equipments/equipments.component';
import { ButtonStatusComponent } from '../pages/operation-history/operation-history.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  entryComponents: [ButtonViewComponent, ButtonStatusComponent],
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
  ],
  providers: [
  ],
  declarations: [
    ButtonViewComponent,
    ButtonStatusComponent,
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
