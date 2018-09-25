import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './account.routing';
import { AccountComponent } from './account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DetailAccountComponent } from './detail-account/detail-account.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    AccountComponent,
    AddAccountComponent,
    DetailAccountComponent
  ],
  entryComponents: [
    AddAccountComponent,
    DetailAccountComponent
  ],
})
export class AccountModule { }
