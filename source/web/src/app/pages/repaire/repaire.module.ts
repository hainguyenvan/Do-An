import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './repaire.routing';
import { RepaireComponent } from './repaire.component';
import { AddRepaireHistoryComponent } from './add-repaire/add-repaire.component';
import { DetailRepaireComponent } from './detail-repaire/detail-repaire.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    RepaireComponent,
    AddRepaireHistoryComponent,
    DetailRepaireComponent
  ],
  entryComponents: [
    AddRepaireHistoryComponent,
    DetailRepaireComponent
  ],
})
export class RepaireModule { }
