import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../../@theme/theme.module';
import { routing } from './study-manger.routing';
import { StudyManagerComponent } from './study-manager.component';
import { AddStudyComponent } from './add-study/add-study.component';
import { DetailStudyComponent } from './detail-study/detail-study.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploadModule } from "ng2-file-upload";
import { ModalMessageComponent } from './modal/modal-message.component';
import { SmartContractsComponent } from './smart-contracts/smart-contracts.component';

@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    FileUploadModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    StudyManagerComponent,
    AddStudyComponent,
    DetailStudyComponent,
    ModalMessageComponent,
    SmartContractsComponent,
  ],
  entryComponents: [
    AddStudyComponent,
    DetailStudyComponent,
    ModalMessageComponent,
    SmartContractsComponent,
  ],
})
export class StudyManagerModule { }
