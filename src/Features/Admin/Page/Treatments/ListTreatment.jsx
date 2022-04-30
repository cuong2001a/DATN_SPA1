import { RemoveTreatment } from 'Features/Slice/Treatment/TreatmentSlice';
import { Fragment, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { changeDisplayPrices } from 'Utils/Utils';

const ListTreatment = (props) => {
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 5;
  const dispatch = useDispatch();
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(props.treatments?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const deleteById = (id) => {
    confirmAlert({
      title: 'Bạn có chắc muốn xóa lịch trình này ?',
      buttons: [
        {
          label: 'Đồng ý',
          onClick: async () => {
            try {
              dispatch(RemoveTreatment(id));
            } catch (error) {
              console.log(error);
            }
          }
        },
        {
          label: 'Trở lại'
        }
      ],
      closeOnEscape: true,
      onClickOutside: true
    });
  };

  return (
    <Fragment>
      <div className="flex w-full flex-col">
        <div className="-my-2  sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className=" border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-h-[385px] min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
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
                      Tên liệu trình
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Dịch vụ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Giá
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Giảm giá
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Thời gian
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Số lần thực hiện
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3  text-center text-xs font-medium uppercase tracking-wider text-gray-500"
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
                  {props.treatments &&
                    props.treatments
                      ?.slice(pageVisited, pageVisited + newPerPage)
                      ?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="whitespace-nowrap px-3 py-1 text-sm font-medium text-gray-500">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                              {item.treatment_id?.treatment_name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                              {item.service_id?.service_name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                              {changeDisplayPrices(item.treatment_id?.treatment_price)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                              {changeDisplayPrices(item.treatment_id?.treatment_sale)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-1 text-sm text-gray-500">
                              {item.treatment_id.treatment_duration} phút
                            </td>
                            <td className="whitespace-nowrap px-3  py-1 text-sm text-gray-500">
                              {item.treatment_id?.number_of_treatments}
                            </td>
                            <td className="whitespace-nowrap px-20  py-4 text-center text-sm text-gray-500">
                              {item.treatment_id.active ? 'Hoạt động' : 'Vô hiệu hóa'}
                            </td>

                            <td className=" my-auto whitespace-nowrap py-1 text-left text-base font-medium">
                              <div
                                onClick={() => {
                                  props.onDialog(true);
                                  props.onSetType(1);
                                  props.onSetItemEdit(item);
                                }}
                                className=" flex  justify-center rounded p-3 capitalize"
                              >
                                <Fab
                                  style={{ zIndex: 1 }}
                                  color="info"
                                  aria-label="edit"
                                  size="medium"
                                >
                                  <EditIcon fontSize="small" />
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
      </div>
    </Fragment>
  );
};

export default ListTreatment;
