import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from '../../classrom.service';
import { Config } from '../../../../config';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'add-classroom',
  styleUrls: ['./add-classroom.component.scss'],
  templateUrl: './add-classroom.component.html',
})

export class AddClassroomComponent implements OnInit {

  public sexList: any = [
    { id: 0, value: 'Nam' },
    { id: 1, value: 'Nữ' },
    { id: -1, value: 'Khác' }
  ];
  public statusList: any = [
    { id: 0, value: 'Hoạt động' },
    { id: -1, value: 'Ngừng hoạt động' }
  ];
  public positionList: any = [];

  public uploader: FileUploader = new FileUploader({ url: Config.API_UPLOAD });
  private chosenFile: string;
  private flagWarringNullImage: boolean = true;

  public modalHeader: string;
  public user: any = {};
  public actionEdit: boolean;

  constructor(private activeModal: NgbActiveModal, private service: ClassroomService) { }

  ngOnInit() {
    this.modalHeader = 'Thêm tài khoản';

    // Set access allow origin header
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
    this.uploader.onAfterAddingFile = (item) => {
      this.uploader.clearQueue();
      this.uploader.queue.push(item);
      this.chosenFile = item.file.name;
      this.flagWarringNullImage = false;
    }

    if (this.service.acction == Config.EDIT_ACTION) {
      this.modalHeader = 'Cập nhật tài khoản';
      this.actionEdit = true;
      this.user = this.service.dataItem;
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  addAccount() {
    // this.user.sex = Number(this.user.sex);
    // this.service.addAccount(this.user).subscribe(res => {
    //   if (res.status != 200) {
    //     this.activeModal.close(Config.EVENT_CLOSE);
    //     console.log("Err : ", res.msg);
    //     return;
    //   }
    // });
    // this.activeModal.close(Config.EVENT_SUBMIT);
  }

  updateAccount() {
    // this.user.status = Number(this.user.status);
    // this.user.password = this.user.password == '' ? this.user.curentPassword : this.user.password;
    // this.service.updateAccount(this.user).subscribe(res => {
    //   if (res.status != 200) {
    //     this.activeModal.close(Config.EVENT_CLOSE);
    //     console.log("Err : ", res.msg);
    //     return;
    //   }
    //   this.activeModal.close(Config.EVENT_SUBMIT);
    // })
  }

  onSubmit() {
    if (this.flagWarringNullImage) {
      if (this.actionEdit) {
        this.updateAccount();
        return;
      }
      this.addAccount();
      return;
    }

    this.uploader.uploadItem(this.uploader.queue[this.uploader.queue.length - 1]);
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.user.img = responsePath.data.img;
      if (this.actionEdit) {
        this.updateAccount();
        return;
      }
      this.addAccount();
    }
  }
}
