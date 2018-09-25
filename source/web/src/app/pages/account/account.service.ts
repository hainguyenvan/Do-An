import { Injectable } from '@angular/core';

@Injectable()
export class AccountService {

  data = [
    {
      no: 1,
      serial_number: '122121',
      equipment_type: 'Equipment Type',
      equipment_name: 'Equipment Name',
      position: '1',
      working_hours: 1,
      material_consumable: '1',
      date: "21/09/2018",
      update_by: 'HaiNV',
      approved_by: 'HaiNV',
      approved_status: 'Pending'
    },
    {
      no: 1,
      serial_number: '122121',
      equipment_type: 'Equipment Type',
      equipment_name: 'Equipment Name',
      position: '1',
      working_hours: 1,
      material_consumable: '1',
      date: "21/09/2018",
      update_by: 'HaiNV',
      approved_by: 'HaiNV',
      approved_status: 'Approved'
    },
    {
      no: 1,
      serial_number: '122121',
      equipment_type: 'Equipment Type',
      equipment_name: 'Equipment Name',
      position: '1',
      working_hours: 1,
      material_consumable: '1',
      date: "21/09/2018",
      update_by: 'HaiNV',
      approved_by: 'HaiNV',
      approved_status: 'Approved'
    }
  ];

  getData() {
    return this.data;
  }
}
