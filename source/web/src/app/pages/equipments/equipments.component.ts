import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EquipmentsService } from './equipments.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Config } from '../../third-party/config';

import { AddEquipmentsComponent } from './add-equipments/add-equipments.component';
import { DetailEquipmentsComponent } from './detail-equipments/detail-equipments.component';

@Component({
  selector: 'button-view',
  styleUrls: ['./equipments.component.scss'],
  template: `
    <button type="button" class="btn btn-warning btn-xs" (click)="onClick()">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
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
  selector: 'equipments',
  styleUrls: ['./equipments.component.scss'],
  templateUrl: './equipments.component.html',
})
export class EquipmentsComponent implements OnInit {
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
      serial_number: {
        title: 'Serial Number',
        type: 'number',
      },
      equipment_type: {
        title: 'Equipment Type',
        type: 'string',
      },
      equipment_name: {
        title: 'Equipment Name',
        type: 'string',
      },
      capacity: {
        title: 'Capacity',
        type: 'string',
      },
      electric: {
        title: 'Electric',
        type: 'string',
      },
      entrance_date: {
        title: 'Entrance date',
        type: 'number',
      },
      owner: {
        title: 'Owner',
        type: 'number',
      },
      position: {
        title: 'Position',
        type: 'number',
      },
      state: {
        title: 'Sate',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            alert(`${row.serial_number} saved!`)
          });
        }
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: EquipmentsService, private modalService: NgbModal) {
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
    const activeModal = this.modalService.open(DetailEquipmentsComponent, { size: 'lg', container: 'nb-layout' });
  }



  showModalAddEquipments() {
    const activeModal = this.modalService.open(AddEquipmentsComponent, { size: 'lg', container: 'nb-layout' });
  }
}
