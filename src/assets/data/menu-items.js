export const MENU_ITEMS = [{
  key: 'menu',
  label: 'MENU',
  isTitle: true
}, {
  key: 'dashboards',
  label: 'dashboard',
  icon: 'solar:widget-2-outline',
  url: '/dashboards',
  badge: {
    text: 'New',
    variant: 'primary'
  }
},

// ====================Basic Information===============
{
  key: 'basic-info',
  label: 'Basic info',
  isTitle: true
}, 
// ====================user===============
{
  key: 'user',
  label: 'Users',
  icon: "solar:user-linear",
  children: [{
    key: 'list-users',
    label: 'List Users',
    url: '/user/list',
    parentKey: 'user'
  },{
    key: 'add-users',
    label: 'Add User',
    url: '/user/add',
    parentKey: 'user'
  }]
},
{
  key: 'features',
  label: 'Features',
  icon: "solar:database-outline",
  children: [{
    key: 'list-features',
    label: 'List Features',
    url: '/features/list',
    parentKey: 'features'
  },{
    key: 'add-feature',
    label: 'Add Feature',
    url: '/features/add',
    parentKey: 'features'
  },{
    key: 'add-sub-feature',
    label: 'Add Sub Feature',
    url: '/features/addSub',
    parentKey: 'features'
  }]
},
{
  key: 'properties',
  label: 'Properties',
  icon: "solar:home-linear",
  children: [{
    key: 'list-properties',
    label: 'List Properties',
    url: '/properties/list',
    parentKey: 'properties'
  },{
    key: 'add-property',
    label: 'Add Property',
    url: '/properties/add',
    parentKey: 'properties'
  }]
}];