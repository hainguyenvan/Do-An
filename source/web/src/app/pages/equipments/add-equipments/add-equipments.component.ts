import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-equipments',
  styleUrls: ['./add-equipments.component.scss'],
  templateUrl: './add-equipments.component.html',
})

export class AddEquipmentsComponent implements OnInit {

  modalHeader: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.modalHeader = 'Add Equipments';
  }

  closeModal() {
    this.activeModal.close();
  }
}
