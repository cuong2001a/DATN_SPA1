import { RemoveCategory } from 'Features/Slice/Category/CategorySlice';
import React from 'react';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from 'Utils/Loading/Loading';

const ListCate = ({ categories, setDetailData }) => {
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 5;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(categories?.length / newPerPage);
  const [isLoading, setIsLoading] = useState(false);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleItem = (item) => {
    setDetailData(item);
  };
  const handleDelete = (id) => {
    confirmAlert({
      title: 'Bạn có chắc muốn xóa danh phẩm này ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setIsLoading(true);
            try {
              await dispatch(RemoveCategory(id));
            } catch (error) {
              console.log(error);
            }
            setIsLoading(false);
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
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 text-center">
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
                    Tên danh mục
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Ảnh
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Tùy chỉnh
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {categories &&
                  categories?.slice(pageVisited, pageVisited + newPerPage)?.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.category_name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="h-16 w-16 flex-shrink-0">
                            <img
                              className="h-16 w-16 shadow-2xl"
                              src={item.category_image}
                              alt=""
                            />
                          </div>
                        </td>
                        <td className="flex justify-center whitespace-nowrap px-6 py-4 text-right text-base font-medium">
                          <div
                            onClick={() => handleItem(item)}
                            className="z-[1] rounded p-3  capitalize"
                          >
                            <Fab color="info" aria-label="edit" size="medium">
                              <EditIcon fontSize="small" />
                            </Fab>
                          </div>
                          <div
                            onClick={() => handleDelete(item._id)}
                            className="z-[1] rounded p-3 capitalize"
                          >
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
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default ListCate;
