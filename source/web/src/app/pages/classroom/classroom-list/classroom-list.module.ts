import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../../@theme/theme.module';
import { routing } from './classroom-list.routing';
import {  ClassroomListComponent } from './classroom-list.component';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
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
    ClassroomListComponent,
    AddClassroomComponent,
    ModalMessageComponent
  ],
  entryComponents: [
    AddClassroomComponent,
    ModalMessageComponent
  ],
})
export class ClassroomListModule { }
