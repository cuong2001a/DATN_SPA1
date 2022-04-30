import React from 'react';
import { Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import moment from 'moment';
import { changeDisplayPrices } from 'Utils/Utils';
import { treatmentSTT } from 'Features/type/enumStatus';

const DetailAppointment = (props) => {
  const { data } = props;
  const timeSlice = data.appointment_date.slice(0, 16);
  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 overflow-y-auto pt-[9%] font-nunito"
      >
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
          }}
        ></div>
        <div className="flex flex-wrap items-center justify-center font-nunito ">
          <div className="easy-in-out container relative transform rounded-2xl bg-white shadow-lg duration-200 md:w-1/2">
            <div className="h-32 overflow-hidden">
              <img
                className="w-full rounded-xl"
                src="https://thumbs.dreamstime.com/b/spa-background-spa-concept-white-stone-background-tropical-leaves-flowers-candle-zen-like-grey-stones-top-view-copy-space-187643849.jpg"
                alt=""
              />
            </div>
            <div className="p-5 text-lg">
              <h3 className="text-center text-3xl">Chi tiết đặt lịch</h3>
              <button
                onClick={props.closeModal}
                type="button"
                className="absolute -top-1 -right-1 z-40 rounded-full bg-white stroke-black p-1 text-4xl font-bold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-end gap-10 px-10 pb-5">
              <div className="space-y-5">
                <img
                  className="mx-auto h-24 w-24  rounded-full border-2 border-orange-300 object-cover object-center p-2"
                  src={
                    data.photoURL ||
                    'https://media.istockphoto.com/vectors/lotus-flower-sign-for-wellness-spa-and-yoga-vector-illustration-vector-id970778424?k=20&m=970778424&s=170667a&w=0&h=PPZpfUIRAyf5xvn84fpCMB1PuayeQ3QBi_lYydLElnY='
                  }
                  alt=""
                />
                <div className="info-order border-b ">
                  <p className="text-xl">
                    <span>Họ và tên:</span>
                    <span className="mx-4 capitalize">
                      {data.customer_id.customer_name || 'Khách hàng đặt lịch'}
                    </span>
                  </p>
                </div>
                <div className="info-order border-b ">
                  <p className="text-xl">
                    <span>Số điện thoại:</span>
                    <span className="mx-4 ">{data.customer_phone || 'Chưa cập nhập'}</span>
                  </p>
                </div>
                <div className="info-order border-b ">
                  <p className="text-xl">
                    <span>Thời gian đặt lịch :</span>
                    <span className="mx-4 capitalize">
                      {moment(timeSlice).format('DD/MM/YYYY , h:mm a')}
                    </span>
                  </p>
                </div>
                <div className="info-order border-b ">
                  <p className="text-xl">
                    <span>Dịch vụ lựa chọn:</span>
                    <span className="mx-4 capitalize">{data.service_id.service_name}</span>
                  </p>
                </div>
                <div className="info-order border-b ">
                  <p className="text-xl">
                    <span>Phí dịch vụ:</span>
                    <span className="mx-4 ">
                      {changeDisplayPrices(data.service_id.service_price)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="space-y-5">
                <img
                  className="mx-auto h-24 w-24  rounded-full border-2 border-orange-300 p-2"
                  src={
                    data.staff_id.user_id.photoURL ||
                    'https://media.istockphoto.com/vectors/lotus-flower-sign-for-wellness-spa-and-yoga-vector-illustration-vector-id970778424?k=20&m=970778424&s=170667a&w=0&h=PPZpfUIRAyf5xvn84fpCMB1PuayeQ3QBi_lYydLElnY='
                  }
                  alt=""
                />
                <div className="info-order border-b">
                  <p className="text-xl">
                    <span>Nhân viên tiếp nhận:</span>
                    <span className="mx-4 ">{data.staff_id.user_id.name}</span>
                  </p>
                </div>
                <div className="info-order border-b">
                  <p className="text-xl">
                    <span>Chức vụ:</span>
                    <span className="mx-4 ">
                      {data.staff_id.user_id.role === 0 ? 'Quản lí' : 'Nhân viên'}
                    </span>
                  </p>
                </div>
                <div className="info-order border-b">
                  <p className="text-xl">
                    <span>Thời gian thực hiện:</span>
                    <span className="mx-4 ">{data.service_id.service_time} Phút</span>
                  </p>
                </div>
                <div className="info-order border-b">
                  <p className="text-xl">
                    <span>Trạng thái đặt lịch:</span>
                    <span className="mx-4 animate-bounce rounded-md  px-4 py-1">
                      {treatmentSTT[data.appointment_status]}
                    </span>
                  </p>
                </div>
                <div className="info-order">
                  <p className="text-xl">
                    <span></span>
                    <span className="mx-4 animate-bounce rounded-md  px-4 py-1"></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default DetailAppointment;
