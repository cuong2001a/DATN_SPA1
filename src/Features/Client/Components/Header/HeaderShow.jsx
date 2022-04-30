import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import 'animate.css';
import SignIn from 'Features/Client/Page/SignIn/SignIn';
import { Fragment, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  notifyErrorLogin,
  getId,
  logout,
  getPermission,
  newSocket,
  sortText,
  notifySuccess
} from 'Utils/Utils';
import Spin from 'react-cssfx-loading/lib/Spin';
import SearchClient from '../Component/SearchClient/SearchClient';
import OverlayMenu from '../Component/OverlayMenu/OverlayMenu';
import { AuthContext } from 'Helpers/AuthProvider';
import { userRole } from 'Features/type/enumUser';
import { Logout } from 'Features/Auth/AuthSlice';
import { RemoveCartByUser } from 'Features/Slice/Cart/CartSlice';
import { notiSTT, rooms, socket } from 'Features/type/notification';
import { LOGO } from 'Constants';
import Loading from 'Utils/Loading/Loading';

const HeaderShow = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.current);
  const services = useSelector((state) => state.service.current);
  const brand = useSelector((state) => state.brand.current);
  const category = useSelector((state) => state.category.current);
  const [userId, setUserId] = useState();
  const loading = useSelector((state) => state.cart.loading);
  const [context, setContext] = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [noti, setNoti] = useState([]);
  const [countNoti, setCountNoti] = useState(0);

  useEffect(() => {
    newSocket.emit(socket[0], rooms[5], { id: getId() });

    newSocket.on(`${socket[1]}-${getId()}`, (data) => {
      setNoti(() => {
        const notiArrType0 = [];
        const notiArrType1 = [];
        data.forEach((element) => {
          if (element.status === Number(Object.keys(notiSTT)[0])) {
            notiArrType0.push(element);
          }
          if (element.status === Number(Object.keys(notiSTT)[1])) {
            notiArrType1.push(element);
          }
        });
        return [...notiArrType0, ...notiArrType1];
      });
      setCountNotification(data);
    });
    return () => {
      setNoti([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSocket]);

  function setCountNotification(noti) {
    let count = 0;
    noti.forEach((element) => {
      if (element.status === Number(Object.keys(notiSTT)[0])) {
        count++;
      }
    });
    setCountNoti(count);
  }

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserId(user._id);
    } else if (getId() !== null) {
      setUserId(getId());
    } else {
      setUserId(undefined);
    }
  }, [user]);

  useEffect(() => {
    const auth = getPermission();
    if (Number(auth) !== Number(Object.keys(userRole)[4])) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [context]);

  const handleLogout = () => {
    setIsLoading(true);
    logout();
    setContext(false);
    dispatch(Logout());
    dispatch(RemoveCartByUser());
    setTimeout(() => {
      notifySuccess('Đăng xuất thành công!');
      setIsLoading(false);
    }, 1000);
    history.push('/');
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  let productOnCart = sessionStorage.getItem('cart');
  let cartNumberStorage = sessionStorage.getItem('cartNumber');
  const [cartNumber, setCartNumber] = useState(cartNumberStorage);
  let [isMenuSidebar, setMenuSidebar] = useState(false);
  useEffect(() => {
    setCartNumber(cartNumberStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productOnCart]);

  const alertLogin = () => {
    notifyErrorLogin('Đăng nhập để xem giỏ hàng!');
    if (!context) {
      setIsOpen(true);
    }

    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let [isOpenSearch, setIsOpenSearch] = useState(false);

  const closeSearch = () => {
    setIsOpenSearch(false);
  };
  const openSearch = () => {
    setIsOpenSearch(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const closeMenuSidebar = () => {
    setMenuSidebar(false);
  };
  const openMenuSidebar = () => {
    setMenuSidebar(true);
  };

  const [showGoToTop, setShowGoToTop] = useState('z-[-10] opacity-[0]');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 110) {
        setShowGoToTop('z-[50] opacity-[1]');
        setTimeout(() => {});
      } else {
        setShowGoToTop('z-[-10] opacity-[0]');
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  return (
    <Fragment>
      <section
        className={`inset-x-0 top-0  block bg-[#002633] px-5 font-nunito transition duration-500 md:fixed lg:px-0 ${showGoToTop}`}
      >
        <div className="container mx-auto hidden grid-cols-3 px-[15px] py-[15px] xl:grid xl:grid-cols-6">
          <div className="col-span-1 my-auto text-left text-white xl:hidden">
            <div className="group cursor-pointer" onClick={openMenuSidebar}>
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer stroke-white"
                  fill="none"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="col-span-1 text-center xl:text-left">
            <img className="mx-auto" src={LOGO} alt="logo" />
          </div>
          <nav className="col-span-4 my-auto hidden text-center text-[18px] capitalize xl:block">
            <ul>
              <li className="inline-block px-5">
                <Link to="/" className="text-white active:text-[#ed9b8f]">
                  trang chủ
                </Link>
              </li>
              <li className="inline-block px-5">
                <Link to="/about" className="text-white active:text-[#ed9b8f]">
                  giới thiệu
                </Link>
              </li>
              <li className="inline-block px-5">
                <Link
                  to="/service"
                  className="group relative cursor-pointer text-white active:text-[#ed9b8f]"
                >
                  dịch vụ+
                  <div className="shadow-radius absolute top-5 -left-80 hidden h-[250px] w-[780px] p-3 text-[16px] text-black group-hover:block">
                    <div className="grid grid-cols-3 gap-x-5 rounded bg-white p-3">
                      <img
                        className="col-span-1 h-[250px] w-full rounded object-cover object-center"
                        src="images/banner/service/home.webp"
                        alt=""
                      />
                      <ul className="col-span-2 grid grid-cols-2 gap-x-2">
                        {services &&
                          services.map((service) => (
                            <Link
                              to={`/service-detail/${service._id}`}
                              key={service._id}
                              className="h-10 rounded px-3 py-2 text-left hover:bg-[#f0699b] hover:text-white"
                            >
                              {sortText(service.service_name, 0, 25)}
                            </Link>
                          ))}
                      </ul>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="inline-block cursor-pointer px-5">
                <Link to="/treatment" className="text-white active:text-[#ed9b8f]">
                  Liệu trình
                </Link>
              </li>
              <li className="inline-block px-5">
                <Link
                  to="/filter"
                  className="group relative cursor-pointer text-white active:text-[#ed9b8f]"
                >
                  sản phẩm+
                  <div className="shadow-radius absolute top-5 left-3 hidden w-[400px] p-3 text-[16px] text-black group-hover:block">
                    <div className="grid grid-cols-2 rounded bg-white p-3">
                      <div className="flex flex-col">
                        <ul className=" ">
                          <h3 className="pl-2 text-left text-[21px] font-bold text-red-500">
                            Danh mục
                          </h3>
                          {category &&
                            category.slice(0, 4).map((item) => (
                              <Link key={item._id} to={`/filter?listCategory=${item._id}`}>
                                <li className="group relative flex justify-between rounded px-5 py-2 text-left  hover:bg-[#f0699b] hover:text-white">
                                  {sortText(item.category_name, 0, 25)}{' '}
                                </li>
                              </Link>
                            ))}
                        </ul>
                      </div>
                      <div className="flex flex-col">
                        <ul className="">
                          <h3 className="pl-2 text-left text-[21px] font-bold text-red-500">
                            Thương hiệu
                          </h3>
                          {brand &&
                            brand.slice(0, 4).map((item) => (
                              <Link key={item._id} to={`/filter?listBrand=${item._id}`}>
                                <li className="group relative flex justify-between rounded-md px-5 py-2 text-left  hover:bg-[#f0699b] hover:text-white">
                                  {sortText(item.brand_name, 0, 25)}{' '}
                                </li>
                              </Link>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
              <li className="inline-block px-5">
                <Link to="/new" className="text-white active:text-[#ed9b8f]">
                  Blogs
                </Link>
              </li>
              <li className="inline-block px-5">
                <Link to="/contact" className="text-white active:text-[#ed9b8f]">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </nav>
          <div className="col-span-1 flex items-center justify-end space-x-[15px] capitalize">
            <button type="submit" className="hidden border-none xl:block" onClick={openSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer stroke-white duration-500 hover:-translate-y-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            {context && (
              <div className="group relative cursor-pointer" onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer stroke-white duration-500 hover:-translate-y-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>

                <span className="absolute -top-1 -right-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-black text-[10px] text-white duration-500 group-hover:-translate-y-2">
                  {countNoti}
                </span>
              </div>
            )}

            {userId ? (
              <Link to="/cart">
                <div className="group relative hidden xl:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer stroke-white duration-500 hover:-translate-y-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-black text-[10px] text-white duration-500 group-hover:-translate-y-2">
                    {!loading ? (
                      cartNumber
                    ) : (
                      <Spin className="mx-auto" color="white" width="12px" height="12px" />
                    )}
                  </span>
                </div>
              </Link>
            ) : (
              <button onClick={alertLogin} disabled={isDisabled}>
                <div className="group relative hidden xl:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer stroke-white duration-500 hover:-translate-y-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </button>
            )}
            <div className="group relative hidden cursor-pointer xl:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                className="feather feather-user z-50 h-6 w-6  stroke-white duration-500 hover:-translate-y-2 "
                fill="none"
                viewBox="0 0 24 24"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div className="absolute top-5 -right-8 hidden duration-700 group-hover:block ">
                <div className="relative my-5 mx-auto w-48 rounded-lg bg-white">
                  <div className="absolute -top-2 right-9 h-0 w-0 -rotate-45 transform border-8 border-white border-b-transparent border-l-transparent"></div>
                  <ul className="cursor-pointer rounded-md p-2 shadow-md">
                    {context ? (
                      <div>
                        <Link to="/process">
                          <li className="group grid grid-cols-3 rounded-md py-0.5 px-3 hover:bg-[#f0699b] hover:text-white">
                            <span className="col-span-1 block text-left">
                              <i className="fal fa-shopping-cart "></i>
                            </span>
                            <span className="col-span-2 block text-left">Đơn hàng</span>
                          </li>
                        </Link>
                        <Link to={`/historyService`}>
                          <li className="group grid grid-cols-3 rounded-md py-0.5 px-3 hover:bg-[#f0699b] hover:text-white">
                            <span className="col-span-1 block text-left">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 "
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                />
                              </svg>
                            </span>
                            <span className="col-span-2 block text-left">Lịch sử </span>
                          </li>
                        </Link>
                        {isAdmin && (
                          <li
                            onClick={() => history.push('/admin')}
                            className="group grid grid-cols-3 rounded-md py-0.5 px-3 hover:bg-[#f0699b] hover:text-white"
                          >
                            <span className="col-span-1 block text-left">
                              <i className="fal fa-users-cog "></i>
                            </span>
                            <span className="col-span-2 block text-left">Admin</span>
                          </li>
                        )}

                        <li
                          onClick={handleLogout}
                          className="group grid grid-cols-3 rounded-md py-0.5 px-3 hover:bg-[#f0699b] hover:text-white"
                        >
                          <span className="col-span-1 block text-left">
                            <i className="fal fa-sign-in-alt  rotate-180"></i>
                          </span>
                          <span className="col-span-2 block text-left">Đăng xuất</span>
                        </li>
                      </div>
                    ) : (
                      <li
                        onClick={() => setIsOpen(true)}
                        className="group grid grid-cols-3 rounded-md py-0.5 px-3 hover:bg-[#f0699b] hover:text-white"
                      >
                        <span className="col-span-1 block text-left">
                          <i className="fal fa-sign-in-alt "></i>
                        </span>
                        <span className="col-span-2 block text-left">Đăng nhập</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Popover
        sx={{ mt: 4 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography component="div" className="relative h-[350px] w-[450px]  p-0" sx={{}}>
          {noti.length !== 0 ? (
            <div className="header border-[rgb(229, 231, 235,0.3)] sticky  top-0 block border-b-2 border-solid bg-white p-3 text-lg font-bold shadow-md">
              Thông báo mới nhận
            </div>
          ) : (
            ''
          )}
          <div className="content overflow-x-auto overflow-y-auto">
            {noti.length !== 0 ? (
              noti.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      item.status === Number(Object.keys(notiSTT)[0]) ? 'bg-red-100' : ' shadow-xl '
                    }
                  >
                    <div className="item border-[rgb(229, 231, 235)] flex cursor-pointer gap-5 border-b-2 border-solid px-[8px] py-[5px] hover:bg-[rgb(248,248,248,0.9)] ">
                      <div className="img my-4">
                        <img className="h-[40px] w-[40px]" src={item.photo} alt="notification" />
                      </div>
                      <div className="content">
                        <span className=" block text-xl font-bold">
                          {sortText(item.title, 0, 30)}
                        </span>
                        <span className=" block text-sm">{sortText(item.content, 0, 70)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className=" absolute top-1/2 left-1/2 block translate-x-[-50%] text-center text-xl text-gray-500">
                Không có thông báo mới
              </div>
            )}
          </div>
          {noti.length > 3 ? (
            <div className="border-[rgb(229, 231, 235,0.3)] sticky bottom-0  w-full  border-t-[1px] border-solid bg-white p-3  text-center">
              <Link to="/admin" className="hover:text-blue-400">
                Xem tất cả
              </Link>
            </div>
          ) : (
            ''
          )}
        </Typography>
      </Popover>
      <OverlayMenu
        isOpen={isMenuSidebar}
        setIsOpen={setMenuSidebar}
        closeModal={closeMenuSidebar}
      />
      <SignIn isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
      <SearchClient isOpen={isOpenSearch} setIsOpen={setIsOpenSearch} closeModal={closeSearch} />
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default HeaderShow;
