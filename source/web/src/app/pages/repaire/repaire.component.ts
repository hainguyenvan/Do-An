import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RepaireService } from './repaire.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../third-party/config';

import { AddRepaireHistoryComponent } from './add-repaire/add-repaire.component';
import { DetailRepaireComponent } from './detail-repaire/detail-repaire.component';

@Component({
  selector: 'repaire',
  styleUrls: ['./repaire.component.scss'],
  templateUrl: './repaire.component.html',
})
export class RepaireComponent implements OnInit {
  settings = {
    actions: {
      delete: false,
      add: false,
      edit: false,
      custom: [
        {
          name: 'detail',
          title: '<i class="fas fa-eye"></i>'
        },
        {
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>'
        }
      ]
    },
    columns: {
      no: {
        title: 'No',
        type: 'number',
        width: '10px'
      },
      serial_number: {
        title: 'Serial Number',
        type: 'string',
      },
      equipment_type: {
        title: 'Equipment Type',
        type: 'string',
      },
      equipment_name: {
        title: 'Equipment Name',
        type: 'string',
      },
      position: {
        title: 'Required date',
        type: 'string',
      },
      working_hours: {
        title: 'Completed date',
        type: 'number',
        width: '15px'
      },
      material_consumable: {
        title: 'Repair Type',
        type: 'string',
      },
      date: {
        title: 'Remark',
        type: 'string',
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: RepaireService, private modalService: NgbModal) {
  }

  ngOnInit() {
    const data = this.service.getData();
    this.source.load(data);
  }

  onCustom(event) {
    switch (event.action) {
      case Config.DETAIL_ACCTION:
        this.showModalDeatailEquipments();
        break;
      default:
        break;
    }
  }

  showModalDeatailEquipments() {
    const activeModal = this.modalService.open(DetailRepaireComponent, { size: 'lg', container: 'nb-layout' });
  }



  showModalAddEquipments() {
    const activeModal = this.modalService.open(AddRepaireHistoryComponent, { size: 'lg', container: 'nb-layout' });
  }
}
