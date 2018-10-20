import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SupportService } from '../support.service';
import { Config } from '../../../config';
import { FileUploader } from 'ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../modal/modal-message.component';
import { ThirdParty } from '../../../third-party/third-party';

@Component({
  selector: 'add-support',
  styleUrls: ['./add-support.component.scss'],
  templateUrl: './add-support.component.html',
})

export class AddSupportComponent implements OnInit {

  public sexList: any = [
    { id: 0, value: 'Nam' },
    { id: 1, value: 'Nữ' },
    { id: -1, value: 'Khác' }
  ];
  public statusList: any = [
    { id: 0, value: 'Hoạt động' },
    { id: -1, value: 'Ngừng hoạt động' }
  ];

  public uploader: FileUploader = new FileUploader({ url: Config.API_UPLOAD });
  private chosenFile: string;
  private flagWarringNullImage: boolean = true;

  public modalHeader: string;
  public user: any = {};
  public actionEdit: boolean;

  constructor(private activeModal: NgbActiveModal,
    private service: SupportService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.modalHeader = 'Thêm support';

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
      this.modalHeader = 'Cập nhật support';
      this.actionEdit = true;
      this.user = this.service.accountItem;
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  addSupport() {
    this.user.sex = Number(this.user.sex);
    this.service.addSupport(this.user).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log("Err : ", res.msg);
        return;
      }
    });
    this.activeModal.close(Config.EVENT_SUBMIT);
  }

  updateSupport() {
    this.user.status = Number(this.user.status);
    this.service.updateSupport(this.user).subscribe(res => {
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
    if (this.flagWarringNullImage) {
      if (this.user.img != null) {
        return true;
      }
      this.showModalMessage('Hình ảnh là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.name)) {
      this.showModalMessage('Tên của support là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.phone)) {
      this.showModalMessage('Số điện thoaị của support là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.email)) {
      this.showModalMessage('Email là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.sex)) {
      this.showModalMessage('Giới tính là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.company)) {
      this.showModalMessage('Nơi làm việc là bặt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.positionDsc)) {
      this.showModalMessage('Chức vụ là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.dsc)) {
      this.showModalMessage('Mô tả là bắt buộc');
      return false;
    }

    return true;
  }

  onSubmit() {
    if (!this.isValidateForm()) {
      this.activeModal.close(Config.EVENT_CLOSE);
      return;
    }

    if(this.flagWarringNullImage) {
      if (this.actionEdit) {
        this.updateSupport();
        return;
      }
      this.addSupport();
    } else {
      this.uploader.uploadItem(this.uploader.queue[this.uploader.queue.length - 1]);
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        var responsePath = JSON.parse(response);
        this.user.img = responsePath.data.img;
        if (this.actionEdit) {
          this.updateSupport();
          return;
        }
        this.addSupport();
      }
    }
  }
}
