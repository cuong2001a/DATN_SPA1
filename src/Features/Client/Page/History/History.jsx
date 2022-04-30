import BannerProcess from 'Features/Client/Components/Header/Banner/BannerProcess';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import { treatmentSTT } from 'Features/type/enumStatus';
import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getId, notifyErrorLogin } from 'Utils/Utils';
import MainHistory from './MainHistory';

const History = () => {
  const history = useHistory();
  useEffect(() => {
    if (!getId()) {
      notifyErrorLogin('Đăng nhập để xem lịch sử!');
      history.push('/');
    }
  }, [history]);

  const appointments = useSelector((state) => state.appointment.current);
  console.log('appointments: ', appointments);

  const successAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[0])
  ); // đặt thành công
  const processingAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[1])
  ); // đang thực hiện
  const doneAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[2])
  ); //Đã xong
  const cancelAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[3])
  ); // Đã uỷ
  const failedAppointments = appointments.filter(
    (item) => item.status_notification === Number(Object.keys(treatmentSTT)[4])
  ); // Đặt thất bại

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerProcess />
      </header>
      {appointments && appointments.length > 0 ? (
        <main className="container mx-auto grid w-[1300px] grid-cols-12 font-nunito">
          <section className="col-span-2">
            <img
              src="https://us.123rf.com/450wm/subarashii21/subarashii211506/subarashii21150600152/41708810-beautiful-african-american-woman-shopping.jpg?ver=6"
              alt=""
            />
          </section>
          <section className="col-span-10">
            <ul
              className="nav nav-justified nav-tabs my-4 flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row "
              id="tabs-tabJustify"
              role="tablist"
            >
              <li className="nav-item flex-grow text-center" role="presentation">
                <Link
                  to="#tabs-view-appointments-all"
                  className=" active nav-link my-2 block w-full border-x-0 border-t-0 
                    border-b-2 border-transparent px-6 py-3 text-sm font-medium uppercase
                    leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent "
                  id="tabs-product-all"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-view-appointments-all"
                  role="tab"
                  aria-controls="tabs-view-appointments-all"
                  aria-selected="true"
                >
                  Tất cả lịch hẹn ({appointments.length})
                </Link>
              </li>
              <li className="nav-item flex-grow text-center" role="presentation">
                <Link
                  to="#tabs-view-appointments-success"
                  className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                  id="tabs-profile-tabJustify"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-view-appointments-success"
                  role="tab"
                  aria-controls="tabs-view-appointments-success"
                  aria-selected="false"
                >
                  Lịch hẹn thành công ({successAppointments.length})
                </Link>
              </li>
              <li className="nav-item flex-grow text-center" role="presentation">
                <Link
                  to="#tabs-view-appointments-processing"
                  className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                  id="tabs-profile-tabJustify"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-view-appointments-processing"
                  role="tab"
                  aria-controls="tabs-view-appointments-processing"
                  aria-selected="false"
                >
                  Dịch vụ đang sử dụng ({processingAppointments.length})
                </Link>
              </li>
              <li className="nav-item flex-grow text-center" role="presentation">
                <Link
                  to="#tabs-view-appointments-done"
                  className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                  id="tabs-profile-tabJustify"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-view-appointments-done"
                  role="tab"
                  aria-controls="tabs-view-appointments-done"
                  aria-selected="false"
                >
                  Dịch vụ đã sử dụng ({doneAppointments.length})
                </Link>
              </li>
              <li className="nav-item flex-grow text-center" role="presentation">
                <Link
                  to="#tabs-view-appointments-cancel"
                  className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 
                    border-transparent px-6 py-3 text-sm font-medium uppercase leading-tight hover:border-transparent hover:bg-gray-100
                    focus:border-transparent"
                  id="tabs-profile-tabJustify"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-view-appointments-cancel"
                  role="tab"
                  aria-controls="tabs-view-appointments-cancel"
                  aria-selected="false"
                >
                  Dịch vụ đã hủy ({cancelAppointments.length})
                </Link>
              </li>
            </ul>
            <div className="tab-content" id="tabs-tabContentJustify">
              <div
                className="active show tab-pane fade"
                id="tabs-view-appointments-all"
                role="tabpanel"
                aria-labelledby="tabs-product-all"
              >
                <MainHistory appointments={appointments} />
              </div>

              <div
                className="fade tab-pane"
                id="tabs-view-appointments-success"
                role="tabpanel"
                aria-labelledby="tabs-profile-tabJustify"
              >
                <MainHistory appointments={successAppointments} />
              </div>
              <div
                className="fade tab-pane"
                id="tabs-view-appointments-processing"
                role="tabpanel"
                aria-labelledby="tabs-profile-tabJustify"
              >
                <MainHistory appointments={processingAppointments} />
              </div>
              <div
                className="fade tab-pane"
                id="tabs-view-appointments-done"
                role="tabpanel"
                aria-labelledby="tabs-profile-tabJustify"
              >
                <MainHistory appointments={doneAppointments} />
              </div>
              <div
                className="fade tab-pane"
                id="tabs-view-appointments-cancel"
                role="tabpanel"
                aria-labelledby="tabs-profile-tabJustify"
              >
                <MainHistory appointments={cancelAppointments} />
              </div>
            </div>
          </section>
        </main>
      ) : (
        <div className="my-24 text-center text-2xl md:text-4xl">
          Chưa có lịch hẹn nào <i className="far fa-sad-tear"></i>
        </div>
      )}

      {/* giao diện khi chưa sử dụng dịch vụ nào */}
      {/* <div className="my-24 text-center text-2xl md:text-4xl">
        Bạn chưa sử dụng dịch vụ nào <i className="far fa-sad-tear"></i>
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
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div> */}
    </Fragment>
  );
};

export default History;
