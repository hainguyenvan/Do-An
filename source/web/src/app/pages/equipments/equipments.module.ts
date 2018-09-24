import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './equipments.routing';
import { EquipmentsComponent } from './equipments.component';
import { AddEquipmentsComponent } from './add-equipments/add-equipments.component';
import { DetailEquipmentsComponent } from './detail-equipments/detail-equipments.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    EquipmentsComponent,
    AddEquipmentsComponent,
    DetailEquipmentsComponent
  ],
  entryComponents: [
    AddEquipmentsComponent,
    DetailEquipmentsComponent
  ],
})
export class EquipmentsModule { }
