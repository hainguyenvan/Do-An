import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SupportService } from './support.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../config';
import { ThirdParty } from '../../third-party/third-party';

import { AddSupportComponent } from './add-support/add-support.component';
import { DetailSupportComponent } from './detail-support/detail-support.component';
import { sample } from 'rxjs-compat/operator/sample';
import { ModalMessageComponent } from './modal/modal-message.component';


@Component({
  selector: 'support',
  styleUrls: ['./support.component.scss'],
  templateUrl: './support.component.html',
})
export class SupportComponent implements OnInit {
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
      name: {
        title: 'Họ tên',
        type: 'string',
      },
      email: {
        title: 'Email',
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
      positionDsc: {
        title: 'Chức vụ',
        type: 'string',
      },
      company: {
        title: 'Nơi làm việc',
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
  private state: string = Config.ACTIVE;

  constructor(private service: SupportService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.onSearch();
  }

  onCustom(event) {
    this.service.accountItem = event.data;
    switch (event.action) {
      case Config.DETAIL_ACCTION:
        this.service.acction = Config.DETAIL_ACCTION;
        this.showModalDeatailSupport();
        break;
      case Config.DELETE_ACTION:
        if (event.data.status == -1) {
          break;
        }
        this.deleteSupport(event.data.id);
        break;
      case Config.EDIT_ACTION:
        this.service.acction = Config.EDIT_ACTION;
        this.showModalAddSupport();
        break;
      default:
        break;
    }
  }

  deleteSupport(id) {
    const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Thông báo';
    activeModal.componentInstance.modalMessage = 'Bạn có chắc chắn muốn xóa giảng viên ' + this.service.accountItem.name + ' ?';
    activeModal.componentInstance.statusButtonSubmit = true;
    activeModal.result.then((event) => {
      this.service.acction = null;
      switch (event) {
        case Config.EVENT_SUBMIT:
          this.service.deleteSupport(id).subscribe(res => {
            if (res.status != 200) {
              console.log('Err : ', res.msg);
              return;
            }
            this.onSearch();
          });
          break;
        default:
      }
    });
  }

  showModalDeatailSupport() {
    const activeModal = this.modalService.open(DetailSupportComponent, { size: 'lg', container: 'nb-layout' });
  }

  showModalAddSupport() {
    const activeModal = this.modalService.open(AddSupportComponent, { size: 'lg', container: 'nb-layout' });
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
    this.state = Config.LOADING;
    this.service.getAllSupport().subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        this.state = Config.ACTIVE;
        return;
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
      this.state = Config.ACTIVE;
    })
  }
}
