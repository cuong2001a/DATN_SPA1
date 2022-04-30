import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userRole } from 'Features/type/enumUser';
import RoleUser from './RoleUser';
import DetailUser from './DetailUser';
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import { UpdateUser } from 'Features/Slice/Users/UserSlice';
import { notifyError, filterCharater } from 'Utils/Utils';
import Loading from 'Utils/Loading/Loading';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Fab from '@mui/material/Fab';

const ListUser = () => {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const [pageNumber, setPageNumber] = useState(0);
  const users = useSelector((state) => state.user.current);
  const services = useSelector((state) => state.service.current);

  const [dataDetail, setDataDetail] = useState();
  const [dataUsers, setDataUsers] = useState(
    users.filter((item) => item.role === Number(Object.keys(userRole)[0]))
  );

  const newPerPage = 5;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(dataUsers?.length / newPerPage);
  const [tab, setTab] = useState(0);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  function handleDetail(data) {
    setDataDetail(data);
    openModal();
  }

  useEffect(() => {
    const isAdmin = tab === 0 ? true : false;
    setDataUsers(users.filter((item) => (isAdmin ? item.role === 0 : item.role !== 0)));
  }, [isLoading, tab, users]);

  async function handleDeactivate(id) {
    setIsLoading(true);
    try {
      await dispatch(UpdateUser({ id, verify: false }));
    } catch (error) {
      notifyError('Có lỗi xảy ra');
    }
    setIsLoading(false);
  }

  const deactivateAccount = (id) => {
    confirmAlert({
      title: 'Bạn có chắc muốn khóa tài khoản?',
      buttons: [
        {
          label: 'Vô hiệu hóa',
          onClick: () => handleDeactivate(id)
        },
        {
          label: 'Trở lại'
        }
      ]
    });
  };

  const openLockAccount = (id) => {
    confirmAlert({
      title: 'Bạn có chắc muốn Kích hoạt lại?',
      buttons: [
        {
          label: 'Kích hoạt lại',
          onClick: () => handlOpenLock(id)
        },
        {
          label: 'Trở lại'
        }
      ]
    });
  };

  async function handlOpenLock(id) {
    setIsLoading(true);
    try {
      await dispatch(UpdateUser({ id, verify: true }));
    } catch (error) {
      notifyError('Có lỗi xảy ra');
    }
    setIsLoading(false);
  }

  function handleSearch(data) {
    const isAdmin = tab === 0 ? true : false;
    if (data.trim() === '') {
      setDataUsers(users.filter((item) => (isAdmin ? item.role === 0 : item.role !== 0)));
      return;
    }
    setDataUsers([]);
    setDataUsers(
      filterCharater(
        data,
        users.filter((item) => (isAdmin ? item.role === 0 : item.role !== 0))
      )
    );
  }

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Quản lý tài khoản</h3>
          <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label={'Admin'} {...a11yProps('admin')} />
                <Tab label={'User'} {...a11yProps('user')} />
              </Tabs>
            </Box>
          </div>
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
        {dataUsers?.length === 0 ? (
          <div>
            <div className="flex h-screen items-center justify-center">
              <h1 className="text-3xl font-bold text-gray-900">Không có dữ liệu</h1>
            </div>
          </div>
        ) : (
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
                          className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          Tùy chọn
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {dataUsers &&
                        dataUsers
                          ?.slice(pageVisited, pageVisited + newPerPage)
                          ?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">
                                  {index + 1}
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <img
                                        className="h-10 w-10 rounded-full"
                                        src={
                                          item.photoURL
                                            ? item.photoURL
                                            : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'
                                        }
                                        alt=""
                                      />
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900">
                                        {item.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <div className="text-sm text-gray-500">{item.phoneNumber}</div>
                                </td>
                                <td className="whitespace-nowrap px-6 py-4">
                                  <div className="text-sm text-gray-900">{item.email}</div>
                                </td>
                                <td className="group relative whitespace-nowrap px-6 py-4 text-center">
                                  <button className="inline-flex w-40 rounded bg-green-100 px-6 py-2 text-xs font-semibold leading-5 text-green-800 shadow">
                                    {userRole[item.role]}
                                  </button>
                                  {item.role === 0 || (
                                    <RoleUser services={services} role={item.role} id={item._id} />
                                  )}
                                </td>
                                <td className="flex items-center  justify-center whitespace-nowrap px-6 py-8 text-base font-medium">
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
                                  {item.verify ? (
                                    <div className="z-[1]  inline-block">
                                      <Fab
                                        onClick={() => deactivateAccount(item._id)}
                                        color="error"
                                        aria-label="edit"
                                        size="medium"
                                      >
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
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                          />
                                        </svg>
                                      </Fab>
                                    </div>
                                  ) : (
                                    <div className="z-[1] inline-block">
                                      <Fab
                                        onClick={() => openLockAccount(item._id)}
                                        color="success"
                                        aria-label="edit"
                                        size="medium"
                                      >
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
                                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                          />
                                        </svg>
                                      </Fab>
                                    </div>
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
        )}
      </div>

      {dataDetail && (
        <DetailUser
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          data={dataDetail}
        />
      )}
      {isLoading && <Loading />}
    </div>
  );
};

export default ListUser;
