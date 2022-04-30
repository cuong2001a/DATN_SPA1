import { lazy } from 'react';
const Statistical = lazy(() => import('Features/Admin/Page/Statistical/Statistical'));
const Appointment = lazy(() => import('Features/Admin/Page/Appointment/Appointment'));
const Staffs = lazy(() => import('Features/Admin/Page/Staffs/Staffs'));
const Categories = lazy(() => import('Features/Admin/Page/Categories/Categories'));
const Product = lazy(() => import('Features/Admin/Page/Products/Product'));
const Services = lazy(() => import('Features/Admin/Page/Services/Services'));
const Users = lazy(() => import('Features/Admin/Page/Users/Users'));
const Customers = lazy(() => import('Features/Admin/Page/Customers/Customers'));
const Order = lazy(() => import('Features/Admin/Page/Orders/Order'));
const Brand = lazy(() => import('Features/Admin/Page/Brand/Brand'));
const Treatment = lazy(() => import('Features/Admin/Page/Treatments/Treatment'));
const Schedule = lazy(() => import('Features/Admin/Components/Components/Schedule/StaffSchedule'));
const Contact = lazy(() => import('Features/Admin/Page/Contact/Contact'));
const Blog = lazy(() => import('Features/Admin/Page/Blog/Blog'));

const LayoutAdmin = [
  {
    path: '/',
    component: Statistical,
    exact: true
  },
  {
    path: '/appointment',
    component: Appointment,
    exact: true
  },
  {
    path: '/treatment',
    component: Treatment,
    exact: true
  },
  {
    path: '/users',
    component: Users,
    exact: true
  },
  {
    path: '/category',
    component: Categories,
    exact: true
  },
  {
    path: '/product',
    component: Product,
    exact: true
  },
  {
    path: '/service',
    component: Services,
    exact: true
  },
  {
    path: '/staffs/:slug',
    component: Staffs,
    exact: true
  },
  {
    path: '/staffs',
    component: Staffs,
    exact: true
  },
  {
    path: '/customers',
    component: Customers,
    exact: true
  },
  {
    path: '/brand',
    component: Brand,
    exact: true
  },
  {
    path: '/order',
    component: Order,
    exact: true
  },
  {
    path: '/staff/schedule',
    component: Schedule,
    exact: true
  },
  {
    path: '/contact',
    component: Contact,
    exact: true
  },
  {
    path: '/blog',
    component: Blog,
    exact: true
  },
  {
    path: '*',
    component: 'home',
    exact: true
  }
];

export default LayoutAdmin;
