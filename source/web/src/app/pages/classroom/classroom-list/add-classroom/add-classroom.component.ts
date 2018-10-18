import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from '../../classrom.service';
import { Config } from '../../../../config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../modal/modal-message.component';
import { ThirdParty } from '../../../../third-party/third-party';

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

  constructor(private activeModal: NgbActiveModal,
    private service: ClassroomService,
    private modalService: NgbModal) { }

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

  showModalMessage(content) {
    const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Thông báo';
    activeModal.componentInstance.modalMessage = content;
    activeModal.componentInstance.statusColorHeader = true;
  }

  isValidateForm() {
    if (ThirdParty.isNull(this.classroom.code)) {
      this.showModalMessage('Mã lớp học là bắt buộc');
      return false;
    }
    if (ThirdParty.isNull(this.classroom.dsc)) {
      this.showModalMessage('Mô tả lớp học là bắt buộc');
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.isValidateForm()) {
      this.activeModal.close(Config.EVENT_CLOSE);
      return;
    }
    if (this.actionEdit) {
      this.updateClassroom();
      return;
    }
    this.addClassroom();
  }
}
