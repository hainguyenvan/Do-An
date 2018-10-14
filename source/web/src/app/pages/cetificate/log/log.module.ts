import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../../@theme/theme.module';
import { routing } from './log.routing';
import { LogComponent } from './log.component';
import { DetailLogComponent } from './detail-log/detail-log.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    LogComponent,
    DetailLogComponent
  ],
  entryComponents: [
    DetailLogComponent
  ],
})
export class LogModule { }
