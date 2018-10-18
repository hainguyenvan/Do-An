import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClassroomService } from '../../classrom.service';

@Component({
  selector: 'detail-study',
  styleUrls: ['./detail-study.component.scss'],
  templateUrl: './detail-study.component.html',
})

export class DetailStudyComponent implements OnInit {

  private modalHeader: string;
  public account: any;

  constructor(private activeModal: NgbActiveModal, private service: ClassroomService) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin sinh viên';
    this.account = this.service.dataItem;
  }

  closeModal() {
    this.activeModal.close();
  }
}
