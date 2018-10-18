import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

import { Config } from '../config';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;


  setHidenChildren(childrens: any[], role: string) {
    if (childrens == undefined || role == undefined) {
      return;
    }
    childrens.forEach((item) => {
      item.data.forEach(tmp => {
        if (item.hidden == false) {
          return;
        }
        if (tmp == role) {
          item.hidden = false;
          return;
        } else {
          item.hidden = true;
        }
      });
    });
  }

  ngOnInit(): void {
    let accountData = localStorage.getItem(Config.OJBJECT_KEY);
    let account = JSON.parse(accountData);
    let permission = account.position;

    this.menu.forEach((item) => {
      // Set defualt hidden menu
      item.hidden = true;
      if (item && item.data) {
        item.data.forEach((role) => {
          if (role == permission) {
            item.hidden = false;
            this.setHidenChildren(item.children, permission);
          }
        });
      }
    });
  }
}
