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

  public categoryList: any = [];
  public statusList: any = [
    { id: 0, value: 'Chưa phát hành' },
    { id: 1, value: 'Phát hành' },
    { id: -1, value: 'Đã xóa' }
  ];
  public positionList: any = [
    { value: 'Gioi' },
    { value: 'Kha' },
    { value: 'Trung Binh' }
  ];

  public studentList: any = [];

  public modalHeader: string;
  public cetificate: any = {};
  public actionEdit: boolean;

  constructor(private activeModal: NgbActiveModal, private service: CetificateService) {
  }

  ngOnInit() {
    this.modalHeader = 'Thêm chứng chỉ';

    // Get all position
    this.service.getAllCeticateCategory().subscribe(res => {
      if (res.status != 200) {
        console.log("Err : ", res.msg);
        return;
      }
      this.categoryList = res.data;
    });

    this.service.getStudentActive().subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        return;
      }
      this.studentList = res.data;
    })

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
    this.cetificate.status = 101;
    this.service.addCeticateList(this.cetificate).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log('Err: ', res.msg);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  update() {
    this.cetificate.status = 101;
    this.service.updateCeticateList(this.cetificate).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log('Err: ', res.msg);
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
