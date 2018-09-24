import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-operation-history',
  styleUrls: ['./add-operation-history.component.scss'],
  templateUrl: './add-operation-history.component.html',
})

export class AddOperationHistoryComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Add Equipments';
  }

  closeModal() {
    this.activeModal.close();
  }
}
