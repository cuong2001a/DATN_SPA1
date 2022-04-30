import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import { treatmentSTT } from 'Features/type/enumStatus';
import { Fragment, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import CreateAppointment from './CreateAppointment';
import DetailAppointment from './DetailAppointment';
import StatusAppointment from './StatusAppointment';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import ListTreatmentAppointment from '../Treatments/ListTreatmentAppointment';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Tab from '@mui/material/Tab';
import moment from 'moment';
import EditAppointment from './EditAppointment';

const Appointment = () => {
  const appointments = useSelector((state) => state.appointment.current);
  const [pageNumber, setPageNumber] = useState(0);
  const [dataDetail, setDataDetail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const newPerPage = 5;
  const pageVisited = pageNumber * newPerPage;
  const [dataApp, setDataApp] = useState(
    appointments.filter((item) => item.appointment_status === Object.keys(treatmentSTT)[0])
  );

  const countPage = Math.ceil(dataApp?.length / newPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const detailOrder = (item) => {
    setDataDetail(item);
    setIsOpen(true);
  };

  const dataEdit = (item) => {
    setDataDetail(item);
    setIsOpenEdit(true);
  };

  let [createAppointment, setCreateAppointment] = useState(false);

  const closeCreateAppointment = () => {
    setCreateAppointment(false);
  };

  const closeEditAppointment = () => {
    setIsOpenEdit(false);
  };

  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  useEffect(() => {
    setDataApp(appointments.filter((item) => item.appointment_status === tab));
  }, [appointments, tab]);

  return (
    <Fragment>
      <div className="flex flex-col gap-5">
        <ul
          className=" nav nav-tabs nav-justified flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
          id="tabs-tabJustify"
          role="tablist"
        >
          <li className="nav-item flex-grow text-center" role="presentation">
            <Link
              to="#tabs-saleAgent"
              className="nav-link active my-2 block w-full border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 font-nunito text-base font-semibold uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent"
              id="tabs-sale-agent"
              data-bs-toggle="pill"
              role="tab"
              aria-controls="tabs-saleAgent"
              aria-selected="false"
            >
              Lịch hẹn theo dịch vụ
            </Link>
          </li>
          <li className="nav-item flex-grow text-center" role="presentation">
            <Link
              to="#tabs-serviceStaff"
              className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 font-nunito text-base font-semibold uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent"
              id="tabs-service-staff"
              data-bs-toggle="pill"
              role="tab"
              aria-controls="tabs-serviceStaff"
              aria-selected="false"
            >
              Lịch hẹn theo liệu trình
            </Link>
          </li>
        </ul>
      </div>
      <div className="tab-content" id="tabs-tabContentJustify">
        <div
          className="active show tab-pane fade"
          id="tabs-saleAgent"
          role="tabpanel"
          aria-labelledby="tabs-sale-agent"
        >
          <div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Quản lý lịch hẹn</h3>
                <div>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                      {Object.keys(treatmentSTT).map((item, index) => {
                        return <Tab key={index} label={treatmentSTT[item]} {...a11yProps(item)} />;
                      })}
                    </Tabs>
                  </Box>
                </div>
                <ButtonComponent
                  callBack={() => setCreateAppointment(true)}
                  mes={'Thêm mới'}
                  color={'rgb(59 130 246 / var(--tw-bg-opacity))'}
                />
              </div>
              {dataApp.length === 0 ? (
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
                                Dịch vụ
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Thời gian
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Trạng thái
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500"
                              >
                                Tùy chỉnh
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {dataApp &&
                              dataApp
                                ?.slice(pageVisited, pageVisited + newPerPage)
                                ?.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-500">
                                        {index + 1}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                          <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                              {item?.customer_id?.customer_name || ''}
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-500">
                                          {item?.customer_id?.customer_phone}
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                          {item?.service_id?.service_name}
                                        </div>
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4 text-center">
                                        <div className="text-sm text-gray-900">
                                          {moment(item?.appointment_date.substring(0, 16)).format(
                                            'HH:mm DD/MM/YYYY'
                                          )}
                                        </div>
                                      </td>
                                      <td className="group relative whitespace-nowrap px-6 py-4 text-center">
                                        <span className="inline-flex w-40 rounded bg-green-100 px-6 py-2 text-center text-xs font-semibold leading-5 text-green-800 shadow">
                                          {treatmentSTT[item?.appointment_status]}
                                        </span>
                                        <StatusAppointment
                                          id={item._id}
                                          status={item?.appointment_status}
                                          staffId={item.staff_id._id}
                                          time={item.appointment_date}
                                        />
                                      </td>
                                      <td className=" my-auto whitespace-nowrap  text-right text-base font-medium">
                                        <div className="flex items-center justify-center ">
                                          <div
                                            onClick={() => detailOrder(item)}
                                            className="z-[1] rounded p-3 capitalize "
                                          >
                                            <Fab color="info" aria-label="edit" size="medium">
                                              <RemoveRedEyeIcon size="small" />
                                            </Fab>
                                          </div>

                                          <div className="z-[1] rounded p-3  capitalize ">
                                            {Number(item.appointment_status) !==
                                              Number(Object.keys(treatmentSTT)[2]) &&
                                              Number(item.appointment_status) !==
                                                Number(Object.keys(treatmentSTT)[3]) &&
                                              Number(item.appointment_status) !==
                                                Number(Object.keys(treatmentSTT)[4]) && (
                                                <Fab
                                                  onClick={() => dataEdit(item)}
                                                  color="info"
                                                  aria-label="edit"
                                                  size="medium"
                                                >
                                                  <EditIcon fontSize="small" />
                                                </Fab>
                                              )}
                                          </div>
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
                          containerClassName={
                            'paginationBttns flex justify-end my-5 mx-5 items-center'
                          }
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
          </div>
        </div>
        <div
          className="fade tab-pane"
          id="tabs-serviceStaff"
          role="tabpanel"
          aria-labelledby="tabs-service-staff"
        >
          <ListTreatmentAppointment />
        </div>
      </div>

      {dataDetail && (
        <DetailAppointment
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          data={dataDetail}
        />
      )}
      <CreateAppointment
        isOpen={createAppointment}
        setIsOpen={setCreateAppointment}
        closeModal={closeCreateAppointment}
      />
      {isOpenEdit && (
        <EditAppointment
          closeModal={closeEditAppointment}
          isOpen={isOpenEdit}
          setIsOpen={setIsOpenEdit}
          data={dataDetail}
        />
      )}
    </Fragment>
  );
};

export default Appointment;
