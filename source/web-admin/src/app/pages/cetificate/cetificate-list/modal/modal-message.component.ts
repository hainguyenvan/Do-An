import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Config } from '../../../../config';

@Component({
  selector: 'modal-messge',
  styleUrls: ['./modal-message.component.scss'],
  templateUrl: './modal-message.component.html',
})

export class ModalMessageComponent implements OnInit {

  public modalHeader: String = '';
  public modalMessage: String = '';
  public statusButtonSubmit: boolean;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() { }

  closeModal() {
    this.activeModal.close();
    this.statusButtonSubmit = false;
  }

  onSubmit() {
    this.activeModal.close(Config.EVENT_SUBMIT);
    this.statusButtonSubmit = false;
  }
}
