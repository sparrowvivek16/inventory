import React from 'react';
const Dashboard = React.lazy(() => import('./components/dashboard'));
const Register = React.lazy(() => import('./components/register'));
const Newitem = React.lazy(() => import('./components/newitem'));

const routes = [
  { path: '/', exact: true, name: 'Layout' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/register', name: 'Register', component: Register },
  { path: '/newitem', name: 'Newitem', component: Newitem }
];

export default routes;