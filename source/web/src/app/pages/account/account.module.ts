import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './account.routing';
import { AccountComponent } from './account.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { DetailAccountComponent } from './detail-account/detail-account.component';
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
    AccountComponent,
    AddAccountComponent,
    DetailAccountComponent,
    ModalMessageComponent
  ],
  entryComponents: [
    AddAccountComponent,
    DetailAccountComponent,
    ModalMessageComponent
  ],
})
export class AccountModule { }
