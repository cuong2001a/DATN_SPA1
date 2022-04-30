import Blogs from 'Features/Client/Page/Home/Blogs';
import { lazy } from 'react';

const Home = lazy(() => import('Features/Client/Page/Home/Home'));
const News = lazy(() => import('Features/Client/Page/News/News'));
const About = lazy(() => import('Features/Client/Page/About/About'));
const Cart = lazy(() => import('Features/Client/Page/Cart/Cart'));
const DetailServices = lazy(() => import('Features/Client/Page/DetailServices/DetailServices'));
const DetailTreatment = lazy(() => import('Features/Client/Page/DetailTreatment/DetailTreatment'));
const DetailNews = lazy(() => import('Features/Client/Page/DetailNews/DetailNews'));
const Notification = lazy(() => import('Features/Client/Page/Notifications/Notifications'));
const Contact = lazy(() => import('Features/Client/Page/ContactPage/Contact'));
const Search = lazy(() => import('Features/Client/Page/Search/Search'));
const FormOrderDetail = lazy(() =>
  import('Features/Client/Components/Component/FormOder/FormOrderDetail')
);
const Product = lazy(() => import('Features/Client/Page/Product/Product'));
const Service = lazy(() => import('Features/Client/Page/Service/Service'));
const Checkout = lazy(() => import('Features/Client/Page/Checkout/Checkout'));
const Category = lazy(() => import('Features/Client/Page/Category/Category'));
const Filter = lazy(() => import('Features/Client/Page/Filter/Filter'));
const Treatment = lazy(() => import('Features/Client/Page/Treatment/Treatment'));
const Process = lazy(() => import('Features/Client/Page/Process/Process'));
const HistoryService = lazy(() => import('Features/Client/Page/History/History'));
const ChinhSachBaoMat = lazy(() => import('Features/Client/Page/Footer/ChinhSachBaoMat'));
const DieuKhoanDieuKien = lazy(() => import('Features/Client/Page/Footer/DieuKhoanDieuKien'));
const TraHang = lazy(() => import('Features/Client/Page/Footer/TraHang'));
const VanChuyen = lazy(() => import('Features/Client/Page/Footer/VanChuyen'));
// ================

const ProductDetail = lazy(() => import('Features/Client/Page/ProductDetail/ProductDetail'));

const LayoutClient = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/appointment/:slug',
    component: FormOrderDetail,
    exact: true
  },

  {
    path: '/cart',
    component: Cart,
    exact: true
  },
  {
    path: '/new-detail/:id',
    component: DetailNews,
    exact: true
  },
  {
    path: '/service-detail/:id',
    component: DetailServices,
    exact: true
  },
  {
    path: '/new',
    component: News,
    exact: true
  },
  {
    path: '/contact',
    component: Contact,
    exact: true
  },
  {
    path: '/product-detail/:id',
    component: ProductDetail,
    exact: true
  },
  {
    path: '/treatment-detail/:id',
    component: DetailTreatment,
    exact: true
  },
  {
    path: '/search',
    component: Search,
    exact: true
  },
  {
    path: '/cart',
    component: Cart,
    exact: true
  },
  {
    path: '/treatment',
    component: Treatment,
    exact: true
  },
  {
    path: '/notification',
    component: Notification,
    exact: true
  },
  {
    path: '/about',
    component: About,
    exact: true
  },
  {
    path: '/service',
    component: Service,
    exact: true
  },
  {
    path: '/product',
    component: Product,
    exact: true
  },
  {
    path: '/category/:id',
    component: Category,
    exact: true
  },
  {
    path: '/blog',
    component: Blogs,
    exact: true
  },
  {
    path: '/checkout',
    component: Checkout,
    exact: true
  },
  {
    path: '/process',
    component: Process,
    exact: true
  },
  {
    path: '/filter',
    component: Filter,
    exact: true
  },
  {
    path: '/historyService',
    component: HistoryService,
    exact: true
  },
  {
    path: '/chinh-sach-bao-mat',
    component: ChinhSachBaoMat,
    exact: true
  },
  {
    path: '/dieu-khoan-dieu-kien',
    component: DieuKhoanDieuKien,
    exact: true
  },
  {
    path: '/tra-hang-thanh-toan',
    component: TraHang,
    exact: true
  },
  {
    path: '/van-chuy-giao-hang',
    component: VanChuyen,
    exact: true
  }
];

export default LayoutClient;
