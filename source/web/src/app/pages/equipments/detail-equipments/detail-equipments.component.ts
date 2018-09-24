import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'detail-equipments',
  styleUrls: ['./detail-equipments.component.scss'],
  templateUrl: './detail-equipments.component.html',
})

export class DetailEquipmentsComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Equipment Detail';
  }

  closeModal() {
    this.activeModal.close();
  }
}
