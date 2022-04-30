import Page404 from 'Features/Client/Page/Page404/Page404';
import { ListCategory } from 'Features/Slice/Category/CategorySlice';
import { ListCustomer } from 'Features/Slice/Customer/CustomerSlice';
import { ListProduct } from 'Features/Slice/Product/ProductSlice';
import { ListTreatment } from 'Features/Slice/Treatment/TreatmentSlice';
import { ListService } from 'Features/Slice/Service/ServiceSlice';
import { ListBrand } from 'Features/Slice/Brand/BrandSlice';
import PrivateRouter from 'Helpers/PrivateRouter';
import PublicRouter from 'Helpers/PublicRouter';
import LayoutAdmin from 'Layout/AdminLayout';
import LayoutClient from 'Layout/ClientLayout';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from 'Utils/Loading/Loading';
import './Assets/css/App.css';
import AuthProvider from './Helpers/AuthProvider';
import { ListBlog } from 'Features/Slice/Blog/BlogSlice';

function App() {
  const dispatch = useDispatch();
  /**
   * Khởi tạo sẽ gọi những data cần thiết
   */
  const callData = async () => {
    dispatch(ListCategory());
    dispatch(ListProduct());
    dispatch(ListService());
    dispatch(ListCustomer());
    dispatch(ListBrand());
    dispatch(ListTreatment());
    dispatch(ListBlog());
  };

  useEffect(() => {
    callData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    window.scrollTo(0, 0); // auto scroll top when mounted
  }, []);

  const [showGoToTop, setShowGoToTop] = useState(false);
  const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    ScrollTop();
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowGoToTop(true);
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Switch>
              {LayoutAdmin.map(({ path, component, exact }, index) => {
                return (
                  <PrivateRouter
                    exact={exact}
                    key={index}
                    path={`/admin${path}`}
                    component={component}
                  />
                );
              })}
              {LayoutClient.map(({ path, component, exact }, index) => {
                return <PublicRouter exact={exact} key={index} path={path} component={component} />;
              })}
              <Route path="*" exact component={Page404} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {showGoToTop && (
        <button
          onClick={ScrollTop}
          className="fixed left-[50px] bottom-[70px] z-50 hidden rounded-sm bg-pink-400 px-3 py-2 duration-300 hover:bg-pink-600 md:block"
        >
          <span className="text-base text-white">
            <i className="fas fa-arrow-up"></i>
          </span>
        </button>
      )}
    </div>
  );
}

export default App;
