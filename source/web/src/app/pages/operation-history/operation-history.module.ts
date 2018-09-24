import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './operation-history.routing';
import { OperationHistoryComponent } from './operation-history.component';
import { AddOperationHistoryComponent } from './add-operation-history/add-operation-history.component';
import { DetailOperationHistoryComponent } from './detail-operation-history/detail-operation-history.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    OperationHistoryComponent,
    AddOperationHistoryComponent,
    DetailOperationHistoryComponent
  ],
  entryComponents: [
    AddOperationHistoryComponent,
    DetailOperationHistoryComponent
  ],
})
export class OperationHistoryModule { }
