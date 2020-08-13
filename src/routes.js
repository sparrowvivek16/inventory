import React from 'react';
const Dashboard = React.lazy(() => import('./components/dashboard'));
const Register = React.lazy(() => import('./components/register'));
const Profile = React.lazy(() => import('./components/profile'));

const routes = [
  { path: '/', exact: true, name: 'Layout' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile }
];

export default routes;