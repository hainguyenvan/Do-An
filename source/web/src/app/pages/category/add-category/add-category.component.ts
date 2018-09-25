import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-category',
  styleUrls: ['./add-category.component.scss'],
  templateUrl: './add-category.component.html',
})

export class AddCategoryComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Thêm danh mục';
  }

  closeModal() {
    this.activeModal.close();
  }
}
