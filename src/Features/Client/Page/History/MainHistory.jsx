import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Loading from 'Utils/Loading/Loading';
import { changeDisplayPrices } from 'Utils/Utils';
import RatingService from './RatingService';

const MainHistory = (props) => {
  const { appointments } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [serviceOrder, setServiceOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const serviceStore = useSelector((state) => state.service.current);
  const dispatch = useDispatch();
  const history = useHistory();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const handleShowModalEvaluate = (products) => {
    // setServiceOrder(products);
    setIsOpen(true);
  };

  //hiển thị trạng thái lịch hẹn
  const statusAppointment = (status) => {
    if (status === 0) {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-calendar-check"></i> <span>Đặt lịch thành công </span>
        </p>
      );
    } else if (status === 1) {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-seedling"></i> <span>Đang điều trị </span>
        </p>
      );
    } else if (status === 2) {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-hand-holding-heart"></i> <span>Đã điều trị xong </span>
        </p>
      );
    } else if (status === 3) {
      return (
        <p className="space-x-2 text-[red]">
          <i className="fas fa-window-close"></i> <span>Lịch hẹn đã hủy </span>
        </p>
      );
    } else {
      return (
        <p className="space-x-2 text-[red]">
          <i className="far fa-frown"></i> <span>Đặt lịch hẹn thất bại </span>
        </p>
      );
    }
  };

  const noAppointment = () => {
    return (
      <div className="my-10 text-center">
        <h3 className="mb-6 text-center text-3xl">
          Bạn chưa sử dụng dịch vụ nào. Hãy thử trải nghiệm ngay!
        </h3>
        <Link
          to="/service"
          className="mr-6 rounded-lg bg-blue-500 px-4 py-3  text-center font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600"
        >
          Dịch vụ
        </Link>
      </div>
    );
  };

  return (
    <>
      {appointments.length < 1 ? (
        noAppointment()
      ) : (
        <div>
          {appointments &&
            appointments.map((appointment) => {
              console.log('appointment: ', appointment);
              let serviceDetail = serviceStore.filter(
                (service) => service._id === appointment.service_id._id
              );
              serviceDetail = serviceDetail[0];
              return (
                <div key={appointment._id} className="border-b ">
                  {/* layout map dữ liệu các dịch vụ */}
                  <article className="flex items-start space-x-6 p-3">
                    <img
                      src="https://cf.shopee.vn/file/c24e9d1e0a4033cbc8f56bbab0afb86b"
                      alt=""
                      width="100"
                      height="140"
                      className="flex-none rounded-md bg-slate-100"
                    />
                    <div className="relative min-w-0 flex-auto">
                      <div className="flex items-center justify-between">
                        <h2 className="truncate pr-20 text-[20px] font-semibold text-slate-900">
                          {appointment.service_id.service_name}
                        </h2>
                        <div className="">{statusAppointment(appointment.status_notification)}</div>
                      </div>
                      <dl className=" mt-2 text-sm font-medium leading-6">
                        <div className="flex items-center justify-between">
                          <p>Danh mục: {serviceDetail.category_id.category_name}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Thời gian thực hiện dịch vụ : {serviceDetail.service_time} phút</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>Ngày đặt lịch : 07-04-2022</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>
                            Ngày hẹn: {appointment.appointment_date.split(' - ')[0].split('T')[0]}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <p>
                            Giờ hẹn: {appointment.appointment_date.split(' - ')[0].split('T')[1]} -{' '}
                            {appointment.appointment_date.split(' - ')[1].split('T')[1]}
                          </p>
                        </div>
                      </dl>
                    </div>
                  </article>
                  {/* layout map dữ liệu các dịch vụ */}
                  <p className="my-2 flex justify-end space-x-2 text-2xl text-[#1f1f1f]">
                    <i className="fad fa-hand-holding-usd"></i> <span>Giá tiền: </span>{' '}
                    <span className="text-[#ee4d48]">
                      {changeDisplayPrices(appointment.service_id.service_price)}
                    </span>
                  </p>
                  {/* button của các trạng thái service */}

                  {/* <div className="mb-5 flex items-center justify-end space-x-2">
          {order.status == 4 ? (
            <div className="flex justify-center space-x-2">
              <button
          onClick={() => handleShowModalEvaluate()}
          type="button"
          className="inline-block rounded border border-white bg-[#ee4d2d] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:border-[#ee4d2d] hover:bg-white hover:text-[#ee4d2d] hover:shadow-lg focus:bg-[#ee4d2d] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#ee4d2d] active:shadow-lg">
          Đánh giá
        </button>
            </div>
          ) : (
            ''
          )}
          {order.status == 5 ? (
            <div className="flex justify-center space-x-2">
              <button
                type="button"
                className="inline-block rounded border border-white bg-[#19aaff] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:border-[#ee4d2d] hover:bg-white hover:text-[#ee4d2d] hover:shadow-lg focus:bg-[#ee4d2d] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#ee4d2d] active:shadow-lg">
                Đã đánh giá
              </button>
            </div>
          ) : (
            ''
          )}
          {order.status == 0 ? (
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => confirmCancelOrder(order._id)}
                type="button"
                className={`inline-block rounded bg-[#ff4d4f] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:opacity-70  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg`}>
                Hủy đơn hàng
              </button>
            </div>
          ) : (
            ''
          )}
          <div className="flex justify-center space-x-2">
            <label
              className={`inline-block rounded ${
                buttonColors[order.status]
              } px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg`}>
              {order.status == 4 || order.status == 5 ? 'Đã hoàn thành' : orderSTT[order.status]}
            </label>
          </div>

          <div className="flex justify-center space-x-2">
            {order.status >= 3 && order.status <= 5 ? (
              <button
                onClick={() => confirmRegain(order)}
                type="button"
                disabled={isDisabled}
                className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
                Mua lại
              </button>
            ) : (
              ''
            )}
          </div>
        </div> */}
                  {/* button của các trạng thái service */}
                </div>
              );
            })}
          <RatingService isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
          {isLoading && <Loading />}
        </div>
      )}
    </>
  );
};

export default MainHistory;
