/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
    private menuService: NbMenuService,
    protected router: Router) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.menuService.onItemClick().subscribe((event) => {
      this.onItemSelection(event.item);
    });
  }

  onItemSelection(item) {
    switch (item.id) {
      case 0:
        console.log('Ho so');
        break;
      case 1:
        let link = ['/auth'];
        console.log('Fucking');
        this.router.navigate(link);
        break;
    }
  }
}
