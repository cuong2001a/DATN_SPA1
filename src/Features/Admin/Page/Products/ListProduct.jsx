import { RemoveProduct } from 'Features/Slice/Product/ProductSlice';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { changeDisplayPrices } from 'Utils/Utils';
import { confirmAlert } from 'react-confirm-alert';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ListProduct = ({ products, categories, brands, setDetailItem, setIsOpen, setIsEdit }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 5;
  const dispatch = useDispatch();
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(products?.length / newPerPage);
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
      title: 'Bạn có chắc muốn xóa sản phẩm này ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              dispatch(RemoveProduct(id));
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
                    Tên sản phẩm
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
                    Danh mục
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Thương hiệu
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Số lượng sản phẩm
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Giá
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Giảm giá
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
                {products &&
                  products?.slice(pageVisited, pageVisited + newPerPage)?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-0 py-2 text-sm font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {item.product_name}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          <div className="mx-auto h-16 w-16">
                            <img
                              src={item.product_album[0]}
                              className="h-full w-full"
                              alt="Ảnh sản phẩm"
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {categories?.map((cateItem) => {
                            if (cateItem?._id === item.category_id?._id) {
                              return cateItem.category_name;
                            }
                          })}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {brands?.map((brand) => {
                            if (brand?._id === item.brand_id?._id) {
                              return brand.brand_name;
                            }
                          })}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {item.product_amount}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {changeDisplayPrices(item.product_price)}
                        </td>
                        <td className="whitespace-nowrap px-0 py-2 text-sm text-gray-500">
                          {changeDisplayPrices(item.product_sale)}
                        </td>
                        <td className="flex justify-center whitespace-nowrap px-0 py-2 text-center text-base font-medium">
                          <div onClick={() => getId(item)} className="z-[1] rounded p-3 capitalize">
                            <Fab color="info" aria-label="edit" size="medium">
                              <EditIcon fontSize="small" />
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

export default ListProduct;
