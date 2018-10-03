import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OperationHistoryService } from './operation-history.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddOperationHistoryComponent } from './add-operation-history/add-operation-history.component';
import { DetailOperationHistoryComponent } from './detail-operation-history/detail-operation-history.component';

import { Config } from '../../config';

@Component({
  selector: 'button-view',
  styleUrls: ['./operation-history.component.scss'],
  template: `
    <button type="button" class="btn btn-warning btn-xs" (click)="onClick()">{{ renderValue }}</button>
  `,
})
export class ButtonStatusComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    this.save.emit(this.rowData);
  }
}

@Component({
  selector: 'operation-history',
  styleUrls: ['./operation-history.component.scss'],
  templateUrl: './operation-history.component.html',
})
export class OperationHistoryComponent implements OnInit {
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
        title: 'Position',
        type: 'string',
      },
      working_hours: {
        title: 'Working hours',
        type: 'number',
        width: '15px'
      },
      material_consumable: {
        title: 'Material consumable',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'string',
      },
      update_by: {
        title: 'Update by',
        type: 'string',
      },
      approved_by: {
        title: 'Approved by',
        type: 'string',
      },
      approved_status: {
        title: 'Approved Status',
        type: 'custom',
        renderComponent: ButtonStatusComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            alert(`${row.serial_number} saved!`)
          });
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: OperationHistoryService, private modalService: NgbModal) {
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
    const activeModal = this.modalService.open(DetailOperationHistoryComponent, { size: 'lg', container: 'nb-layout' });
  }



  showModalAddEquipments() {
    const activeModal = this.modalService.open(AddOperationHistoryComponent, { size: 'lg', container: 'nb-layout' });
  }
}
