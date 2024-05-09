export default [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "Examples" */ './pages/Home.vue'),
  },
  {
    path: '/locations/client',
    name: 'Client',
    component: () =>
      import(/* webpackChunkName: "Examples" */ './pages/Client.vue'),
  },
  {
    path: '/check-numbers',
    name: 'CheckNumbers',
    component: () =>
      import(/* webpackChunkName: "Examples" */ './pages/CheckNumbers.vue'),
  },
  {
    path: '/locations/operator',
    name: 'Operator',
    component: () =>
      import(/* webpackChunkName: "Examples" */ './pages/Operator.vue'),
  },
  {
    path: '/add-numbers-success/',
    name: 'AddNumbersSuccess',
    component: () =>
      import(/* webpackChunkName: "Examples" */ './pages/AddNumbersSuccess.vue'),
  },
  {
    path: '/login',
    name: 'Logis',
    component: () =>
      import(/* webpackChunkName: "Examples" */ './pages/Login.vue'),
  }
]
