import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'detail-category',
  styleUrls: ['./detail-category.component.scss'],
  templateUrl: './detail-category.component.html',
})

export class DetailCategoryComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin chi tiết';
  }

  closeModal() {
    this.activeModal.close();
  }
}
