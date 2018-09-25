import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-account',
  styleUrls: ['./add-account.component.scss'],
  templateUrl: './add-account.component.html',
})

export class AddAccountComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Thêm tài khoản';
  }

  closeModal() {
    this.activeModal.close();
  }
}
