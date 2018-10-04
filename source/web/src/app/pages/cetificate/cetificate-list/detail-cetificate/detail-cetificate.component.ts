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
  public account: any;

  constructor(private activeModal: NgbActiveModal, private service: CetificateService) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin tài khoản';
    this.account = this.service.dataItem;
  }

  closeModal() {
    this.activeModal.close();
  }
}
