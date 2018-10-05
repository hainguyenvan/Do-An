import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './position.routing';
import { PositionComponent } from './position.component';
import { AddPositionComponent } from './add-position/add-position.component';
import { DetailPositionComponent } from './detail-position/detail-position.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ModalMessageComponent } from './modal/modal-message.component';

@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    PositionComponent,
    AddPositionComponent,
    DetailPositionComponent,
    ModalMessageComponent
  ],
  entryComponents: [
    AddPositionComponent,
    DetailPositionComponent,
    ModalMessageComponent
  ],
})
export class PositionModule { }
