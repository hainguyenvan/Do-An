import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Config } from '../../../../config';
import { CetificateService } from '../../cetificate.service';

@Component({
  selector: 'smart-contracts',
  styleUrls: ['./smart-contracts.component.scss'],
  templateUrl: './smart-contracts.component.html',
})

export class SmartContractsComponent implements OnInit {

  public modalHeader: string;
  public modalMessage: string;
  public user: any;
  public infoAccount: any;

  constructor(private activeModal: NgbActiveModal, private service: CetificateService) { }

  ngOnInit() {
    this.modalHeader = 'Thông báo';
    this.modalMessage = 'Bạn có muốn phát hành chứng chỉ';
    this.user = this.service.dataItem;

    let dataAccount = localStorage.getItem(Config.OJBJECT_KEY);
    this.infoAccount = JSON.parse(dataAccount);
    if (this.user.certificateSmartContracts === undefined) {
      this.modalMessage = 'Bạn có muốn phát hành chứng chỉ';
    } else {
      this.modalMessage = 'Bạn có muốn cập nhật bản phát hành';
    }
  }

  closeModal() {
    this.activeModal.close(Config.EVENT_CLOSE);
  }

  insert() {
    this.user.updateBy = this.infoAccount.authorSmartContracts.index;
    this.service.addCeticateSmartContracts(this.user).subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        this.activeModal.close(Config.EVENT_CLOSE);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  update() {
    this.user.index = this.user.certificateSmartContracts.index;
    this.user.updateBy = this.infoAccount.authorSmartContracts.index;
    this.user.status = 1;
    this.service.updateCeticateSmartContracts(this.user).subscribe(res => {
      if (res.status != 200) {
        console.log('Err : ', res.msg);
        this.activeModal.close(Config.EVENT_CLOSE);
        return;
      }
      this.activeModal.close(Config.EVENT_SUBMIT);
    });
  }

  onSubmit() {
    if (this.user.certificateSmartContracts === undefined) {
      this.insert();
      return;
    }
    this.update();
  }
}
