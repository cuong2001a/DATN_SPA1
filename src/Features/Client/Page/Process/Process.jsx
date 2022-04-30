import BannerProcess from 'Features/Client/Components/Header/Banner/BannerProcess';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import { orderSTT } from 'Features/type/enumStatus';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Loading from 'Utils/Loading/Loading';
import { getId, notifyErrorLogin } from 'Utils/Utils';
import MainProcess from './MainProcess/MainProcess';

const Process = () => {
  document.title = 'Đơn hàng';
  const history = useHistory();
  useEffect(() => {
    if (!getId()) {
      notifyErrorLogin('Đăng nhập để xem giỏ hàng!');
      history.push('/');
    }
  }, [history]);

  //get State from Redux
  const loading = useSelector((state) => state.order.loading);
  const orders = useSelector((state) => state.order.current);

  const awaitOrders = orders.filter((order) => order.status === Number(Object.keys(orderSTT)[0])); // chờ xác nhận
  const takeOrders = orders.filter((order) => order.status === Number(Object.keys(orderSTT)[1])); // đã xác nhận
  const pendingOrders = orders.filter((order) => order.status === Number(Object.keys(orderSTT)[2])); //đang giao hàng
  const doneOrders = orders.filter(
    (order) =>
      order.status === Number(Object.keys(orderSTT)[4]) ||
      order.status === Number(Object.keys(orderSTT)[5])
  ); // đã hoàn thành
  const removeOrders = orders.filter((order) => order.status === Number(Object.keys(orderSTT)[3])); // đã hủy

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerProcess />
      </header>
      {orders && orders.length > 0 ? (
        <main className="container mx-auto font-nunito">
          <div className="relative">
            <img className="mx-auto" src="images/banner/service/icon-leaf-small.png" alt="" />
            <div className="item-center absolute inset-0 top-5 my-auto flex justify-center">
              <div className="text-center">
                <span className="block text-[48px] font-bold">Đơn hàng</span>
                <span className="block font-semibold text-[#945050]">
                  Vì chất lượng ngày càng hoàn thiện - trải nghiệm mua hàng cùng Hillsbeauty Spa
                </span>
              </div>
            </div>
          </div>
          <div className="container mx-auto grid lg:w-[1300px]">
            <section className="">
              <ul
                className="nav nav-justified nav-tabs my-4 grid list-none grid-cols-2 border-b-0 px-5 md:grid-cols-6"
                id="tabs-tabJustify"
                role="tablist"
              >
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-products-all"
                    className=" nav-link active my-2 block w-full border-x-0 border-t-0 
                    border-b-2 border-transparent px-6 py-3 text-sm font-medium uppercase
                    leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent "
                    id="tabs-product-all"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-products-all"
                    role="tab"
                    aria-controls="tabs-view-products-all"
                    aria-selected="true"
                  >
                    Tất cả ({orders.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-products-wait"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-profile-tabJustify"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-products-wait"
                    role="tab"
                    aria-controls="tabs-product-wait"
                    aria-selected="false"
                  >
                    Chờ xác nhận ({awaitOrders.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-products-take"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-product-take"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-products-take"
                    role="tab"
                    aria-controls="tabs-view-products-take"
                    aria-selected="false"
                  >
                    Chờ lấy hàng ({takeOrders.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-products-pending"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-product-pending"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-products-pending"
                    role="tab"
                    aria-controls="tabs-view-products-pending"
                    aria-selected="false"
                  >
                    Đang giao ({pendingOrders.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-products-done"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-product-done"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-products-done"
                    role="tab"
                    aria-controls="tabs-view-products-done"
                    aria-selected="false"
                  >
                    Đã giao ({doneOrders.length})
                  </Link>
                </li>
                <li className="nav-item flex-grow text-center" role="presentation">
                  <Link
                    to="#tabs-view-products-remove"
                    className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                    id="tabs-product-remove"
                    data-bs-toggle="pill"
                    data-bs-target="#tabs-view-products-remove"
                    role="tab"
                    aria-controls="tabs-view-products-remove"
                    aria-selected="false"
                  >
                    Đã hủy ({removeOrders.length})
                  </Link>
                </li>
              </ul>
              <div className="tab-content" id="tabs-tabContentJustify">
                <div
                  className="active show tab-pane fade"
                  id="tabs-view-products-all"
                  role="tabpanel"
                  aria-labelledby="tabs-product-all"
                >
                  <MainProcess orders={orders} />
                </div>
                <div
                  className="fade tab-pane"
                  id="tabs-view-products-wait"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify"
                >
                  <MainProcess orders={awaitOrders} />
                </div>
                <div
                  className="fade tab-pane"
                  id="tabs-view-products-take"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify"
                >
                  <MainProcess orders={takeOrders} />
                </div>
                <div
                  className="fade tab-pane"
                  id="tabs-view-products-pending"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify"
                >
                  <MainProcess orders={pendingOrders} />
                </div>

                <div
                  className="fade tab-pane"
                  id="tabs-view-products-done"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify"
                >
                  <MainProcess orders={doneOrders} />
                </div>

                <div
                  className="fade tab-pane"
                  id="tabs-view-products-remove"
                  role="tabpanel"
                  aria-labelledby="tabs-profile-tabJustify"
                >
                  <MainProcess orders={removeOrders} />
                </div>
              </div>
            </section>
          </div>
        </main>
      ) : (
        <div className="my-24 text-center text-2xl md:text-4xl">
          Chưa có đơn hàng nào <i className="far fa-sad-tear"></i>
          <div>
            <Link to="/cart">
              <button className="mx-auto mt-3 flex items-center justify-center space-x-2 rounded-md border border-transparent bg-indigo-600 px-2 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span>Giỏ hàng</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      )}
      {loading && <Loading />}
    </Fragment>
  );
};

export default Process;
