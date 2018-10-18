import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../../@theme/theme.module';
import { routing } from './cetificate-category.routing';
import { CetificateCategoryComponent } from './cetificate-category.component';
import { AddCetificateComponent } from './add-cetificate/add-cetificate.component';
import { DetailCetificateComponent } from './detail-cetificate/detail-cetificate.component';
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
    CetificateCategoryComponent,
    AddCetificateComponent,
    DetailCetificateComponent,
    ModalMessageComponent
  ],
  entryComponents: [
    AddCetificateComponent,
    DetailCetificateComponent,
    ModalMessageComponent
  ],
})
export class CetificateCategoryModule { }
