import React from 'react';
const Dashboard = React.lazy(() => import('./components/dashboard'));
const Register = React.lazy(() => import('./components/register'))

const routes = [
  { path: '/', exact: true, name: 'Layout' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/register', name: 'Register', component: Register }
];

export default routes;