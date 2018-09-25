import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { ThemeModule } from '../../@theme/theme.module';
import { routing } from './category.routing';
import { CategoryComponent } from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  imports: [
    routing,
    ThemeModule,
    NgxEchartsModule,
    Ng2SmartTableModule
  ],
  declarations: [
    CategoryComponent,
    AddCategoryComponent,
    DetailCategoryComponent
  ],
  entryComponents: [
    AddCategoryComponent,
    DetailCategoryComponent
  ],
})
export class CategoryModule { }
