import React from 'react';
import { useSelector } from 'react-redux';
import { Fragment, useState, useEffect } from 'react';
import ListCustomers from './ListCustomers';
import CreateCustomers from './CreateCustomers';
import { useForm } from 'react-hook-form';
import { customersSTT } from 'Features/type/enumStatus';

const Customers = () => {
  const customers = useSelector((state) => state.customer.current);
  const [dataCustomers, setDataCustomers] = useState(customers);
  useEffect(() => {
    setDataCustomers(customers);
  }, [customers]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleCondition(key) {
    if (key === 'all') {
      setDataCustomers(customers);
      return;
    }
    const dataByStatus = customers;
    setDataCustomers(dataByStatus.filter((item) => item.status === Number(key)));
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Quản lý khách hàng</h3>
          <div></div>
        </div>

        <div className="items-center justify-between sm:flex">
          <div className="flex items-center">
            <button className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
              <div
                onClick={() => handleCondition('all')}
                className="rounded bg-indigo-100 py-2 px-8 text-indigo-700"
              >
                <p>Tất cả</p>
              </div>
            </button>
            <button className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8">
              <div
                onClick={() => handleCondition(Object.keys(customersSTT)[0])}
                className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 "
              >
                <p>Chưa liên hệ</p>
              </div>
            </button>
            <button className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8">
              <div
                onClick={() => handleCondition(Object.keys(customersSTT)[1])}
                className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 "
              >
                <p>Đã liên hệ</p>
              </div>
            </button>
            <button className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8">
              <div
                onClick={() => handleCondition(Object.keys(customersSTT)[2])}
                className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 "
              >
                <p>Đã đặt lịch thành công</p>
              </div>
            </button>
            <button className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8">
              <div
                onClick={() => handleCondition(Object.keys(customersSTT)[3])}
                className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 "
              >
                <p>Đã đặt lịch thất bại</p>
              </div>
            </button>
          </div>
          <button
            onClick={openModal}
            className="mt-2 rounded border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-base text-gray-100 focus:border-2"
          >
            Thêm mới
          </button>
        </div>

        <CreateCustomers
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          register={register}
          handleSubmit={handleSubmit}
          reset={reset}
          errors={errors}
        />

        <ListCustomers customers={dataCustomers} />
      </div>
    </Fragment>
  );
};

export default Customers;
