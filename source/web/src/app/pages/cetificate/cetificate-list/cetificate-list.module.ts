import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../../@theme/theme.module';
import { routing } from './cetificate-list.routing';
import { CetificateListComponent } from './cetificate-list.component';
import { AddCetificateComponent } from './add-cetificate/add-cetificate.component';
import { DetailCetificateComponent } from './detail-cetificate/detail-cetificate.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploadModule } from "ng2-file-upload";

@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    FileUploadModule,
    Ng2SmartTableModule
  ],
  declarations: [
    CetificateListComponent,
    AddCetificateComponent,
    DetailCetificateComponent
  ],
  entryComponents: [
    AddCetificateComponent,
    DetailCetificateComponent
  ],
})
export class CetificateListModule { }
