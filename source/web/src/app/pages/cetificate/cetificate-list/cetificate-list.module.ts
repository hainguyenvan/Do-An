import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../../@theme/theme.module';
import { routing } from './cetificate-list.routing';
import { CetificateListComponent } from './cetificate-list.component';
import { AddCetificateComponent } from './add-cetificate/add-cetificate.component';
import { DetailCetificateComponent } from './detail-cetificate/detail-cetificate.component';
import { ModalMessageComponent } from './modal/modal-message.component';
import { SmartContractsComponent } from './smart-contracts/smart-contracts.component';
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
    DetailCetificateComponent,
    ModalMessageComponent,
    SmartContractsComponent
  ],
  entryComponents: [
    AddCetificateComponent,
    DetailCetificateComponent,
    ModalMessageComponent,
    SmartContractsComponent
  ],
})
export class CetificateListModule { }
