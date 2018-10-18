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
  public cetificate: any;
  public showCertificate:boolean;

  constructor(private activeModal: NgbActiveModal, private service: CetificateService) { }

  ngOnInit() {
    if (!this.showCertificate) {
      this.modalHeader = 'Thông tin chứng chỉ';
      this.cetificate = this.service.dataItem;
    }
  }

  closeModal() {
    this.activeModal.close();
  }
}
