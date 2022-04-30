import { RemoveBlog } from 'Features/Slice/Blog/BlogSlice';
import React, { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ListBlog = ({ blog, setDetailItem, setIsOpen, setIsEdit }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 5;
  const dispatch = useDispatch();
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(blog?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const getId = (item) => {
    setDetailItem(item);
    setIsOpen(true);
    setIsEdit(true);
  };

  const deleteById = (id) => {
    confirmAlert({
      title: 'Bạn có chắc muốn xóa bài viết này ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              dispatch(RemoveBlog(id));
            } catch (error) {
              console.log(error);
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
                    className="px-6 py-3 text-center  text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center  text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Tên bài viết
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Ảnh
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Mô tả
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Tác giả
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center  text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200 bg-white text-center">
                {blog &&
                  blog?.slice(pageVisited, pageVisited + newPerPage)?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-0 py-2 text-sm font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {item.title}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          <div className="mx-auto h-16 w-16">
                            <img src={item.album[0]} className="h-full w-full" alt="Ảnh sản phẩm" />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          <p
                            className="description align-baseline"
                            style={{
                              width: '400px',
                              display: '-webkit-flex',
                              WebkitLineClamp: 3,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              wordBreak: 'break-word'
                            }}
                          >
                            {' '}
                            {item.description}{' '}
                          </p>
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {item.author}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {item.active ? (
                            <span className="text-base font-bold text-green-400">Công khai</span>
                          ) : (
                            <span className="text-base font-bold text-red-400">Ẩn danh</span>
                          )}
                        </td>
                        <td className="flex items-center justify-center whitespace-nowrap px-0 text-center text-base font-medium">
                          <div
                            onClick={() => getId(item)}
                            className="z-[1] rounded p-3  capitalize"
                          >
                            <Fab color="info" aria-label="edit" size="medium">
                              <BorderColorOutlinedIcon fontSize="small" />
                            </Fab>
                          </div>
                          <div
                            onClick={() => deleteById(item._id)}
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
    </div>
  );
};

export default ListBlog;
