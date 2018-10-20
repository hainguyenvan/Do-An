import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClassroomService } from '../classrom.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../../config';
import { ThirdParty } from '../../../third-party/third-party';

import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { ModalMessageComponent } from './modal/modal-message.component';


@Component({
  selector: 'classroom-list',
  styleUrls: ['./classroom-list.component.scss'],
  templateUrl: './classroom-list.component.html',
})
export class ClassroomListComponent implements OnInit {
  settingsAdmin = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
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
        title: 'Mã lớp học',
        type: 'string',
      },
      dsc: {
        title: 'Tên lớp học',
        type: 'string',
      },
      timeCreate: {
        title: 'Ngày tạo',
        type: 'string',
      },
      timeUpdate: {
        title: 'Ngày cập nhật',
        type: 'string',
      },
      strStatus: {
        title: 'Trạng thái',
        type: 'string'
      }
    },
  };

  settingsStaff = {
    actions: {
      delete: false,
      add: false,
      edit: false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '10px'
      },
      code: {
        title: 'Mã lớp học',
        type: 'string',
      },
      dsc: {
        title: 'Tên lớp học',
        type: 'string',
      },
      timeCreate: {
        title: 'Ngày tạo',
        type: 'string',
      },
      timeUpdate: {
        title: 'Ngày cập nhật',
        type: 'string',
      },
      strStatus: {
        title: 'Trạng thái',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public statusAdmin: boolean;
  public statusStaff: boolean;
  public isDisableBtnAdd: boolean;
  private state: string = Config.ACTIVE;

  constructor(private service: ClassroomService, private modalService: NgbModal) {
  }

  ngOnInit() {
    let accountData = localStorage.getItem(Config.OJBJECT_KEY);
    let account = JSON.parse(accountData);
    switch (account.position) {
      case 'Admin':
        this.statusAdmin = true;
        this.isDisableBtnAdd = false;
        break;
      default:
        this.statusStaff = true;
        this.isDisableBtnAdd = true;
    }
    this.onSearch();
  }

  onCustom(event) {
    this.service.dataItem = event.data;
    switch (event.action) {
      case Config.DELETE_ACTION:
        if (event.data.status == -1) {
          break;
        }
        this.deleteClassroom(event.data.id);
        break;
      case Config.EDIT_ACTION:
        this.service.acction = Config.EDIT_ACTION;
        this.showModalAddClassroom();
        break;
      default:
        break;
    }
  }

  deleteClassroom(id) {
    const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Thông báo';
    activeModal.componentInstance.modalMessage = 'Bạn có chắc chắn muốn xóa lớp học ' + this.service.dataItem.dsc + ' ?';
    activeModal.componentInstance.statusButtonSubmit = true;
    activeModal.result.then((event) => {
      this.service.acction = null;
      switch (event) {
        case Config.EVENT_SUBMIT:
          this.service.deleteClassroom(id).subscribe(res => {
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

  showModalAddClassroom() {
    const activeModal = this.modalService.open(AddClassroomComponent, { size: 'lg', container: 'nb-layout' });
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
    this.service.getAllClassroom().subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        this.state = Config.ACTIVE;
        return;
      }
      res.data.forEach(item => {
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
