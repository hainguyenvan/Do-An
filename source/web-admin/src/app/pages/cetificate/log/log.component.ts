import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CetificateService } from '../cetificate.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../../config';
import { ThirdParty } from '../../../third-party/third-party';

import { DetailLogComponent } from './detail-log/detail-log.component';
import { sample } from 'rxjs-compat/operator/sample';


@Component({
  selector: 'log',
  styleUrls: ['./log.component.scss'],
  templateUrl: './log.component.html',
})
export class LogComponent implements OnInit {
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
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
      studentSign: {
        title: 'Chữ ký',
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
        title: 'Trạng thái',
        type: 'string',
        width: '15px'
      },
      codeUpdateBy: {
        title: "Mã người cập nhật",
        type: 'string'
      },
      nameUpdateBy: {
        title: "Người cập nhật",
        type: 'string'
      },
      timeUpdateBy: {
        title: "Thời gian sửa",
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  private state: string = Config.ACTIVE;

  constructor(private service: CetificateService, private modalService: NgbModal) {
  }

  ngOnInit() {
    this.onSearch();
  }

  onCustom(event) {
    this.service.dataItem = event.data;
    switch (event.action) {
      case Config.DETAIL_ACCTION:
        break;
      case Config.DELETE_ACTION:
        break;
      case Config.EDIT_ACTION:
        break;
      case Config.SMART_CONTRACTS_ACTION:
        break;
      default:
        break;
    }
  }

  onSearch() {
    this.state = Config.LOADING;
    this.service.getLogCeticateSmartContracts().subscribe(res => {
      if (res.status != 200) {
        console.log("Err: ", res.msg);
        this.state = Config.ACTIVE;
        return;
      }
      res.data.forEach(item => {
        item.codeUpdateBy = item.updateBy.id;
        item.nameUpdateBy = item.updateBy.name;
        item.timeUpdateBy = item.timeUpdate;
        switch (item.status) {
          case 1:
            item.strStatus = 'Đang phát hành';
            break;
          default:
            item.strStatus = 'Ngừng hoạt động';
        }
      });
      this.source.load(res.data);
      this.state = Config.ACTIVE;
    })
  }
}
