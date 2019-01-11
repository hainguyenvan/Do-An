import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CetificateService } from '../cetificate.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../../config';
import { ThirdParty } from '../../../third-party/third-party';

import { AddCetificateComponent } from './add-cetificate/add-cetificate.component';
import { DetailCetificateComponent } from './detail-cetificate/detail-cetificate.component';
import { ModalMessageComponent } from './modal/modal-message.component';
import { SmartContractsComponent } from './smart-contracts/smart-contracts.component';


@Component({
  selector: 'button-view',
  styleUrls: ['./cetificate-list.component.scss'],
  template: `
    <button type="button" class="btn btn-warning btn-xs" id="{{id}}" (click)="onClick()">{{ renderValue }}</button>
  `,
})
export class ShowPublicCertificateComponent implements ViewCell, OnInit {
  public renderValue: string;
  public id: string;
  public status: number = 0;


  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private service: CetificateService,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    console.log('Data : ', this.rowData);
    // this.save.emit(this.rowData);
    if (this.rowData.certificateSmartContracts == undefined) {
      return;
    }
    const activeModal = this.modalService.open(DetailCetificateComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.showCertificate = true;
    activeModal.componentInstance.modalHeader = 'Chứng chỉ phát hành';
    let certificate = this.rowData.certificateSmartContracts;
    certificate.strStatusPublic = certificate.status == 1 ? 'Đã phát hành' : 'Ngừng phát hành';
    certificate.studentImg = this.rowData.student.img;
    activeModal.componentInstance.cetificate = certificate;
  }
}


