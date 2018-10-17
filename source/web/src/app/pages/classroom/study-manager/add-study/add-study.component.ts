import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from '../../classrom.service';
import { Config } from '../../../../config';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'add-study',
  styleUrls: ['./add-study.component.scss'],
  templateUrl: './add-study.component.html',
})

export class AddStudyComponent implements OnInit {

  settings = {
    selectMode: 'multi',
    actions: {
      delete: false,
      add: false,
      edit: false,
      select: true,
    },
    columns: {
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
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  public classroomList: any = [];
  public modalHeader: string;
  public data: any = {};
  public actionEdit: boolean;

  constructor(private activeModal: NgbActiveModal, private service: ClassroomService) { }

  ngOnInit() {
    this.modalHeader = 'Quản lý đào tạo';

    // Get all classroom active
    this.service.getClassroomActive().subscribe(res => {
      if (res.status != 200) {
        console.log("Err : ", res.msg);
        return;
      }
      this.classroomList = res.data;
    });

    this.service.getStudentAvailable().subscribe(res => {
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
            item.strSex = 'Khác';
        }
        item.selected = 'Fucking';
      });
      this.source.load(res.data);
    });

    if (this.service.acction == Config.EDIT_ACTION) {
      this.modalHeader = 'Cập nhật thông tin đào tạo';
      this.actionEdit = true;
      this.data = this.service.dataItem;
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  onUserRowSelect(event) {
    this.data.students = event.selected;
  }

  onSubmit() {
    this.service.addStudyManager(this.data).subscribe(res => {
      if(res.status != 200) {
        console.log('Err : ', res.msg);
        return;
      }
    })
    this.activeModal.close(Config.EVENT_CLOSE);
  }
}
