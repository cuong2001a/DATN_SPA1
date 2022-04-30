import React, { useState } from 'react';
import { Fragment, useEffect } from 'react';
import CreateService from './CreateService';
import UpdateService from './UpdateService';
import { staffSTT } from 'Features/type/enumStatus';
import { checkTimeWork } from 'Utils/Utils';
import ListAttendance from 'Features/Admin/Components/Components/AttendanceStaff/ListAttendance';
import { useHistory } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ReactPaginate from 'react-paginate';

import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const ScreenTab3 = (props) => {
  const history = useHistory();
  // thêm mới
  let [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(...props.data);
  const [display, setDisplay] = useState(false);
  const newPerPage = 5;
  const [pageNumber, setPageNumber] = useState(0);
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(data?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => isSameTime());

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const closeModal = () => {
    setIsOpen(false);
  };

  // sửa
  let [repairModal, setRepairModal] = useState(false);

  const closeRepair = () => {
    setRepairModal(false);
  };
  const openRepair = () => {
    setRepairModal(true);
  };
  const [attendanceModel, setAttendanceModel] = useState(false);
  const closeAttendance = () => {
    setAttendanceModel(false);
  };

  function handleCondition(key) {
    if (key === 'all') {
      setData(props.data);
      return;
    }
    const dataS = props.data;
    setData(dataS.filter((item) => item.status === Number(key)));
  }

  function isSameTime() {
    const state = checkTimeWork();
    setDisplay(state);
  }

  return (
    <Fragment>
      <main>
        <div className="w-full rounded-md bg-white p-8">
          <div className="space-y-2 px-4 py-4 md:px-10">
            <div className="flex items-center justify-between pb-4">
              <p
                tabIndex="0"
                className="text-base font-bold leading-normal text-gray-800 focus:outline-none sm:text-lg md:text-xl lg:text-2xl">
                Danh sách nhân viên
              </p>
            </div>
            <div className="items-center justify-between sm:flex">
              <div className="flex items-center">
                <button className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                  <div
                    onClick={() => handleCondition('all')}
                    className="rounded bg-indigo-100 py-2 px-8 text-indigo-700">
                    <p>Tất cả</p>
                  </div>
                </button>
                <button className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8">
                  <div
                    onClick={() => handleCondition(Object.keys(staffSTT)[1])}
                    className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 ">
                    <p>Đang có ca</p>
                  </div>
                </button>
                <button className="ml-4 rounded focus:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-800 sm:ml-8">
                  <div
                    onClick={() => handleCondition(Object.keys(staffSTT)[0])}
                    className="rounded py-2 px-8 text-gray-600 hover:bg-indigo-100 hover:text-indigo-700 ">
                    <p>Đang trống ca</p>
                  </div>
                </button>
              </div>
              {display && (
                <ButtonComponent
                  color="#3b82f6"
                  mes="Điểm danh"
                  callBack={() => setAttendanceModel(true)}
                />
              )}
            </div>
          </div>
        </div>
        {!data || data.length === 0 ? (
          <div>
            <div className="flex h-screen items-center justify-center">
              <h1 className="text-3xl font-bold text-gray-900">Không có dữ liệu</h1>
            </div>
          </div>
        ) : (
          <div>
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-scroll rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        <div className="ml-5">#</div>
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        Tên nhân viên
                      </th>
                      <th className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                        số điện thoại
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
                    {data &&
                      data?.slice(pageVisited, pageVisited + newPerPage)?.map((person, index) => (
                        <tr key={index}>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            {index + 1}
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div className="flex items-center">
                              <div>
                                <p className="whitespace-no-wrap text-gray-900">
                                  {person.user_id.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p className="whitespace-no-wrap text-gray-900">
                              {!person.user_id.phoneNumber
                                ? 'Chưa cập nhật'
                                : person.user_id.phoneNumber}
                            </p>
                          </td>
                          <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                              <span
                                aria-hidden
                                className="absolute inset-0 rounded bg-green-200 opacity-50"></span>
                              <span className="relative">{staffSTT[person.status]}</span>
                            </span>
                          </td>
                          <td className="space-x-3 border-b border-gray-200 bg-white px-5 text-sm">
                            <Fab
                              onClick={() =>
                                history.push('/admin/staff/schedule', {
                                  id: person.user_id._id,
                                  role: person.user_id.role
                                })
                              }
                              style={{ zIndex: 1 }}
                              color="info"
                              aria-label="edit"
                              size="medium">
                              <RemoveRedEyeIcon size="small" />
                            </Fab>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <CreateService isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
        <UpdateService isOpen={repairModal} setIsOpen={setRepairModal} closeModal={closeRepair} />
        <ListAttendance
          isOpen={attendanceModel}
          setIsOpen={setAttendanceModel}
          closeModal={closeAttendance}
          data={props.data}
        />
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
      </main>
    </Fragment>
  );
};

export default ScreenTab3;
