import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CetificateService } from '../cetificate.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../../config';
import { ThirdParty } from '../../../third-party/third-party';

import { AddCetificateComponent } from './add-cetificate/add-cetificate.component';
import { DetailCetificateComponent } from './detail-cetificate/detail-cetificate.component';
import { sample } from 'rxjs-compat/operator/sample';
import { ModalMessageComponent } from './modal/modal-message.component';


@Component({
  selector: 'cetificate-list',
  styleUrls: ['./cetificate-list.component.scss'],
  templateUrl: './cetificate-list.component.html',
})
export class CetificateListComponent implements OnInit {
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
        title: 'Trạng thái',
        type: 'string',
        width: '15px'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: CetificateService, private modalService: NgbModal) {
  }

  ngOnInit() {
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
        switch (event.data.status) {
          case -1:
            break;
          case 0:
            this.deleteCetificate(event.data.id);
            break;
          case 1:
            break;
        }
        break;
      case Config.EDIT_ACTION:
        this.showModalAddAccount();
        this.service.acction = Config.EDIT_ACTION;
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
    this.service.getAllCeticateList().subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        alert('Đã xảy ra lỗi');
      }
      res.data.forEach((item, index) => {
        switch (item.status) {
          case 0:
            item.strStatus = 'Chưa phát hành';
            break;
          case 1:
            item.strStatus = 'Đã phát hành';
            break;
          case -1:
            item.strStatus = 'Đã xóa';
            break;
        }
        item.strCategory = item.category.dsc;
        item.timeCreate = ThirdParty.convertTimestampToDate(item.timeCreate);
        item.timeUpdate = ThirdParty.convertTimestampToDate(item.timeUpdate);
        if (index == res.data.length - 1) {
          this.source.load(res.data);
          return;
        }
      });

    })
  }
}
