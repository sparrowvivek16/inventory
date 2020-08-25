import React from 'react';
const Dashboard = React.lazy(() => import('./components/dashboard'));
const Register = React.lazy(() => import('./components/register'));
const Profile = React.lazy(() => import('./components/profile'));
const Newitem = React.lazy(() => import('./components/newitem'));
const Settings = React.lazy(() => import('./components/settings'));

const routes = [
  { path: '/', exact: true, name: 'Layout' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/register', name: 'Register', component: Register },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/newitem', name: 'Newitem', component: Newitem },
  { path: '/settings', name: 'Settings', component: Settings }
];

export default routes;