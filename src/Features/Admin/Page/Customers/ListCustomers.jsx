import { customersSTT } from 'Features/type/enumStatus';
import React from 'react';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import DetailCustomer from './DetailCustomer';
import StatusCustomer from './StatusCustomer';
import { Fab } from '@mui/material';

const ListCustomers = ({ customers }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 5;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(customers?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [dataDetail, setDataDetail] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  function handleDetail(data) {
    setDataDetail(data);
    openModal();
  }

  if (!customers || customers?.length === 0)
    return <p className="text-[20px]">Không có dữ liệu khách hàng...</p>;
  return (
    <div className="flex w-full flex-col">
      <div className="-my-2  sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className=" border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-h-[385px] min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Tên
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Số điện thoại
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Địa chỉ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Giới tính
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Liệu trình quan tâm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Số lần liên hệ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {customers &&
                  customers?.slice(pageVisited, pageVisited + newPerPage)?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.customer_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.customer_phone}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.customer_address}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.customer_gender === 0 ? 'Nam' : item.customer_gender === 1 && 'Nữ'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <ul>
                            {item.customer_type?.map((item, index) => {
                              return <li key={index}>{item?.treatment || 'Dịch vụ'}</li>;
                            })}
                          </ul>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.counts}
                        </td>
                        <td className="group relative w-48 cursor-pointer whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <span className="inline-flex w-48 rounded bg-green-100 px-6 py-2 text-center text-xs font-semibold leading-5 text-green-800 shadow">
                            {customersSTT[item?.status]}
                          </span>
                          <StatusCustomer id={item._id} status={item?.status} />
                        </td>
                        <td className="flex items-center justify-end gap-[10px] whitespace-nowrap px-6 py-4 text-right text-base font-medium">
                          <div className="z-[1] mx-4  inline-block">
                            <Fab
                              onClick={() => handleDetail(item)}
                              color="primary"
                              aria-label="edit"
                              size="medium"
                            >
                              {' '}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                                />
                              </svg>{' '}
                            </Fab>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <ReactPaginate
              breakLabel="...."
              previousLabel={'Prev'}
              nextLabel={'Next'}
              pageCount={countPage}
              onPageChange={changePage}
              containerClassName={'paginationBttns flex justify-end my-5 mx-5 items-center'}
              previousLinkClassName={
                'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              nextLinkClassName={
                'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              pageClassName={
                'flex justify-center items-center w-[30px] relative h-[35px] mx-1 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg leading-tight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              pageLinkClassName={'w-full h-full absolute text-center pt-[8px]'}
              activeClassName={'paginationActive text-blue-600 bg-blue-100'}
            />
          </div>
        </div>
      </div>

      {dataDetail && (
        <DetailCustomer
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          data={dataDetail}
        />
      )}
    </div>
  );
};

export default ListCustomers;
