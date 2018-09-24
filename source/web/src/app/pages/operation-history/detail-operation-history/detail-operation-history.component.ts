import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'detail-operation-history',
  styleUrls: ['./detail-operation-history.component.scss'],
  templateUrl: './detail-operation-history.component.html',
})

export class DetailOperationHistoryComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Equipment Detail';
  }

  closeModal() {
    this.activeModal.close();
  }
}
