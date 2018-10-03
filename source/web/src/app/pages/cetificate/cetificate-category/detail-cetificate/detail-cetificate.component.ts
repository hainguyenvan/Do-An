import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CetificateService } from '../../cetificate.service';

@Component({
  selector: 'detail-cetificate',
  styleUrls: ['./detail-cetificate.component.scss'],
  templateUrl: './detail-cetificate.component.html',
})

export class DetailCetificateComponent implements OnInit {


  private modalHeader: string;
  private cetificate: any = {};

  constructor(private activeModal: NgbActiveModal, private service: CetificateService) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin chi tiết';
    this.cetificate = this.service.dataItem;
  }

  closeModal() {
    this.activeModal.close();
  }
}
