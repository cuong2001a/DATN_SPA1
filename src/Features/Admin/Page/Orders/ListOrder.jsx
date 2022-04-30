import { Fab } from '@mui/material';
import { RemoveOrder } from 'Features/Slice/Order/OrderSlice';
import { orderSTT } from 'Features/type/enumStatus';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { readOrder } from 'Services/order';
import Loading from 'Utils/Loading/Loading';
import { notifyError, notifySuccess } from 'Utils/Utils';
import RoleOrder from './RoleOrder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const ListOrderTable = (props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const newPerPage = 5;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(props.order?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const getId = async (item) => {
    try {
      const { data } = await readOrder(item._id);
      props.setDetailItem(data);
      props.setIsOpen(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [isLoading]);

  const deleteById = (id) => {
    confirmAlert({
      title: 'Bạn có chắc muốn xóa đơn đặt hàng này ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              dispatch(RemoveOrder(id));
              notifySuccess('Xóa thành công');
              setIsLoading(true);
            } catch (error) {
              notifyError('Xóa thất bại');
            }
          }
        },
        {
          label: 'No'
        }
      ],
      closeOnEscape: true,
      onClickOutside: true
    });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="-my-2  sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className=" border-b border-gray-200 shadow sm:rounded-lg">
            <table className=" min-h-[385px] min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 ">
                <tr className="">
                  <th
                    scope="col"
                    className="px-3 py-1 text-center  text-xs font-medium uppercase tracking-wider text-gray-500">
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1 text-center  text-xs font-medium uppercase tracking-wider text-gray-500">
                    Tên người đặt
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Số điện thoại
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Địa chỉ
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1 text-center  text-xs font-medium uppercase tracking-wider text-gray-500">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white text-center">
                {props.order &&
                  props.order?.slice(pageVisited, pageVisited + newPerPage)?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td className="whitespace-nowrap  text-center text-sm font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap  text-center">
                          <div className="flex items-center justify-center">
                            <div>
                              <div className="text-center text-sm font-medium text-gray-900">
                                {item.user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap  text-center">
                          <div className="flex items-center justify-center">
                            <div>
                              <div className="text-center text-sm font-medium text-gray-900">
                                {item.user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap  text-center">
                          <div className="flex items-center justify-center">
                            <div>
                              <div className="text-center text-sm font-medium text-gray-900">
                                {item.phoneNumber}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap  text-center">
                          <div className="flex items-center justify-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900 ">
                                {item.address}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="group relative whitespace-nowrap  text-center">
                          <button className=" w-100 inline-flex rounded bg-green-100 px-6 py-2 text-xs font-semibold leading-5 text-green-800 shadow">
                            {orderSTT[item.status]}
                          </button>
                          {
                            <RoleOrder
                              setIsLoading={setIsLoading}
                              role={item.status}
                              id={item._id}
                            />
                          }
                        </td>
                        <td className="flex justify-center whitespace-nowrap  text-right text-base font-medium">
                          <div
                            onClick={() => getId(item)}
                            className="z-[1] rounded p-3  capitalize">
                            <Fab color="info" aria-label="edit" size="medium">
                              <InfoOutlinedIcon fontSize="small" />
                            </Fab>
                          </div>{' '}
                          <div
                            onClick={() => deleteById(item._id)}
                            className="z-[1] rounded p-3  capitalize">
                            <Fab color="warning" aria-label="edit" size="medium">
                              <DeleteIcon color="secondary" fontSize="medium" />
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
            {isLoading && <Loading />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOrderTable;
