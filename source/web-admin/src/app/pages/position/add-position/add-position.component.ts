import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from '../position.service';
import { Config } from '../../../config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../modal/modal-message.component';
import { ThirdParty } from '../../../third-party/third-party';

@Component({
  selector: 'add-position',
  styleUrls: ['./add-position.component.scss'],
  templateUrl: './add-position.component.html',
})

export class AddPositionComponent implements OnInit {

  public statusList: any = [
    { id: 0, value: 'Hoạt động' },
    { id: -1, value: 'Ngừng hoạt động' }
  ];

  private modalHeader: string;
  public position: any = {};
  public actionEdit: boolean;

  constructor(private activeModal: NgbActiveModal,
    private service: PositionService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.modalHeader = 'Thêm chức vụ';

    if (this.service.acction == Config.EDIT_ACTION) {
      this.modalHeader = 'Cập nhật chức vụ';
      this.actionEdit = true;
      this.position = this.service.positionItem;
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  insert() {
    this.service.addPosition(this.position).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log('Err : ', res.mag);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  update() {
    this.position.status = Number(this.position.status);
    this.service.updatePosition(this.position).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log('Err : ', res.mag);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  showModalMessage(content) {
    const activeModal = this.modalService.open(ModalMessageComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Thông báo';
    activeModal.componentInstance.modalMessage = content;
    activeModal.componentInstance.statusColorHeader = true;
  }

  isValidateForm() {
    if (ThirdParty.isNull(this.position.dsc)) {
      this.showModalMessage('Tên chức vụ là bắt buộc');
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
      this.update();
      return;
    }
    this.insert();
  }

}
