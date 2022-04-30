import React, { useState } from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CreateWarehouseStaff from './CreateDetailsStaff';
import CreateTool from './CreateTool';
import UpdateWarehouseStaff from './UpdateDetailsStaff';

const WarehouseStaff = (props) => {
  // thêm mới sản phẩm
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  // thêm mới dụng cụ
  let [isOpenTool, setIsOpenTool] = useState(false);
  const closeToolModal = () => {
    setIsOpenTool(false);
  };
  const openToolModal = () => {
    setIsOpenTool(true);
  };

  // sửa
  let [repairModal, setRepairModal] = useState(false);

  const closeRepair = () => {
    setRepairModal(false);
  };
  const openRepair = () => {
    setRepairModal(true);
  };

  // --------------------
  const persons = [
    {
      name: 'Nhân viên 1',
      phone: '1111111111',
      service: 'Nhân viên kho',
      status: 'còn'
    },
    {
      name: 'Nhân viên 2',
      phone: '2222222222',
      service: 'Nhân viên kho',
      status: 'hết'
    }
  ];
  return (
    <Fragment>
      <main>
        <div className="w-full rounded-md bg-white p-8">
          <div className="space-y-2 px-4 py-4 md:px-10">
            <div className="flex items-center justify-between pb-4">
              <p
                tabIndex="0"
                className="text-base font-bold leading-normal text-gray-800 focus:outline-none sm:text-lg md:text-xl lg:text-2xl"
              >
                Danh sách sản phẩm/ dụng cụ
              </p>
            </div>
            <div className="items-center justify-between sm:flex">
              <div className="flex items-center">
                <Link
                  to=""
                  className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800"
                >
                  <div className="rounded bg-indigo-100 py-2 px-8 text-indigo-700">
                    <p>Tất cả</p>
                  </div>
                </Link>
                <Link
                  to=""
                  className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
                >
                  <div className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 ">
                    <p>Còn hàng</p>
                  </div>
                </Link>
                <Link
                  to=""
                  className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
                >
                  <div className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 ">
                    <p>Hết hàng</p>
                  </div>
                </Link>
                <Link
                  to=""
                  className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8"
                >
                  <div className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 ">
                    <p>Sắp hết</p>
                  </div>
                </Link>
              </div>
              <div className="space-x-5">
                <button
                  onClick={openModal}
                  className="mt-4 inline-flex items-start justify-start rounded bg-indigo-700 px-6 py-3 hover:bg-indigo-600 
                            focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:mt-0"
                >
                  <p className="text-sm font-medium leading-none text-white">Thêm mới sản phẩm</p>
                </button>
                <button
                  onClick={openToolModal}
                  className="mt-4 inline-flex items-start justify-start rounded bg-indigo-700 px-6 py-3 hover:bg-indigo-600 
                            focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 sm:mt-0"
                >
                  <p className="text-sm font-medium leading-none text-white">Thêm mới dụng cụ</p>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        <div className="ml-5">#</div>
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Tên sản phẩm/ dụng cụ
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        số lượng
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        dịch vụ
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        trạng thái
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        hoạt động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {persons &&
                      persons.map((person) => (
                        <tr>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="ml-5">
                              <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-sm bg-gray-200">
                                <input
                                  placeholder="checkbox"
                                  type="checkbox"
                                  className="checkbox absolute h-full w-full cursor-pointer opacity-0 focus:opacity-100"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="whitespace-no-wrap text-gray-900">{person.name}</p>
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">{person.phone}</p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap capitalize text-gray-900">
                              {person.service}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden
                                className="absolute inset-0 rounded bg-green-200 opacity-50"
                              ></span>
                              <span className="relative">{person.status}</span>
                            </span>
                          </td>
                          <td className="space-x-3 border-b border-gray-200 bg-white py-5 text-sm">
                            <button className="rounded p-3 capitalize ">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              onClick={openRepair}
                              className="rounded p-3 capitalize text-blue-500"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="rounded p-3 capitalize text-red-500">
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <CreateWarehouseStaff isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
        <CreateTool isOpen={isOpenTool} setIsOpen={setIsOpenTool} closeModal={closeToolModal} />
        <UpdateWarehouseStaff
          isOpen={repairModal}
          setIsOpen={setRepairModal}
          closeModal={closeRepair}
        />
      </main>
    </Fragment>
  );
};

export default WarehouseStaff;
