import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './student.routing';
import { StudentComponent } from './student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
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
    StudentComponent,
    AddStudentComponent,
    DetailStudentComponent,
    ModalMessageComponent
  ],
  entryComponents: [
    AddStudentComponent,
    DetailStudentComponent,
    ModalMessageComponent
  ],
})
export class StudentModule { }
