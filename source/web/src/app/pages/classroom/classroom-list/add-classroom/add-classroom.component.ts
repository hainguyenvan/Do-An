import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from '../../classrom.service';
import { Config } from '../../../../config';

@Component({
  selector: 'add-classroom',
  styleUrls: ['./add-classroom.component.scss'],
  templateUrl: './add-classroom.component.html',
})

export class AddClassroomComponent implements OnInit {

  public statusList: any = [
    { id: 0, value: 'Hoạt động' },
    { id: -1, value: 'Ngừng hoạt động' }
  ];
  
  public modalHeader: string;
  public classroom: any = {};
  public actionEdit: boolean;

  constructor(private activeModal: NgbActiveModal, private service: ClassroomService) { }

  ngOnInit() {
    this.modalHeader = 'Thêm lớp học';

    if (this.service.acction == Config.EDIT_ACTION) {
      this.modalHeader = 'Cập nhật thông tin lớp học';
      this.actionEdit = true;
      this.classroom = this.service.dataItem;
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  addClassroom() {
    this.service.addClassroom(this.classroom).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log("Err : ", res.msg);
        return;
      }
    });
    this.activeModal.close(Config.EVENT_SUBMIT);
  }

  updateClassroom() {
    this.service.upadateClassroom(this.classroom).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log("Err : ", res.msg);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    })
  }

  onSubmit() {
    if (this.actionEdit) {
      this.updateClassroom();
      return;
    }
    this.addClassroom();
  }
}
