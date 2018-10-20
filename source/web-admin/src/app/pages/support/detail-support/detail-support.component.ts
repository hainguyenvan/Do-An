import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SupportService } from '../support.service';

@Component({
  selector: 'detail-support',
  styleUrls: ['./detail-support.component.scss'],
  templateUrl: './detail-support.component.html',
})

export class DetailSupportComponent implements OnInit {

  private modalHeader: string;
  public account: any;

  constructor(private activeModal: NgbActiveModal, private service: SupportService) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin tài khoản';
    this.account = this.service.accountItem;
  }

  closeModal() {
    this.activeModal.close();
  }
}
