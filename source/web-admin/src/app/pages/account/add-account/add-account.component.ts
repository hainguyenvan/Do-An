import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../account.service';
import { Config } from '../../../config';
import { FileUploader } from 'ng2-file-upload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../modal/modal-message.component';
import { ThirdParty } from '../../../third-party/third-party';

@Component({
  selector: 'add-account',
  styleUrls: ['./add-account.component.scss'],
  templateUrl: './add-account.component.html',
})

export class AddAccountComponent implements OnInit {

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

  constructor(private activeModal: NgbActiveModal,
    private service: AccountService,
    private modalService: NgbModal) { }

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

    // Get all position
    this.service.getAllPosition().subscribe(res => {
      if (res.status != 200) {
        console.log("Err : ", res.msg);
        return;
      }
      this.positionList = res.data;
    });

    if (this.service.acction == Config.EDIT_ACTION) {
      this.modalHeader = 'Cập nhật tài khoản';
      this.actionEdit = true;
      this.user = this.service.accountItem;
      this.user.curentPassword = this.user.password;
      this.user.password = '';
    }
  }

  onImgChange(event: any) {
    // Upload image to DB
    this.uploader.uploadItem(this.uploader.queue[this.uploader.queue.length - 1]);
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      var responsePath = JSON.parse(response);
      this.user.img = responsePath.data.img;
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  addAccount() {
    this.user.sex = Number(this.user.sex);
    this.service.addAccount(this.user).subscribe(res => {
      if (res.status != 200) {
        this.activeModal.close(Config.EVENT_CLOSE);
        console.log("Err : ", res.msg);
        return;
      }
    });
    this.activeModal.close(Config.EVENT_SUBMIT);
  }

  updateAccount() {
    this.user.status = Number(this.user.status);
    this.user.password = this.user.password == '' ? this.user.curentPassword : this.user.password;
    this.service.updateAccount(this.user).subscribe(res => {
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

    if (ThirdParty.isNull(this.user.name)) {
      this.showModalMessage('Tên của tài khoản là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.code)) {
      this.showModalMessage('Mã giảng viên là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.email)) {
      this.showModalMessage('Email là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.dateOfBirth)) {
      this.showModalMessage('Ngày sinh là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.sex)) {
      this.showModalMessage('Giới tính là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.phone)) {
      this.showModalMessage('Số điện thoại là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.position)) {
      this.showModalMessage('Chức vụ là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.address)) {
      this.showModalMessage('Địa chỉ là bắt buộc');
      return false;
    }

    if (ThirdParty.isNull(this.user.dsc)) {
      this.showModalMessage('Mô tả là bắt buộc');
      return false;
    }

    if (this.actionEdit) {
      if (!ThirdParty.isNull(this.user.password) && this.user.password != this.user.rePassword) {
        this.showModalMessage('Mật khẩu không đúng');
        return false;
      }
    } else {
      if (ThirdParty.isNull(this.user.password) || this.user.password != this.user.rePassword) {
        this.showModalMessage('Mật khẩu không đúng');
        return false;
      }
    }

    return true;
  }

  onSubmit() {
    if (!this.isValidateForm()) {
      this.activeModal.close(Config.EVENT_CLOSE);
      return;
    }
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
