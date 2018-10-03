import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from './account.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../config';
import { ThirdParty } from '../../third-party/third-party';

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
    this.service.accountItem = event.data;
    switch (event.action) {
      case Config.DETAIL_ACCTION:
        this.showModalDeatailAccount();
        this.service.acction = Config.DETAIL_ACCTION;
        break;
      case Config.DELETE_ACTION:
        this.deleteAccount(event.data.code);
        break;
      case Config.EDIT_ACTION:
        this.showModalAddAccount();
        this.service.acction = Config.EDIT_ACTION;
        break;
      default:
        break;
    }
  }

  deleteAccount(accountCode) {
    let deleteFlag = confirm("Bạn có muốn xóa giảng viên " + accountCode);
    if (deleteFlag == true) {
      this.service.deleteAccount(accountCode).subscribe(res => {
        if (res.status != 200) {
          console.log('Err : ', res.msg);
          return;
        }
        this.onSearch();
      })
    }
  }

  showModalDeatailAccount() {
    const activeModal = this.modalService.open(DetailAccountComponent, { size: 'lg', container: 'nb-layout' });
  }

  showModalAddAccount() {
    const activeModal = this.modalService.open(AddAccountComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.result.then((event) => {
      this.service.acction = null;
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
        item.timeCreate = ThirdParty.convertTimestampToDate(item.timeCreate);
        item.timeUpdate = ThirdParty.convertTimestampToDate(item.timeUpdate);
      });
      this.source.load(res.data);
    })
  }
}
