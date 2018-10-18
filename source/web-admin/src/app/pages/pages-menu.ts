import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Quản lý tài khoản',
    icon: 'nb-person',
    link: '/pages/account',
  },
  {
    title: 'Quản lý chức vụ',
    icon: 'nb-grid-a',
    link: '/pages/position',
  },
  {
    title: 'DS sinh viên',
    icon: 'nb-list',
    link: '/pages/students',
  },
  {
    title: 'Quản lý lớp học',
    icon: 'nb-compose',
    children: [
      {
        title: 'Danh sách lớp học',
        link: '/pages/classroom-list',
      },
      {
        title: 'Quản lý đào tạo',
        link: '/pages/study-manager',
      }
    ]
  },
  {
    title: 'Chứng chỉ',
    icon: 'nb-keypad',
    children: [
      {
        title: 'Danh mục chứng chỉ',
        link: '/pages/cetificate-category',
      },
      {
        title: 'DS chứng chỉ',
        link: '/pages/cetificate-list',
      },
      {
        title: 'Lịch sử  cập nhật',
        link: '/pages/cetificate-log',
      }
    ]
    // },
    // {
    //   title: 'E-commerce',
    //   icon: 'nb-e-commerce',
    //   link: '/pages/dashboard',
    //   home: true,
    // },
    // {
    //   title: 'IoT Dashboard',
    //   icon: 'nb-home',
    //   link: '/pages/iot-dashboard',
    // },
    // {
    //   title: 'FEATURES',
    //   group: true,
    // },
    // {
    //   title: 'UI Features',
    //   icon: 'nb-keypad',
    //   link: '/pages/ui-features',
    //   children: [
    //     {
    //       title: 'Buttons',
    //       link: '/pages/ui-features/buttons',
    //     },
    //     {
    //       title: 'Grid',
    //       link: '/pages/ui-features/grid',
    //     },
    //     {
    //       title: 'Icons',
    //       link: '/pages/ui-features/icons',
    //     },
    //     {
    //       title: 'Modals',
    //       link: '/pages/ui-features/modals',
    //     },
    //     {
    //       title: 'Popovers',
    //       link: '/pages/ui-features/popovers',
    //     },
    //     {
    //       title: 'Typography',
    //       link: '/pages/ui-features/typography',
    //     },
    //     {
    //       title: 'Animated Searches',
    //       link: '/pages/ui-features/search-fields',
    //     },
    //     {
    //       title: 'Tabs',
    //       link: '/pages/ui-features/tabs',
    //     },
    //   ],
    // },
    // {
    //   title: 'Forms',
    //   icon: 'nb-compose',
    //   children: [
    //     {
    //       title: 'Form Inputs',
    //       link: '/pages/forms/inputs',
    //     },
    //     {
    //       title: 'Form Layouts',
    //       link: '/pages/forms/layouts',
    //     },
    //   ],
    // },
    // {
    //   title: 'Components',
    //   icon: 'nb-gear',
    //   children: [
    //     {
    //       title: 'Tree',
    //       link: '/pages/components/tree',
    //     }, {
    //       title: 'Notifications',
    //       link: '/pages/components/notifications',
    //     },
    //   ],
    // },
    // {
    //   title: 'Maps',
    //   icon: 'nb-location',
    //   children: [
    //     {
    //       title: 'Google Maps',
    //       link: '/pages/maps/gmaps',
    //     },
    //     {
    //       title: 'Leaflet Maps',
    //       link: '/pages/maps/leaflet',
    //     },
    //     {
    //       title: 'Bubble Maps',
    //       link: '/pages/maps/bubble',
    //     },
    //     {
    //       title: 'Search Maps',
    //       link: '/pages/maps/searchmap',
    //     },
    //   ],
    // },
    // {
    //   title: 'Charts',
    //   icon: 'nb-bar-chart',
    //   children: [
    //     {
    //       title: 'Echarts',
    //       link: '/pages/charts/echarts',
    //     },
    //     {
    //       title: 'Charts.js',
    //       link: '/pages/charts/chartjs',
    //     },
    //     {
    //       title: 'D3',
    //       link: '/pages/charts/d3',
    //     },
    //   ],
    // },
    // {
    //   title: 'Editors',
    //   icon: 'nb-title',
    //   children: [
    //     {
    //       title: 'TinyMCE',
    //       link: '/pages/editors/tinymce',
    //     },
    //     {
    //       title: 'CKEditor',
    //       link: '/pages/editors/ckeditor',
    //     },
    //   ],
    // },
    // {
    //   title: 'Tables',
    //   icon: 'nb-tables',
    //   children: [
    //     {
    //       title: 'Smart Table',
    //       link: '/pages/tables/smart-table',
    //     },
    //   ],
    // },
    // {
    //   title: 'Miscellaneous',
    //   icon: 'nb-shuffle',
    //   children: [
    //     {
    //       title: '404',
    //       link: '/pages/miscellaneous/404',
    //     },
    //   ],
    // },
    // {
    //   title: 'Auth',
    //   icon: 'nb-locked',
    //   children: [
    //     {
    //       title: 'Login',
    //       link: '/auth/login',
    //     },
    //     {
    //       title: 'Register',
    //       link: '/auth/register',
    //     },
    //     {
    //       title: 'Request Password',
    //       link: '/auth/request-password',
    //     },
    //     {
    //       title: 'Reset Password',
    //       link: '/auth/reset-password',
    //     },
    //   ],
  }
];