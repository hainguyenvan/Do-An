import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CetificateService } from '../../cetificate.service';
import { Config } from '../../../../config';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'add-cetificate',
  styleUrls: ['./add-cetificate.component.scss'],
  templateUrl: './add-cetificate.component.html',
})

export class AddCetificateComponent implements OnInit {

  public statusList: any = [
    { id: 0, value: 'Hoạt động' },
    { id: -1, value: 'Ngừng hoạt động' }
  ];

  public modalHeader: string;
  public cetificate: any = {};
  public actionEdit: boolean;

  constructor(private activeModal: NgbActiveModal, private service: CetificateService) { }

  ngOnInit() {
    this.modalHeader = 'Thêm chứng chỉ';

    if (this.service.acction == Config.EDIT_ACTION) {
      this.modalHeader = 'Cập nhật chứng chỉ';
      this.actionEdit = true;
      this.cetificate = this.service.dataItem;
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  insert() {
    this.service.addCeticateCategory(this.cetificate).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log('Err : ', res.mag);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  update() {
    this.cetificate.status =  Number(this.cetificate.status);
    this.service.updateCeticateCategory(this.cetificate).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log('Err : ', res.mag);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  onSubmit() {
    if (this.actionEdit) {
      this.update();
      return;
    }
    this.insert();
  }
}
