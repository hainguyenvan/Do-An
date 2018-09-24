import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'detail-repaire',
  styleUrls: ['./detail-repaire.component.scss'],
  templateUrl: './detail-repaire.component.html',
})

export class DetailRepaireComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Equipment Detail';
  }

  closeModal() {
    this.activeModal.close();
  }
}
