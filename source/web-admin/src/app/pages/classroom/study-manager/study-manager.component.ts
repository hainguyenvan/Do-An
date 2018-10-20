import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClassroomService } from '../classrom.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../../config';
import { ThirdParty } from '../../../third-party/third-party';

import { AddStudyComponent } from './add-study/add-study.component';
import { DetailStudyComponent } from './detail-study/detail-study.component';
import { sample } from 'rxjs-compat/operator/sample';
import { ModalMessageComponent } from './modal/modal-message.component';
import { SmartContractsComponent } from './smart-contracts/smart-contracts.component';


@Component({
  selector: 'study-manager',
  styleUrls: ['./study-manager.component.scss'],
  templateUrl: './study-manager.component.html',
})
export class StudyManagerComponent implements OnInit {

  settingsAdmin = {
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
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        }
      ]
    },
    columns: {
      numberId: {
        title: 'Số chứng minh thư',
        type: 'string',
      },
      code: {
        title: 'Mã sinh viên',
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
      strStatus: {
        title: 'Trạng thái',
        type: 'string',
        width: '15px'
      }
    },
  };

  settingsStaff = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'detail',
          title: '<i class="fas fa-eye"></i>'
        }
      ]
    },
    columns: {
      numberId: {
        title: 'Số chứng minh thư',
        type: 'string',
      },
      code: {
        title: 'Mã sinh viên',
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
      strStatus: {
        title: 'Trạng thái',
        type: 'string',
        width: '15px'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public statusAdmin: boolean;
  public statusStaff: boolean;
  public isDisableBtnAdd: boolean;

  public classroomList: any = [];
  public classroomId: number;
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

    // Get all classroom active
    this.service.getAllClassroom().subscribe(res => {
      if (res.status != 200) {
        console.log("Err : ", res.msg);
        return;
      }
      this.classroomList = res.data;
    });
  }

  onCustom(event) {
    this.service.dataItem = event.data;
    switch (event.action) {
      case Config.DETAIL_ACCTION:
        this.showModalDeatailStudent();
        this.service.acction = Config.DETAIL_ACCTION;
        break;
      case Config.DELETE_ACTION:
        if (event.data.status == -1) {
          break;
        }
        this.deleteStudent(event.data.id);
        break;
      default:
        break;
    }
  }

  deleteStudent(studentId) {
    const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Thông báo';
    activeModal.componentInstance.modalMessage = 'Bạn có chắc chắn muốn xóa ' + this.service.dataItem.name + ' khỏi lớp học?';
    activeModal.componentInstance.statusButtonSubmit = true;
    activeModal.result.then((event) => {
      this.service.acction = null;
      switch (event) {
        case Config.EVENT_SUBMIT:
          this.service.destroyStudentOfClassroom(studentId, this.classroomId).subscribe(res => {
            if (res.status != 200) {
              console.log('Err : ', res.msg);
              return;
            }
            this.onSelectClassroom();
          });
          break;
        default:
      }
    });
  }

  showModalDeatailStudent() {
    const activeModal = this.modalService.open(DetailStudyComponent, { size: 'lg', container: 'nb-layout' });
  }

  showModalAddStudy() {
    const activeModal = this.modalService.open(AddStudyComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.result.then((event) => {
      this.service.acction = null;
      switch (event) {
        case Config.EVENT_CLOSE:
          break;
        case Config.EVENT_SUBMIT:
          this.classroomId = this.service.classroomId;
          this.onSelectClassroom();
          break;
        default:
      }
    });
  }

  onSelectClassroom() {
    if (this.classroomId == undefined || this.classroomId == null) {
      return;
    }
    this.state = Config.LOADING;
    this.service.getStudentOfClassroom(this.classroomId).subscribe(res => {
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
