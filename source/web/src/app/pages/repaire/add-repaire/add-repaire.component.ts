import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-repaire',
  styleUrls: ['./add-repaire.component.scss'],
  templateUrl: './add-repaire.component.html',
})

export class AddRepaireHistoryComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Repaire/Maintenance';
  }

  closeModal() {
    this.activeModal.close();
  }
}
