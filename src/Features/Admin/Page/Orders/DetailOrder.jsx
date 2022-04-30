import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { changeDisplayPrices } from 'Utils/Utils';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const DetailOrder = (props) => {
  const { cart } = props?.detailItem;
  const ExitModel = () => {
    props.closeModal();
  };
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={() => ExitModel()}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-700 opacity-50" />
          </Transition.Child>
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block transform overflow-hidden rounded-2xl bg-gradient-to-b from-sky-400 to-sky-200 px-3 py-3 text-left align-middle shadow-xl transition-all">
              <div className="m-5 bg-white p-5">
                <div className="mb-3 flex items-center justify-between border-b-2">
                  <h3 className="mb-2 text-2xl font-bold text-gray-700">Chi tiết đơn hàng</h3>
                </div>
                <h3 className="text-base font-bold">Thông tin khách hàng</h3>
                <div className="info_customer mb-5 flex items-center justify-between gap-5">
                  <div className="flex flex-col">
                    <span>Tên khách hàng: {props?.detailItem.name}</span>
                    <span>Số điện thoại: {props?.detailItem.phoneNumber}</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Địa chỉ : {props?.detailItem.address}</span>
                    <span>Email : {props?.detailItem.email}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold">Thông tin đơn hàng</h3>
                <div className="detail-order mb-5 border-b border-gray-200 shadow sm:rounded-lg">
                  <table className="min-h-[285px]  min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-2 text-center">#</th>
                        <th className="p-2 text-center">Tên sản phẩm</th>
                        <th className="p-2 text-center">Ảnh sản phẩm</th>
                        <th className="p-2 text-center">Số lượng </th>
                        <th className="p-2 text-center">Giá tiền</th>
                        <th className="p-2 text-center">Tổng tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.map((item, index) => {
                        return (
                          <tr key={item.id} className="border-b-2">
                            <td className="p-3 text-center">
                              <span>{index + 1}</span>
                            </td>
                            <td className="p-3 text-center">
                              <span>{item.name}</span>
                            </td>
                            <td className=" p-3">
                              <img
                                src={item.image}
                                className="mx-auto h-[100px] w-[100px]"
                                alt=""
                              />
                            </td>
                            <td className="p-3 text-center">
                              <span>{item.quantity}</span>
                            </td>
                            <td className="p-3 text-center">
                              <span>{changeDisplayPrices(item.price)}</span>
                            </td>
                            <td className="p-3 text-center">
                              <span>{changeDisplayPrices(item.price * item.quantity)}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <ButtonComponent
                    config="inline-flex justify-center"
                    mes=" Trở lại"
                    callBack={props.closeModal}
                  />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DetailOrder;
