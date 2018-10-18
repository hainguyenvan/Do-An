import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../account.service';

@Component({
  selector: 'detail-account',
  styleUrls: ['./detail-account.component.scss'],
  templateUrl: './detail-account.component.html',
})

export class DetailAccountComponent implements OnInit {

  private modalHeader: string;
  public account: any;

  constructor(private activeModal: NgbActiveModal, private service: AccountService) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin tài khoản';
    this.account = this.service.accountItem;
  }

  closeModal() {
    this.activeModal.close();
  }
}
