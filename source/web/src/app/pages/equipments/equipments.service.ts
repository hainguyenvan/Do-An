import { Injectable } from '@angular/core';

@Injectable()
export class EquipmentsService {

  data = [
    {
      serial_number: 'Serial Number 1',
      equipment_type: 'Equipment Type 1',
      equipment_name: 'Equipment Name 1',
      capacity: 'Capacity 1',
      electric: 'Electric 1',
      entrance_date: 'Entrance date 1',
      owner: 'Owner 1',
      position: 'Position 1',
      state: 'State 1'
    },
    {
      serial_number: 'Serial Number 2',
      equipment_type: 'Equipment Type 2',
      equipment_name: 'Equipment Name 2',
      capacity: 'Capacity 2',
      electric: 'Electric 2',
      entrance_date: 'Entrance date 2',
      owner: 'Owner 2',
      position: 'Position 2',
      state: 'State 2'
    },
    {
      serial_number: 'Serial Number 3',
      equipment_type: 'Equipment Type 3',
      equipment_name: 'Equipment Name 3',
      capacity: 'Capacity 3',
      electric: 'Electric 3',
      entrance_date: 'Entrance date 3',
      owner: 'Owner 3',
      position: 'Position 3',
      state: 'State 3'
    }
  ];

  getData() {
    return this.data;
  }
}
