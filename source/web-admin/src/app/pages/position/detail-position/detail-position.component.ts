import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PositionService } from '../position.service';

@Component({
  selector: 'detail-position',
  styleUrls: ['./detail-position.component.scss'],
  templateUrl: './detail-position.component.html',
})

export class DetailPositionComponent implements OnInit {

  private modalHeader: string;
  private position: any = {};

  constructor(private activeModal: NgbActiveModal, private service: PositionService) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin chi tiết';
    this.position = this.service.positionItem;
  }

  closeModal() {
    this.activeModal.close();
  }
}
