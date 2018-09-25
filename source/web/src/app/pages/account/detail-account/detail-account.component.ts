import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'detail-account',
  styleUrls: ['./detail-account.component.scss'],
  templateUrl: './detail-account.component.html',
})

export class DetailAccountComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin tài khoản';
  }

  closeModal() {
    this.activeModal.close();
  }
}
