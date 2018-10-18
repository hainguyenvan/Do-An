import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ShowPublicCertificateComponent } from './cetificate/cetificate-list/cetificate-list.component';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  entryComponents: [ShowPublicCertificateComponent],
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
    ShowPublicCertificateComponent,
    ...PAGES_COMPONENTS,
  ],
})
export class PagesModule {
}
