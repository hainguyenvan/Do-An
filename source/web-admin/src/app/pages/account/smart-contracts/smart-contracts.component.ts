import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Config } from '../../../config';
import { AccountService } from '../account.service';

@Component({
  selector: 'smart-contracts',
  styleUrls: ['./smart-contracts.component.scss'],
  templateUrl: './smart-contracts.component.html',
})

export class SmartContractsComponent implements OnInit {

  public statusList: any = [
    { id: 0, value: 'Cấp phép' },
    { id: -1, value: 'Ngừng cấp phép' }
  ];

  public modalHeader: string;
  public user: any;

  constructor(private activeModal: NgbActiveModal, private service: AccountService) { }

  ngOnInit() {
    this.modalHeader = 'Cấp quyền phát hành chứng chỉ';
    this.user = this.service.accountItem;
    if (this.user.publicPermission == undefined) {
      this.user.publicPermission = {};
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  insert() {
    let body = {
      id: this.user.code,
      name: this.user.name,
      sign: this.user.sign,
      account: Config.ACCOUNT
    }
    this.service.addAuthor(body).subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        this.activeModal.close(Config.EVENT_CLOSE);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  update() {
    let body = {
      index: this.user.publicPermission.index,
      status: this.user.publicPermission.status,
      account: Config.ACCOUNT
    }
    this.service.updateStatusAuthor(body).subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        this.activeModal.close(Config.EVENT_CLOSE);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  onSubmit() {
    if (this.user.publicPermission.id == undefined) {
      this.insert();
      return;
    }
    this.update();
  }
}
