import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoryService } from './category.service';
import { takeWhile } from 'rxjs/operators/takeWhile';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AddCategoryComponent } from './add-category/add-category.component';
import { DetailCategoryComponent } from './detail-category/detail-category.component';

import { Config } from '../../config';

@Component({
  selector: 'category',
  styleUrls: ['./category.component.scss'],
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {
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
        title: 'STT',
        type: 'number',
        width: '10px'
      },
      serial_number: {
        title: 'Mã danh mục',
        type: 'string',
      },
      equipment_type: {
        title: 'Tên danh mục',
        type: 'string',
      },
      equipment_name: {
        title: 'Người tạo',
        type: 'string',
      },
      position: {
        title: 'Ngày tạo',
        type: 'string',
      },
      working_hours: {
        title: 'Người cập nhật',
        type: 'number',
      },
      material_consumable: {
        title: 'Ngày cập nhật',
        type: 'string',
      },
      date: {
        title: 'Trạng thái',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: CategoryService, private modalService: NgbModal) {
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
    const activeModal = this.modalService.open(DetailCategoryComponent, { size: 'lg', container: 'nb-layout' });
  }



  showModalAddEquipments() {
    const activeModal = this.modalService.open(AddCategoryComponent, { size: 'lg', container: 'nb-layout' });
  }
}
