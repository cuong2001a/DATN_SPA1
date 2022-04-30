import React from 'react';
import { Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import moment from 'moment';
import { changeDisplayPrices } from 'Utils/Utils';
import { Link } from 'react-router-dom';

const DetailAppointmentClient = (props) => {
  const { data } = props;
  const timeSlice = data.appointment_date.slice(0, 16);
  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 overflow-y-auto pt-[6%] font-nunito"
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            backgroundColor: 'rgb(199, 194, 201)',
            opacity: 0.7
          }}
        ></div>
        <div className=" flex items-center justify-center px-5 font-nunito">
          <div className=" easy-in-out container relative max-w-xl transform rounded-2xl bg-white shadow-lg duration-200">
            <div className=" h-32 overflow-hidden">
              <img
                className="w-full rounded-xl"
                src="https://thumbs.dreamstime.com/b/spa-background-spa-concept-white-stone-background-tropical-leaves-flowers-candle-zen-like-grey-stones-top-view-copy-space-187643849.jpg"
                alt=""
              />
            </div>
            <div className="-mt-12 flex justify-center  px-5">
              <img
                className="h-32 w-32 rounded-full bg-white bg-cover bg-center p-2"
                src={
                  data.photoURL ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwTlaU6OsybrY3pl2cclEfqfXooilMMu5PbA&usqp=CAU'
                }
                alt=""
              />
            </div>
            <div className="p-5 text-lg text-[16px] md:text-[18px]">
              <div className="pb-5">
                <h3 className="text-center text-xl md:text-2xl">Thông tin - Chi tiết đặt lịch</h3>
                <span className="mx-auto flex w-32 border-b"></span>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Họ và tên:</span>{' '}
                  <span className="mx-4 capitalize">
                    {data.customer_id.customer_name || 'Khách hàng đặt lịch'}
                  </span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Số điện thoại:</span>
                  <span className="mx-4 ">{data.customer_phone || 'Chưa cập nhập'}</span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Thời gian đặt lịch:</span>
                  <span className="mx-4 capitalize">
                    {moment(timeSlice).format('DD/MM/YYYY , h:mm a')}
                  </span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Dịch vụ lựa chọn:</span>
                  <span className="mx-4 capitalize">{data.service_id.service_name}</span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Phí dịch vụ:</span>
                  <span className="mx-4">{changeDisplayPrices(data.service_id.service_price)}</span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Nhân viên tiếp nhận:</span>
                  <span className="mx-4">{data.staff_id.user_id.name}</span>
                </p>
              </div>
              <div className="flex items-center justify-between border-t pt-5 capitalize">
                <Link to="/" className="group">
                  <button className="flex items-center justify-between space-x-2 rounded-md py-2 px-5 duration-700 group-hover:-translate-x-2 group-hover:bg-[#f7a0bf]">
                    <i className="fas fa-long-arrow-alt-left text-xl"></i>
                    <span className="group-hover:underline">Trang chủ</span>
                  </button>
                </Link>
                <Link to="/historyService" className="group">
                  <button className="flex items-center justify-between space-x-2 rounded-md py-2 px-5 duration-700 group-hover:translate-x-2 group-hover:bg-[#f7a0bf]">
                    <span className="group-hover:underline">Lịch sử đặt lịch</span>
                    <i className="fas fa-long-arrow-alt-right text-xl"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default DetailAppointmentClient;
