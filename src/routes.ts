export default [

  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "Examples" */ './pages/Home.vue'),
  },
  {
    path: '/locations/:number',
    name: 'Location',
    component: () =>
      import(/* webpackChunkName: "Examples" */ './pages/Location.vue'),

  }]