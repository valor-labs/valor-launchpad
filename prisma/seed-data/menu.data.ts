export interface Menu {
  name: string;
  key: string;
  icon?: string;
  route?: string;
  children?: Menu[];
}

export const menus: Menu[] = [
  {
    name: 'Pages',
    key: 'Pages',
    children: [
      {
        name: 'Dashboards',
        key: 'Pages_Dashboards',
        icon: 'fas fa-fw fa-sliders-h',
        children: [
          {
            name: 'Default',
            key: 'Pages_Dashboards_Default',
            route: '/dashboard-default',
          },
          {
            name: 'Analytics',
            key: 'Pages_Dashboards_Analytics',
            route: '/dashboard-analytics',
          },
          {
            name: 'SaaS',
            key: 'Pages_Dashboards_SaaS',
            route: '/dashboard-saas',
          },
          {
            name: 'Social',
            key: 'Pages_Dashboards_Social',
            route: '/dashboard-social',
          },
          {
            name: 'Crypto',
            key: 'Pages_Dashboards_Crypto',
            route: '/dashboard-crypto',
          },
        ],
      },
      {
        name: 'Pages',
        key: 'Pages_Pages',
        icon: 'far fa-window-maximize',
        children: [
          { name: 'Users', key: 'Pages_Pages_Users', route: '/users/listing' },
          { name: 'Profile', key: 'Pages_Pages_Profile', route: '/profile' },
          { name: 'Settings', key: 'Pages_Pages_Settings', route: '/settings' },
          { name: 'Clients', key: 'Pages_Pages_Clients', route: '/clients' },
          {
            name: 'Projects',
            key: 'Pages_Pages_Projects',
            children: [
              {
                name: 'List',
                key: 'Pages_Pages_Projects_List',
                route: '/projects-list',
              },
            ],
          },
          { name: 'Invoice', key: 'Pages_Pages_Invoice', route: '/invoice' },
          { name: 'Pricing', key: 'Pages_Pages_Pricing', route: '/pricing' },
          { name: 'Tasks', key: 'Pages_Pages_Tasks', route: '/tasks' },
          { name: 'Chat', key: 'Pages_Pages_Chat', route: '/chat' },
          { name: 'Blank', key: 'Pages_Pages_Blank', route: '/blank' },
          { name: 'Payments', key: 'Pages_Pages_Payments', route: '/payments' },
          { name: 'Notifications', key: 'Pages_Pages_Notifications', route: '/notifications' },
        ],
      },
      {
        name: 'Auth',
        key: 'Pages_Auth',
        icon: 'fas fa-fw fa-users',
        children: [
          { name: 'Sign In', key: 'Pages_Auth_Sign In', route: '/sign-in' },
          { name: 'Sign Up', key: 'Pages_Auth_Sign Up', route: '/sign-up' },
          {
            name: 'Reset Password',
            key: 'Pages_Auth_Reset Password',
            route: '/reset-password',
          },
          { name: '404 Page', key: 'Pages_Auth_404 Page', route: '/404' },
          { name: '500 Page', key: 'Pages_Auth_500 Page', route: '/500' },
        ],
      },
      {
        name: 'Documentation',
        key: 'Pages_Documentation',
        icon: 'fas fa-fw fa-book-open',
        children: [
          {
            name: 'Introduction',
            key: 'Pages_Documentation_Introduction',
            route: '/docs/introduction',
          },
          {
            name: 'Getting Started',
            key: 'Pages_Documentation_Getting Started',
            route: '/docs/installation',
          },
          {
            name: 'Customization',
            key: 'Pages_Documentation_Customization',
            route: '/docs/customization',
          },
          {
            name: 'Plugins',
            key: 'Pages_Documentation_Plugins',
            route: '/docs/plugins',
          },
          {
            name: 'Changelog',
            key: 'Pages_Documentation_Changelog',
            route: '/docs/changelog',
          },
        ],
      },
    ],
  },
  {
    name: 'Tools & Components',
    key: 'Tools & Components',
    children: [
      {
        name: 'UI Elements',
        key: 'Tools & Components_UI Elements',
        icon: 'fas fa-fw fa-border-all',
        children: [
          {
            name: 'Alerts',
            key: 'Tools & Components_UI Elements_Alerts',
            route: '/ui-alerts',
          },
          {
            name: 'Color Palette',
            key: 'Tools & Components_UI Elements_Color Palette',
            route: '/ui-color-palette',
          },
          {
            name: 'Chips',
            key: 'Tools & Components_UI Elements_Chips',
            route: '/ui-chips',
          },
          {
            name: 'Buttons',
            key: 'Tools & Components_UI Elements_Buttons',
            route: '/ui-buttons',
          },
          {
            name: 'Cards',
            key: 'Tools & Components_UI Elements_Cards',
            route: '/ui-cards',
          },
          {
            name: 'Carousel',
            key: 'Tools & Components_UI Elements_Carousel',
            route: '/ui-carousel',
          },
          {
            name: 'Embed Video',
            key: 'Tools & Components_UI Elements_Embed Video',
            route: '/ui-embed-video',
          },
          {
            name: 'General',
            key: 'Tools & Components_UI Elements_General',
            route: '/ui-general',
          },
          {
            name: 'Grid',
            key: 'Tools & Components_UI Elements_Grid',
            route: '/ui-grid',
          },
          {
            name: 'Modals',
            key: 'Tools & Components_UI Elements_Modals',
            route: '/ui-modals',
          },
          {
            name: 'Offcanvas',
            key: 'Tools & Components_UI Elements_Offcanvas',
            route: '/ui-offcanvas',
          },
          {
            name: 'Tabs',
            key: 'Tools & Components_UI Elements_Tabs',
            route: '/ui-tabs',
          },
          {
            name: 'Typography',
            key: 'Tools & Components_UI Elements_Typography',
            route: '/ui-typography',
          },
        ],
      },
      {
        name: 'Font Awesome',
        icon: 'far fa-heart',
        key: 'Tools & Components_Font Awesome',
        route: '/font-awesome',
      },
      {
        name: 'Forms',
        key: 'Tools & Components_Forms',
        icon: 'fas fa-fw fa-check-square',
        children: [
          {
            name: 'Layouts',
            key: 'Tools & Components_Forms_Layouts',
            route: '/forms-layouts',
          },
          {
            name: 'Basic Inputs',
            key: 'Tools & Components_Forms_Basic Inputs',
            route: '/forms-basic-inputs',
          },
          {
            name: 'Input Groups',
            key: 'Tools & Components_Forms_Input Groups',
            route: '/forms-input-groups',
          },
          {
            name: 'Floating Labels',
            key: 'Tools & Components_Forms_Floating Labels',
            route: '/forms-floating-labels',
          },
        ],
      },
      {
        key: 'Tools & Components_Tables',
        name: 'Tables',
        icon: 'fas fa-fw fa-list',
        route: '/tables',
      },
    ],
  },
  {
    name: 'Plugin & Addons',
    key: 'Plugin & Addons',
    children: [
      {
        name: 'Form Plugins',
        key: 'Plugin & Addons_Form Plugins',
        icon: 'fas fa-fw fa-check-square',
        children: [
          {
            name: 'Advanced Inputs',
            key: 'Plugin & Addons_Form Plugins_Advanced Inputs',
            route: '/forms-advanced-inputs',
          },
          {
            name: 'Editors',
            key: 'Plugin & Addons_Form Plugins_Editors',
            route: '/forms-editors',
          },
          {
            name: 'Validation',
            key: 'Plugin & Addons_Form Plugins_Validation',
            route: '/forms-validation',
          },
          {
            name: 'Wizard',
            key: 'Plugin & Addons_Form Plugins_Wizard',
            route: '/forms-wizard',
          },
        ],
      },
      {
        name: 'DataTables',
        key: 'Plugin & Addons_DataTables',
        icon: 'fas fa-fw fa-list',
        children: [
          {
            name: 'Responsive Table',
            key: 'Plugin & Addons_DataTables_Responsive Table',
            route: '/responsive-table',
          },
          {
            name: 'Table with Buttons',
            key: 'Plugin & Addons_DataTables_Table with Buttons',
            route: '/buttons-table',
          },
          {
            name: 'Column Search',
            key: 'Plugin & Addons_DataTables_Column Search',
            route: '/column-search-table',
          },
          {
            name: 'Fixed Header',
            key: 'Plugin & Addons_DataTables_Fixed Header',
            route: '/fixed-header-table',
          },
          {
            name: 'Multi Selection',
            key: 'Plugin & Addons_DataTables_Multi Selection',
            route: '/multi-select-table',
          },
          {
            name: 'Ajax Sourced Data',
            key: 'Plugin & Addons_DataTables_Ajax Sourced Data',
            route: '/ajax-sourced-table',
          },
        ],
      },
      {
        name: 'Charts',
        key: 'Plugin & Addons_Charts',
        icon: 'fas fa-fw fa-chart-pie',
        children: [
          {
            name: 'Chart.js',
            key: 'Plugin & Addons_Charts_Chart.js',
            route: '/charts',
          },
          {
            name: 'ApexCharts',
            key: 'Plugin & Addons_Charts_ApexCharts',
            route: '/apexcharts',
          },
        ],
      },
      {
        name: 'Notifications',
        key: 'Plugin & Addons_Notifications',
        icon: 'far fa-fw fa-bell',
        route: '/ui-notification',
      },
      {
        name: 'Maps',
        key: 'Plugin & Addons_Maps',
        icon: 'fas fa-fw fa-map-pin',
        children: [
          {
            name: 'Google Maps',
            key: 'Plugin & Addons_Maps_Google Maps',
            route: '/ui-maps-google',
          },
          {
            name: 'Vector Maps',
            key: 'Plugin & Addons_Maps_Vector Maps',
            route: '/maps-vector',
          },
        ],
      },
      {
        name: 'Calendar',
        key: 'Plugin & Addons_Calendar',
        icon: 'far fa-fw fa-calendar',
        route: '/calendar',
      },
    ],
  },
];

export const megaMenus: Menu[] = [
  {
    name: 'UI Elements',
    key: 'Mega_UI Elements',
    children: [
      { name: 'Alerts', key: 'Mega_UI Elements_Alerts', route: '/ui-alerts' },
      { name: 'Chips', key: 'Mega_UI Elements_Chips', route: '/ui-chips' },
      { name: 'Cards', key: 'Mega_UI Elements_Cards', route: '/ui-cards' },
      {
        name: 'Buttons',
        key: 'Mega_UI Elements_Buttons',
        route: '/ui-buttons',
      },
    ],
  },
  {
    name: 'Pages',
    key: 'Mega_Pages',
    children: [
      { name: 'Users', key: 'Mega_Pages_Users', route: '/users/listing' },
      { name: 'Profile', key: 'Mega_Pages_Profile', route: '/profile' },
      { name: 'Settings', key: 'Mega_Pages_Settings', route: '/settings' },
      { name: 'Clients', key: 'Mega_Pages_Clients', route: '/clients' },
    ],
  },
];
