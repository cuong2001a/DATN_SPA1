import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Dialog, Disclosure } from '@headlessui/react';
import { MinusSmIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from 'Helpers/AuthProvider';
import SignIn from 'Features/Client/Page/SignIn/SignIn';
import { getPermission, logout, notifySuccess } from 'Utils/Utils';
import { userRole } from 'Features/type/enumUser';
import { Logout } from 'Features/Auth/AuthSlice';
import { RemoveCartByUser } from 'Features/Slice/Cart/CartSlice';
import Loading from 'Utils/Loading/Loading';
import { LOGO } from 'Constants';

const OverlayMenu = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const subCategories = useSelector((state) => state.category.current);
  const [context, setContext] = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const [keyword, setKeyword] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const getKeyword = (e) => {
    const key = e.target.value;
    setKeyword(key);
  };

  const naviSearch = () => {
    props.closeModal();
    history.push(`/search?keyword=${keyword}`);
  };

  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50  flex translate-x-0 transform justify-start overflow-y-auto font-nunito duration-1000 ease-in-out xl:hidden ">
        <div
          onClick={props.closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            backgroundColor: 'rgb(199, 194, 201)',
            opacity: 0.7
          }}></div>
        <div className="w-1/2 transform overflow-y-auto duration-1000 ease-in-out">
          <div className="container my-auto h-[100%] translate-x-0 transform rounded-tr-md rounded-br-md bg-white pb-10 shadow-lg duration-1000 ease-in-out">
            <div className="space-y-3 bg-white">
              <div className="bg-[#002633] py-3">
                <img className="mx-auto" src={LOGO} alt="logo" />
              </div>
              <form className="relative px-5 text-gray-600" onSubmit={naviSearch}>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  onChange={getKeyword}
                  className="h-10 w-full rounded-full border bg-white px-5 text-sm focus:outline-none xl:w-64"
                />
                <button type="submit" className="absolute right-0 top-0 mt-3 mr-10">
                  <svg
                    className="h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    id="Capa_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 56.966 56.966"
                    xmlSpace="preserve"
                    width="512px"
                    height="512px">
                    <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                  </svg>
                </button>
              </form>
              <nav className="text-left capitalize">
                <ul>
                  <li className="px-4">
                    <Link to="/" className="text-[#f0699b]">
                      <div className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900 hover:text-[#f0699b]">
                          trang chủ
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="px-4">
                    <Link to="/about" className="text-[#f0699b]">
                      <div className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900 hover:text-[#f0699b]">
                          giới thiệu
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="px-4">
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <h3 className="">
                            <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                              <Link
                                to="/service"
                                className="font-medium text-gray-900 hover:text-[#f0699b]">
                                Dịch vụ+
                              </Link>
                              <span className="flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="">
                            <ul className="pl-3 text-[16px] text-gray-900">
                              {subCategories.map((category) => (
                                <li
                                  key={category._id}
                                  className="cursor-pointer px-3 py-2  hover:bg-[#f0699b] hover:text-white active:text-[#e78fa1]">
                                  <Link to="">{category.category_name}</Link>
                                </li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </li>
                  <li className="px-4">
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <h3 className="">
                            <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                              <Link
                                to="/service"
                                className="font-medium text-gray-900 hover:text-[#f0699b]">
                                Sản phẩm+
                              </Link>
                              <span className="flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="">
                            <ul className="pl-3 text-[16px] text-gray-900">
                              {subCategories.map((category) => (
                                <li
                                  key={category._id}
                                  className="cursor-pointer px-3 py-2  hover:bg-[#f0699b]  hover:text-white active:text-[#e78fa1]">
                                  <Link to="">{category.category_name}</Link>
                                </li>
                              ))}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </li>
                  <li className="px-4">
                    <Link to="/blog" className="text-[#f0699b]">
                      <div className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900 hover:text-[#f0699b]">
                          Blogs
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="px-4">
                    <Link to="/contact" className="text-[#f0699b]">
                      <div className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900 hover:text-[#f0699b]">
                          Liên hệ
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="px-4">
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <h3 className="">
                            <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900 hover:text-[#f0699b]">
                                Tài khoản
                              </span>
                              <span className="flex items-center">
                                {open ? (
                                  <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="">
                            <ul className="cursor-pointer p-2 pl-3 text-[16px] text-gray-900">
                              {context ? (
                                <div>
                                  {' '}
                                  <li className="cursor-pointer px-3 py-2  hover:bg-[#f0699b]  hover:text-white active:text-[#e78fa1]">
                                    <span className="block text-left">Đơn hàng</span>
                                  </li>
                                  {isAdmin && (
                                    <li
                                      onClick={() => history.push('/admin')}
                                      className="cursor-pointer px-3 py-2   hover:bg-[#f0699b] hover:text-white active:text-[#e78fa1]">
                                      <span className="block text-left">Admin</span>
                                    </li>
                                  )}
                                  <li
                                    onClick={handleLogout}
                                    className="cursor-pointer px-3 py-2  hover:bg-[#f0699b] hover:text-white active:text-[#e78fa1]">
                                    <span className="block text-left">Đăng xuất</span>
                                  </li>
                                </div>
                              ) : (
                                <li
                                  onClick={() => setIsOpen(true)}
                                  className="cursor-pointer px-3 py-2  hover:bg-[#f0699b]  hover:text-white active:text-[#e78fa1]">
                                  <span className="block text-left">Đăng nhập</span>
                                </li>
                              )}
                            </ul>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Dialog>
      <SignIn isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default OverlayMenu;
