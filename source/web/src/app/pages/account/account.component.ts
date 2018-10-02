import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from './account.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../config';

import { AddAccountComponent } from './add-account/add-account.component';
import { DetailAccountComponent } from './detail-account/detail-account.component';
import { sample } from 'rxjs-compat/operator/sample';


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
      id: {
        title: 'ID',
        type: 'number',
        width: '10px'
      },
      code: {
        title: 'Mã giảng viên',
        type: 'string',
      },
      name: {
        title: 'Họ tên',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      dateOfBirth: {
        title: 'Ngày sinh',
        type: 'string',
      },
      strSex: {
        title: 'Giới tính',
        type: 'string',
      },
      phone: {
        title: 'Số điện thoại',
        type: 'string',
      },
      address: {
        title: 'Địa chỉ',
        type: 'string',
      },
      position: {
        title: 'Chức vụ',
        type: 'string',
      },
      strStatus: {
        title: 'Trạng thái',
        type: 'string',
        width: '15px'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: AccountService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.onSearch();
  }

  onCustom(event) {
    switch (event.action) {
      case Config.DETAIL_ACCTION:
        this.showModalDeatailAccount();
        break;
      default:
        break;
    }
  }

  showModalDeatailAccount() {
    const activeModal = this.modalService.open(DetailAccountComponent, { size: 'lg', container: 'nb-layout' });
  }

  showModalAddAccount() {
    const activeModal = this.modalService.open(AddAccountComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.result.then((event) => {
      switch (event) {
        case Config.EVENT_CLOSE:
          break;
        case Config.EVENT_SUBMIT:
          this.onSearch();
          break;
        default:
      }
    });
  }

  onSearch() {
    this.service.getAllAccount().subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        alert('Đã xảy ra lỗi');
      }
      res.data.forEach(item => {
        switch (item.sex) {
          case 0:
            item.strSex = 'Nam';
            break;
          case 1:
            item.strSex = 'Nữ';
            break;
          default:
            item.strSex = 'Khác';
        }
        if (item.status == -1) {
          item.strStatus = 'Ngừng hoạt động';
        } else {
          item.strStatus = 'Đang hoạt động';
        }
      });
      this.source.load(res.data);
    })
  }
}
