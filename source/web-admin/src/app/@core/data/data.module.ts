import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import { UserActivityService } from './user-activity.service';
import { OrdersChartService } from './orders-chart.service';
import { ProfitChartService } from './profit-chart.service';
import { TrafficListService } from './traffic-list.service';
import { PeriodsService } from './periods.service';
import { EarningService } from './earning.service';
import { OrdersProfitChartService } from './orders-profit-chart.service';
import { TrafficBarService } from './traffic-bar.service';
import { ProfitBarAnimationChartService } from './profit-bar-animation-chart.service';
import { LayoutService } from './layout.service';
import { AccountService } from '../../pages/account/account.service';
import { PositionService } from '../../pages/position/position.service';
import { AuthCustomService } from '../../@theme/components/auth/auth-custom.service';
import { CetificateService } from '../../pages/cetificate/cetificate.service';
import { StudentService } from '../../pages/student/student.service';
import { ClassroomService } from '../../pages/classroom/classrom.service';
import { SupportService } from '../../pages/support/support.service';

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  UserActivityService,
  OrdersChartService,
  ProfitChartService,
  TrafficListService,
  PeriodsService,
  EarningService,
  OrdersProfitChartService,
  TrafficBarService,
  ProfitBarAnimationChartService,
  LayoutService,
  AccountService,
  PositionService,
  AuthCustomService,
  CetificateService,
  StudentService,
  ClassroomService,
  SupportService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