@Component({
  selector: 'cetificate-list',
  styleUrls: ['./cetificate-list.component.scss'],
  templateUrl: './cetificate-list.component.html',
})
export class CetificateListComponent implements OnInit {
  settingsPublicer = {
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
        },
        {
          name: 'smartcontracts',
          title: '<i class="ion-document-text icon-public"></i>'
        }
      ]
    },
    columns: {
      code: {
        title: 'Mã chứng chỉ',
        type: 'number',
        width: '10px'
      },
      title: {
        title: 'Tên chứng chỉ',
        type: 'string',
      },
      strCategory: {
        title: 'Loại chứng chỉ',
        type: 'string',
      },
      studentName: {
        title: 'Tên sinh viên',
        type: 'string',
      },
      dateOfBirth: {
        title: 'Ngày sinh',
        type: 'string',
      },
      yearOfGraduation: {
        title: 'Năm tốt nghiệp',
        type: 'string',
      },
      degreeClassification: {
        title: 'Xếp loại',
        type: 'string',
      },
      modeOfStudy: {
        title: 'Hình thức đào tạo',
        type: 'string',
      },
      author: {
        title: 'Hiệu trưởng',
        type: 'string',
      },
      date: {
        title: 'Ngày phát hành',
        type: 'string',
      },
      strStatus: {
        title: 'Trạng thái cập nhật',
        type: 'string',
        width: '15px'
      },
      strStatusPublic: {
        title: 'Trạng thái phát hành',
        type: 'custom',
        renderComponent: ShowPublicCertificateComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            // console.log('row : ', row);
          });
        }
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
      code: {
        title: 'Mã chứng chỉ',
        type: 'number',
        width: '10px'
      },
      title: {
        title: 'Tên chứng chỉ',
        type: 'string',
      },
      strCategory: {
        title: 'Loại chứng chỉ',
        type: 'string',
      },
      studentName: {
        title: 'Tên sinh viên',
        type: 'string',
      },
      dateOfBirth: {
        title: 'Ngày sinh',
        type: 'string',
      },
      yearOfGraduation: {
        title: 'Năm tốt nghiệp',
        type: 'string',
      },
      degreeClassification: {
        title: 'Xếp loại',
        type: 'string',
      },
      modeOfStudy: {
        title: 'Hình thức đào tạo',
        type: 'string',
      },
      author: {
        title: 'Hiệu trưởng',
        type: 'string',
      },
      date: {
        title: 'Ngày phát hành',
        type: 'string',
      },
      strStatus: {
        title: 'Trạng thái cập nhật',
        type: 'string',
        width: '15px'
      },
      strStatusPublic: {
        title: 'Trạng thái phát hành',
        type: 'custom',
        renderComponent: ShowPublicCertificateComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            // console.log('row : ', row);
          });
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  public statusPublicer: boolean;
  public statusStaff: boolean;
  public isDisableBtnAdd: boolean;
  private state: string = Config.ACTIVE;

  constructor(private service: CetificateService, private modalService: NgbModal) {
  }

  ngOnInit() {
    let accountData = localStorage.getItem(Config.OJBJECT_KEY);
    let account = JSON.parse(accountData);
    switch (account.position) {
      case 'Admin':
        this.statusPublicer = true;
        this.isDisableBtnAdd = false;
        break;
      case 'Publicer':
        this.statusPublicer = true;
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
        this.showModalDeatailAccount();
        this.service.acction = Config.DETAIL_ACCTION;
        break;
      case Config.DELETE_ACTION:
        if (event.data.certificateSmartContracts === undefined) {
          this.deleteCetificate(event.data.id);
          break;
        }
        break;
      case Config.EDIT_ACTION:
        this.service.acction = Config.EDIT_ACTION;
        this.showModalAddAccount();
        break;
      case Config.SMART_CONTRACTS_ACTION:
        this.showModalSmartContracts();
        break;
      default:
        break;
    }
  }

  deleteCetificate(id) {
    const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Thông báo';
    activeModal.componentInstance.modalMessage = 'Bạn có chắc chắn muốn xóa ID ' + id + ' ?';
    activeModal.componentInstance.statusButtonSubmit = true;
    activeModal.result.then((event) => {
      this.service.acction = null;
      switch (event) {
        case Config.EVENT_SUBMIT:
          this.service.deleteCeticateList(id).subscribe(res => {
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

  showModalDeatailAccount() {
    const activeModal = this.modalService.open(DetailCetificateComponent, { size: 'lg', container: 'nb-layout' });
  }

  showModalSmartContracts() {
    let accountData = localStorage.getItem(Config.OJBJECT_KEY);
    let account = JSON.parse(accountData);
    if (account.authorSmartContracts == undefined || account.authorSmartContracts.status == undefined || Number(account.authorSmartContracts.status) != 0) {
      const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'Thông báo';
      activeModal.componentInstance.modalMessage = 'Bạn chưa được cấp quyền để phát hành chứng chỉ';
      activeModal.componentInstance.statusButtonSubmit = false;
      return;
    }

    if (Number(this.service.dataItem.status) == -1) {
      const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
      activeModal.componentInstance.modalHeader = 'Thông báo';
      activeModal.componentInstance.modalMessage = 'Bạn cần cấp quyền hoạt động cho chứng chỉ ' + this.service.dataItem.code + ' trước khi phát hành';
      activeModal.componentInstance.statusButtonSubmit = false;
      return;
    }
    const activeModal = this.modalService.open(SmartContractsComponent, { size: 'lg', container: 'nb-layout' });
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

  showModalAddAccount() {
    const activeModal = this.modalService.open(AddCetificateComponent, { size: 'lg', container: 'nb-layout' });
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
    this.service.getAllCeticateList().subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        this.state = Config.ACTIVE;
        return;
      }
      console.log('==== data: ', res);
      res.data.forEach((item, index) => {
        switch (item.status) {
          case 0:
            item.strStatus = 'Chưa phát hành';
            break;
          case 101:
            item.strStatus = 'Đã chỉnh sửa';
            break;
          case 1:
            item.strStatus = 'Đã phát hành';
            break;
          case -1:
            item.strStatus = 'Đã xóa';
            break;
        }
        if (item.certificateSmartContracts == undefined) {
          item.strStatusPublic = 'Chưa phát hành';
          item.certificateSmartContracts = {
            status: ''
          }
        } else {
          item.strStatusPublic = item.certificateSmartContracts.status == 1 ? 'Đã phát hành' : 'Ngừng phát hành';
        }
        item.strCategory = item.category.dsc;
        item.timeCreate = ThirdParty.convertTimestampToDate(item.timeCreate);
        item.timeUpdate = ThirdParty.convertTimestampToDate(item.timeUpdate);
        item.dateOfBirth = item.student.dateOfBirth;
        item.studentName = item.student.name;
        item.studentSign = item.student.studentSign;
        if (index == res.data.length - 1) {
          this.source.load(res.data);
          this.state = Config.ACTIVE;
          return;
        }
      });
    });
    this.state = Config.ACTIVE;
  }
}
