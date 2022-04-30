import { Fab } from '@mui/material';
import { RemoveService } from 'Features/Slice/Service/ServiceSlice';
import React from 'react';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { changeDisplayPrices } from 'Utils/Utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateServices from './CreateService';

const ListServices = ({ services, categories, setIsLoading, isLoading }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 5;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(services?.length / newPerPage);
  const dispatch = useDispatch();
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsEdit(false);
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const [dataService, setDataService] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  function handleEdit(data) {
    setDataService(data);
    setIsEdit(true);
    openModal();
  }

  const handleConfirmDelete = (id) => {
    confirmAlert({
      title: 'Bạn có chắc muốn xóa dịch vụ  này ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setIsLoading(true);
            try {
              dispatch(RemoveService(id));
              setIsLoading(false);
            } catch (error) {}
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
                    Tên dịch vụ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Danh mục
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
                    Thời gian thực hiện
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {services &&
                  services?.slice(pageVisited, pageVisited + newPerPage)?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.service_name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {categories?.map((cateItem) => {
                            if (cateItem?._id === item.category_id?._id) {
                              return cateItem.category_name;
                            }
                          })}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {changeDisplayPrices(item.service_price)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {changeDisplayPrices(item.service_sale)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {item.service_time} phút
                        </td>
                        <td className="flex justify-center gap-3 whitespace-nowrap px-6 py-4 text-right text-base font-medium">
                          <Fab
                            onClick={() => handleEdit(item)}
                            disabled={isEdit}
                            color="info"
                            aria-label="edit"
                            size="medium"
                            style={{ zIndex: 1 }}
                          >
                            <EditIcon fontSize="small" />
                          </Fab>

                          <Fab
                            style={{ zIndex: 1 }}
                            onClick={() => handleConfirmDelete(item._id)}
                            color="warning"
                            aria-label="edit"
                            size="medium"
                          >
                            <DeleteIcon color="secondary" fontSize="medium" />
                          </Fab>
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

      {dataService && (
        <CreateServices
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          dataService={dataService}
          setDataService={setDataService}
          categories={categories}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </div>
  );
};

export default ListServices;
