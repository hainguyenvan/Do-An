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

  public classroomList: any = [];
  public classroomId: number;

  constructor(private service: ClassroomService, private modalService: NgbModal) {
  }

  ngOnInit() {
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
        this.showModalDeatailAccount();
        this.service.acction = Config.DETAIL_ACCTION;
        break;
      case Config.DELETE_ACTION:
        if (event.data.status == -1) {
          break;
        }
        this.deleteStudent(event.data.id);
        break;
      case Config.EDIT_ACTION:
        this.showModalAddStudy();
        this.service.acction = Config.EDIT_ACTION;
        break;
      case Config.SMART_CONTRACTS_ACTION:
        this.showModalUpadteStatusSmartContracts();
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

  showModalUpadteStatusSmartContracts() {
    // if (Number(this.service.accountItem.status) == -1) {
    //   const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    //   activeModal.componentInstance.modalHeader = 'Thông báo';
    //   activeModal.componentInstance.modalMessage = 'Bạn cần cấp quyền hoạt động cho giảng viên ' + this.service.accountItem.name + ' trước khi cấp quyền phát hành';
    //   activeModal.componentInstance.statusButtonSubmit = false;
    //   return;
    // }
    // const activeModal = this.modalService.open(SmartContractsComponent, { size: 'lg', container: 'nb-layout' });
    // activeModal.result.then((event) => {
    //   this.service.acction = null;
    //   switch (event) {
    //     case Config.EVENT_SUBMIT:
    //       this.onSearch();
    //       break;
    //     default:
    //   }
    // });
  }

  showModalDeatailAccount() {
    // const activeModal = this.modalService.open(DetailAccountComponent, { size: 'lg', container: 'nb-layout' });
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
    this.service.getStudentOfClassroom(this.classroomId).subscribe(res => {
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
