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

  },
  {
    path: '/add-numbers-success/',
    name: 'AddNumbersSuccess',
    component: () =>
        import(/* webpackChunkName: "Examples" */ './pages/AddNumbersSuccess.vue'),

  }
]
