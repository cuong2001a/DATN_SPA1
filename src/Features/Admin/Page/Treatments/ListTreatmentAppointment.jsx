import React, { Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import FormTreatmentAppointment from './FormTreatmentAppointment';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import { useSelector } from 'react-redux';
import { treatmentSTT } from 'Features/type/enumStatus';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TreatmentDetail from './TreatmentDetail';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateAppointmentTreatmentDetail from './CreateAppointmentTreatmentDetail';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EditAppointmentTreatment from './EditAppointmentTreatment';
import { changeDisplayPrices } from 'Utils/Utils';

const ListTreatmentAppointment = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 5;
  const pageVisited = pageNumber * newPerPage;
  const treatments = useSelector((state) => state.appointmentTreatment.current);
  const countPage = Math.ceil(treatments.length / newPerPage);
  const [dataApp, setDataApp] = useState(
    treatments.filter((item) => item.status === Object.keys(treatmentSTT)[0])
  );

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(undefined);

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleEdit = (item) => {
    setDataEdit(item);
    setOpenEdit(true);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = (bool) => {
    if (bool) {
      setIsOpen3(true);
    }
    setOpenDialog(false);
  };

  useEffect(() => {
    return () => setDataDetail(null);
  }, [setDataDetail]);

  const closeModal2 = () => {
    setIsOpen2(false);
  };
  const closeModal3 = () => {
    setIsOpen3(false);
  };

  const detailOrder = (item) => {
    setDataDetail(item);
    setIsOpen2(true);
  };

  const detailData = (item) => {
    setDataDetail(item);
    setIsOpen3(true);
  };

  function handleCheckProgress(item) {
    const index1 = item.progress.substring(0, 1);
    const index2 = item.progress.substring(2, item.progress.length);
    if (Number(index1) >= Number(index2)) {
      handleClickOpen();
      setDataDetail(item);
      return;
    }
    detailData(item);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
    setDataApp(treatments.filter((item) => item.status === tab));
  }, [treatments, tab]);

  return (
    <Fragment>
      <div className="my-5 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900">Quản lý liệu trình</h3>
        <div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
              {Object.keys(treatmentSTT).map((item, index) => {
                return <Tab key={index} label={treatmentSTT[item]} {...a11yProps(item)} />;
              })}
            </Tabs>
          </Box>
        </div>
        <ButtonComponent callBack={openModal} mes="Thêm mới" />
      </div>
      {dataApp.length === 0 ? (
        <div>
          <div className="flex h-screen items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-900">Không có dữ liệu</h1>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col">
          <div className="-my-2  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className=" border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-h-[385px] min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Họ và tên
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Số điện thoại
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Liệu trình
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                        Tổng tiền
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        Tiến trình
                      </th>
                      <th
                        scope="col"
                        className="w-48 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        Ghi chú
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        Trạng thái
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500">
                        Tùy chọn
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {dataApp.length > 0 &&
                      dataApp.slice(pageVisited, pageVisited + newPerPage).map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.customer_id.customer_name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.customer_id.customer_phone}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {item.treatment_id.treatment_name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {changeDisplayPrices(
                                Number(item.treatment_id.treatment_price) -
                                  Number(item.treatment_id.treatment_sale)
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">{item.progress}</td>
                            <td className=" h-40  w-48 px-6 py-4 ">
                              <div className=" h-32 w-48   overflow-y-scroll break-words">
                                {item.note}
                              </div>
                            </td>
                            <td className="group relative whitespace-nowrap px-6 py-4 text-center">
                              <span className="inline-flex w-40 rounded bg-green-100 px-6 py-2 text-center text-xs font-semibold leading-5 text-green-800 shadow">
                                {treatmentSTT[item.status]}
                              </span>
                            </td>
                            <td className="my-auto whitespace-nowrap">
                              <div className="flex items-center justify-center">
                                <div
                                  onClick={() => detailOrder(item)}
                                  className="z-[1] rounded p-3  capitalize">
                                  <Fab color="info" aria-label="edit" size="medium">
                                    <RemoveRedEyeIcon size="small" />
                                  </Fab>
                                </div>
                                {Number(item.status) !== Number(Object.keys(treatmentSTT)[3]) && (
                                  <div className=" z-[1]">
                                    <Fab
                                      onClick={() => handleCheckProgress(item)}
                                      size="medium"
                                      color="info"
                                      aria-label="add">
                                      <AddIcon />
                                    </Fab>
                                  </div>
                                )}
                                <div
                                  onClick={() => handleEdit(item)}
                                  className="z-[1] rounded  p-3 capitalize text-blue-500">
                                  <Fab color="info" aria-label="edit" size="medium">
                                    <EditIcon fontSize="small" />
                                  </Fab>
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
      {dataDetail && (
        <TreatmentDetail
          isOpen={isOpen2}
          setIsOpen={setIsOpen2}
          closeModal={closeModal2}
          data={dataDetail}
        />
      )}{' '}
      {dataDetail && (
        <CreateAppointmentTreatmentDetail
          isOpen={isOpen3}
          setIsOpen={setIsOpen3}
          closeModal={closeModal3}
          data={dataDetail}
        />
      )}
      {dataEdit && (
        <EditAppointmentTreatment
          isOpen={openEdit}
          setIsOpen={setOpenEdit}
          closeModal={handleCloseEdit}
          data={dataEdit}
        />
      )}
      <Dialog open={openDialog} onClose={handleClose} aria-labelledby="draggable-dialog-title">
        <DialogTitle style={{ color: 'red' }} id="draggable-dialog-title">
          LƯU Ý
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Lịch hẹn hiện tại đã hoàn thành hết tiến trình</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonComponent mes="Trở lại" color="primary" callBack={() => handleClose(false)} />

          <ButtonComponent mes="Tiếp tục tạo thêm" callBack={() => handleClose(true)} />
        </DialogActions>
      </Dialog>
      <FormTreatmentAppointment isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
    </Fragment>
  );
};

export default ListTreatmentAppointment;
