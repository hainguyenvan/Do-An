import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './support.routing';
import { SupportComponent } from './support.component';
import { AddSupportComponent } from './add-support/add-support.component';
import { DetailSupportComponent } from './detail-support/detail-support.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploadModule } from "ng2-file-upload";
import { ModalMessageComponent } from './modal/modal-message.component';

@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    FileUploadModule,
    Ng2SmartTableModule
  ],
  declarations: [
    SupportComponent,
    AddSupportComponent,
    DetailSupportComponent,
    ModalMessageComponent
  ],
  entryComponents: [
    AddSupportComponent,
    DetailSupportComponent,
    ModalMessageComponent
  ],
})
export class SupportModule { }
