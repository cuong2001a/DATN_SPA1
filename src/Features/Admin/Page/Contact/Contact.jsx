import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userRole } from 'Features/type/enumUser';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import { UpdateUser } from 'Features/Slice/Users/UserSlice';
import { notifyError, filterCharater } from 'Utils/Utils';
import Loading from 'Utils/Loading/Loading';
import { listContact } from 'Services/contact';
import { ListContact } from 'Features/Slice/Contact/ContactSlice';
import StatusContact from './StatusContact';
import { contactSTT } from 'Features/type/enumStatus';

const Contact = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const [dataContact, setDataContact] = useState([]);
  const newPerPage = 3;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(dataContact?.length / newPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  function handleSearch(data) {
    if (data.trim() === '') {
      // setDataUsers(users);
      return;
    }
  }

  useEffect(async () => {
    try {
      const data = await dispatch(ListContact());
      await setDataContact(data.payload.data);
    } catch (error) {
      console.log(error);
    }
  }, [dataContact]);

  if (!dataContact || dataContact?.length === 0)
    return <p className="text-[20px]">Không có dữ liệu thông tin liên hệ...</p>;
  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Quản lý thông tin liên hệ</h3>
          <div className="relative text-gray-600">
            <input
              onKeyUp={(e) => handleSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              className="h-10 w-full rounded-lg border bg-white px-5 text-sm focus:outline-none xl:w-64"
            />
            <span type="submit" className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="-my-2  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className=" border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-h-[402px] min-w-full divide-y divide-gray-200">
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
                        Họ và tên
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
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Tiêu đề
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Nội dung
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {dataContact &&
                      dataContact
                        ?.slice(pageVisited, pageVisited + newPerPage)
                        ?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">
                                {index + 1}
                              </td>
                              <td className="whitespace-nowrap py-4 px-6">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.name}
                                  </div>
                                </div>
                              </td>
                              <td className="whitespace-nowrap py-4 px-6">
                                <div className="text-sm text-gray-500">{item.phone}</div>
                              </td>
                              <td className="whitespace-nowrap py-4 px-6">
                                <div className="text-sm text-gray-900">
                                  {item.email ? item.email : 'Đang cập nhật'}
                                </div>
                              </td>
                              <td className="w-[10%] px-4 py-4">
                                <div className="text-sm text-gray-900">
                                  {item.content ? item.content : 'Tiêu đề trống'}
                                </div>
                              </td>
                              <td className="group relative w-[30%] px-4 py-4 text-center">
                                <div className="text-sm text-gray-900">
                                  {item.content_confirm ? item.content_confirm : 'Nội dung trống'}
                                </div>
                              </td>
                              <td className="group relative w-48 cursor-pointer whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                <span className="inline-flex w-48 rounded bg-green-100 px-6 py-2 text-center text-xs font-semibold leading-5 text-green-800 shadow">
                                  {contactSTT[item?.status]}
                                </span>
                                {item.status === 0 ? (
                                  <StatusContact id={item._id} status={item?.status} />
                                ) : (
                                  ''
                                )}
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
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

export default Contact;
