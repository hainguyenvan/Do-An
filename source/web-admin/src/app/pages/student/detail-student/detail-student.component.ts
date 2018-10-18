import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../student.service';

@Component({
  selector: 'detail-student',
  styleUrls: ['./detail-student.component.scss'],
  templateUrl: './detail-student.component.html',
})

export class DetailStudentComponent implements OnInit {

  private modalHeader: string;
  public account: any;

  constructor(private activeModal: NgbActiveModal, private service: StudentService) { }

  ngOnInit() {
    this.modalHeader = 'Thông tin tài khoản';
    this.account = this.service.dataItem;
  }

  closeModal() {
    this.activeModal.close();
  }
}
