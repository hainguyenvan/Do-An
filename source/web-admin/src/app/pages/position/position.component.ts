import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PositionService } from './position.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddPositionComponent } from './add-position/add-position.component';
import { DetailPositionComponent } from './detail-position/detail-position.component';

import { Config } from '../../config';
import { ThirdParty } from '../../third-party/third-party';
import { ModalMessageComponent } from './modal/modal-message.component';

@Component({
  selector: 'position',
  styleUrls: ['./position.component.scss'],
  templateUrl: './position.component.html',
})
export class PositionComponent implements OnInit {
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
        type: 'number'
      },
      dsc: {
        title: 'Mô tả',
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
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  private state: string = Config.ACTIVE;

  constructor(private service: PositionService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.onSearch();
  }

  onCustom(event) {
    this.service.positionItem = event.data;
    switch (event.action) {
      case Config.DETAIL_ACCTION:
        this.showModalDeatailPosition();
        this.service.acction = Config.DETAIL_ACCTION;
        break;
      case Config.DELETE_ACTION:
        if (event.data.status == -1) {
          break;
        }
        this.deletePosition(event.data.id);
        break;
      case Config.EDIT_ACTION:
        this.showModalAddPosition();
        this.service.acction = Config.EDIT_ACTION;
        break;
      default:
        break;
    }
  }

  showModalDeatailPosition() {
    const activeModal = this.modalService.open(DetailPositionComponent, { size: 'lg', container: 'nb-layout' });
  }

  showModalAddPosition() {
    const activeModal = this.modalService.open(AddPositionComponent, { size: 'lg', container: 'nb-layout' });
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

  deletePosition(id) {
    const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Thông báo';
    activeModal.componentInstance.modalMessage = 'Bạn có chắc chắn muốn xóa ID ' + id + ' ?';
    activeModal.componentInstance.statusButtonSubmit = true;
    activeModal.result.then((event) => {
      this.service.acction = null;
      switch (event) {
        case Config.EVENT_SUBMIT:
          this.service.deletePosition(id).subscribe(res => {
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

  onSearch() {
    this.state = Config.LOADING;
    this.service.getAllPosition().subscribe(res => {
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
    });
  }
}
