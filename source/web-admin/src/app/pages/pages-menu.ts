import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Quản lý tài khoản',
    icon: 'nb-person',
    link: '/pages/account',
    data: ['Admin']
  },
  {
    title: 'Quản lý chức vụ',
    icon: 'nb-grid-a',
    link: '/pages/position',
    data: ['Admin']
  },
  {
    title: 'DS sinh viên',
    icon: 'nb-list',
    link: '/pages/students',
    data: ['Admin', 'Publicer', 'Teacher']
  },
  {
    title: 'Quản lý lớp học',
    icon: 'nb-compose',
    data: ['Admin', 'Publicer', 'Teacher'],
    children: [
      {
        title: 'Danh sách lớp học',
        link: '/pages/classroom-list',
        data: ['Admin', 'Publicer', 'Teacher']
      },
      {
        title: 'Quản lý đào tạo',
        link: '/pages/study-manager',
        data: ['Admin', 'Publicer', 'Teacher']
      }
    ]
  },
  {
    title: 'Chứng chỉ',
    icon: 'nb-keypad',
    data: ['Admin', 'Publicer', 'Teacher'],
    children: [
      {
        title: 'Danh mục chứng chỉ',
        link: '/pages/cetificate-category',
        data: ['Admin', 'Publicer', 'Teacher']
      },
      {
        title: 'DS chứng chỉ',
        link: '/pages/cetificate-list',
        data: ['Admin', 'Publicer', 'Teacher']
      },
      {
        title: 'Lịch sử  cập nhật',
        link: '/pages/cetificate-log',
        data: ['Admin', 'Publicer', 'Teacher']
      }
    ]
  },
  {
    title: 'Hỗ trợ',
    icon: 'ion-information',
    link: '/pages/support',
    data: ['Admin']
  },
];
