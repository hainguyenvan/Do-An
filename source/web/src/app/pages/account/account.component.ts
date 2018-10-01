import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from './account.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../third-party/config';

import { AddAccountComponent } from './add-account/add-account.component';
import { DetailAccountComponent } from './detail-account/detail-account.component';


@Component({
  selector: 'account',
  styleUrls: ['./account.component.scss'],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'detail',
          title: '<i class="fas fa-eye"></i>'
        },
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        }
      ]
    },
    columns: {
      no: {
        title: 'STT',
        type: 'number',
        width: '10px'
      },
      serial_number: {
        title: 'Code',
        type: 'string',
      },
      equipment_type: {
        title: 'Họ tên',
        type: 'string',
      },
      equipment_name: {
        title: 'Email',
        type: 'string',
      },
      position: {
        title: 'Ngày sinh',
        type: 'string',
      },
      working_hours: {
        title: 'Giới tính',
        type: 'number',
        width: '15px'
      },
      material_consumable: {
        title: 'Số điện thoại',
        type: 'string',
      },
      date: {
        title: 'Địa chỉ',
        type: 'string',
      },
      update_by: {
        title: 'Chức vụ',
        type: 'string',
      },
      approved_by: {
        title: 'Trạng thái',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: AccountService, private modalService: NgbModal) {
  }

  ngOnInit() {
    const data = this.service.getData();
    this.source.load(data);
  }

  onCustom(event) {
    switch (event.action) {
      case Config.DETAIL_ACCTION:
        this.showModalDeatailEquipments();
        break;
      default:
        break;
    }
  }

  showModalDeatailEquipments() {
    const activeModal = this.modalService.open(DetailAccountComponent, { size: 'lg', container: 'nb-layout' });
  }



  showModalAddEquipments() {
    const activeModal = this.modalService.open(AddAccountComponent, { size: 'lg', container: 'nb-layout' });
  }
}
