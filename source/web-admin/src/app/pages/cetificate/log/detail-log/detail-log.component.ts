import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CetificateService } from '../../cetificate.service';

@Component({
  selector: 'detail-log',
  styleUrls: ['./detail-log.component.scss'],
  templateUrl: './detail-log.component.html',
})

export class DetailLogComponent implements OnInit {

  private modalHeader: string;
  public cetificate: any;

  constructor(private activeModal: NgbActiveModal, private service: CetificateService) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin tài khoản';
    this.cetificate = this.service.dataItem;
  }

  closeModal() {
    this.activeModal.close();
  }
}
