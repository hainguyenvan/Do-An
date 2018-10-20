import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StudentService } from './student.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../config';
import { ThirdParty } from '../../third-party/third-party';

import { AddStudentComponent } from './add-student/add-student.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { sample } from 'rxjs-compat/operator/sample';
import { ModalMessageComponent } from './modal/modal-message.component';


@Component({
  selector: 'student',
  styleUrls: ['./student.component.scss'],
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {
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
      numberId: {
        title: 'Số chứng minh thư',
        type: 'string',
        width: '10px'
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
        width: '10px'
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
  private state: string = Config.ACTIVE;

  constructor(private service: StudentService, private modalService: NgbModal) {
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
      case Config.DETAIL_ACCTION:
        this.service.acction = Config.DETAIL_ACCTION;
        this.showModalDeatailStudent();
        break;
      case Config.DELETE_ACTION:
        if (event.data.status == -1) {
          break;
        }
        this.deleteStudent(event.data.id);
        break;
      case Config.EDIT_ACTION:
        this.service.acction = Config.EDIT_ACTION;
        this.showModalAddStudent();
        break;
      default:
        break;
    }
  }

  showModalDeatailStudent() {
    const activeModal = this.modalService.open(DetailStudentComponent, { size: 'lg', container: 'nb-layout' });
  }

  deleteStudent(id) {
    const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Thông báo';
    activeModal.componentInstance.modalMessage = 'Bạn có chắc chắn muốn xóa sinh viên ' + this.service.dataItem.name + ' ?';
    activeModal.componentInstance.statusButtonSubmit = true;
    activeModal.result.then((event) => {
      this.service.acction = null;
      switch (event) {
        case Config.EVENT_SUBMIT:
          this.service.deleteStudent(id).subscribe(res => {
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

  showModalAddStudent() {
    const activeModal = this.modalService.open(AddStudentComponent, { size: 'lg', container: 'nb-layout' });
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
    this.service.getAllStudents().subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
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
            item.strSex = 'Chưa xác định';
            break;
        }
        item.strStatus = item.status == 0 ? 'Hoạt động' : 'Đã xóa';
      });
      this.source.load(res.data);
      this.state = Config.ACTIVE;
    })
  }
}
