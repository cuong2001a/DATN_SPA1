import { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { CreateAppointmentTreatmentDetail as dispathTreat } from 'Features/Slice/Treatment/AppointmentTreatmentDetail';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import {
  checkDays,
  comparisonDate,
  formatTimePeriod,
  isConditionDayOffStaff,
  newSocket,
  notifyError,
  notifySuccess
} from 'Utils/Utils';
import {
  notiContent,
  notiSTT,
  notiTitle,
  notiType,
  rooms,
  socket
} from 'Features/type/notification';
import { unwrapResult } from '@reduxjs/toolkit';
import { IMAGE_DEFAULT } from 'Constants';
import { customerStatus, userRole } from 'Features/type/enumUser';
import {
  ListEmployeeJobDetail,
  UpdateSchedule
} from 'Features/Slice/EmployeeJobDetail/EmployeeJobDetailSlice';
import { staffSTT } from 'Features/type/enumStatus';
import { UpdateCustomer } from 'Features/Slice/Customer/CustomerSlice';
import moment from 'moment';
import { DataTimeService, filterTime } from 'Helpers/DataTime';
import { useForm } from 'react-hook-form';
import Loading from 'Utils/Loading/Loading';
import { Dialog } from '@headlessui/react';
import { useSelector } from 'react-redux';
import { UpdateAppointmentTreatment } from 'Features/Slice/Treatment/AppointmentTreatmentSlice';

const CreateAppointmentTreatmentDetail = (props) => {
  const { data } = props;
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const treatments = useSelector((state) => state.treatment.current);

  const [isLoading, setIsLoading] = useState(false);
  const [listStaff, setListStaff] = useState([]);
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [disableHour, setDisableHour] = useState(true);
  const [disableStaff, setDisableStaff] = useState(true);
  const [days, setDays] = useState(moment(new Date()).format().substring(0, 10));
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {
    reset({
      name: data.customer_id.customer_name,
      phone: data.customer_id.customer_phone,
      treatment: data.treatment_id.treatment_name
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    setDisableHour(false);
    if (Number(hour) === 0 || hour === null) {
      setDisableStaff(true);
      return;
    }
    setDisableStaff(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour]);

  useEffect(() => {
    if (!checkDays(days)) {
      setDays(moment(new Date()).format().substring(0, 10));
      notifyError('Ng??y ?????t l???ch ph???i l???n h??n ng??y hi???n t???i');
      return;
    }
    setIsLoading(true);
    callTimeTreatment();
    callEmployeeJobDetail();
    return () => setServiceId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, hour]);

  useEffect(() => {
    callHourTreatment();
    callEmployeeJobDetail();
    return () => setPeriods([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours]);

  /**
   * L???y th???i gian c???a t??ng d???ch v???
   */
  function callTimeTreatment() {
    const treatmentServiceID = data.treatment_id._id;

    treatments.forEach((element) => {
      if (element.treatment_id._id === treatmentServiceID) {
        setServiceId(element.service_id._id);
        setHours(DataTimeService(element.treatment_id.treatment_duration));
      }
    });
  }

  /**
   * L???y danh s??ch nh??n vi??n theo d???ch v??? ???????c ch???n
   */
  async function callEmployeeJobDetail() {
    const actionResult = await dispatch(ListEmployeeJobDetail());
    const currentUser = await unwrapResult(actionResult);
    isFirstConditionShowStaff(currentUser.data);
    setIsLoading(false);
  }

  /**
   * Ki???m tra xem nh??n vi??n ???? c?? l???ch tr??nh ch??a
   */
  function isFirstConditionShowStaff(staffs) {
    if (!staffs || staffs.length <= 0) return;
    setListStaff([]);
    staffs.forEach((element) => {
      if (!element.service_id || element.staff_id.user_id.role !== Number(Object.keys(userRole)[2]))
        return;
      // so s??nh d???ch v??? v?? tr???ng th??i c???a nh??n vi??n ????? l???y ra nh??n vi??n c??ng d???ch v??? v?? ??ang r???nh
      if (
        element.service_id._id === serviceId &&
        Number(element.staff_id.status) !==
          Number(Object.keys(staffSTT)[3] && element.active === true)
      ) {
        // so sanhs v??? kho???ng th???i gian m?? nh??n vi??n ??ang r???nh
        if (element.schedule.length === 0) {
          setListStaff((pre) => [...new Set([...pre, element.staff_id])]);
        } else {
          /**
           * Ki???m tra xem nh??n vi??n ??ang r???nh c?? th???i gian tr??ng v???i th???i gian ???????c ch???n
           */
          for (let i = 0; i < element.schedule.length; i++) {
            if (!comparisonDate(element.schedule[i], days, hour)) {
              setListStaff((pre) => [...new Set([...pre, element.staff_id])]);
            } else {
              setListStaff((pre) => pre.filter((item) => item !== element.staff_id));
              break;
            }
          }
        }

        for (let i = 0; i < element.dayOff.length; i++) {
          if (isConditionDayOffStaff(element.dayOff[i], days, hour)) {
            setListStaff((pre) => pre.filter((item) => item !== element.staff_id));
            break;
          }
        }
      }
    });
  }

  /**
   *
   * @param {*} staffs id c???a nh??n vi??n
   * @returns th???i gian c???a nh??n vi??n c??n ph?? h???p?
   */
  function isLastConditionShowStaff(staffs, idStaff) {
    if (!staffs || staffs.length <= 0) return;
    let isCheck = true;
    setListStaff([]);
    staffs.forEach((element) => {
      if (!element.service_id || element.staff_id.user_id.role !== Number(Object.keys(userRole)[2]))
        return;
      // so s??nh d???ch v??? v?? tr???ng th??i c???a nh??n vi??n ????? l???y ra nh??n vi??n c??ng d???ch v??? v?? ??ang r???nh
      if (element.service_id._id === serviceId && element.staff_id._id === idStaff) {
        if (
          Number(element.staff_id.status) !== Number(Object.keys(staffSTT)[3]) &&
          element.active === true
        ) {
          if (element.schedule.length === 0) {
            // so sanhs v??? kho???ng th???i gian m?? nh??n vi??n ??ang r???nh
            setListStaff((pre) => [...new Set([...pre, element.staff_id])]);
          } else {
            for (let i = 0; i < element.schedule.length; i++) {
              if (!comparisonDate(element.schedule[i], days, hour)) {
                isFirstConditionShowStaff(staffs);
              } else {
                isCheck = false;
                isFirstConditionShowStaff(staffs);
                break;
              }
            }
          }
          for (let i = 0; i < element.dayOff.length; i++) {
            if (isConditionDayOffStaff(element.dayOff[i], days, hour)) {
              setListStaff((pre) => pre.filter((item) => item !== element.staff_id));
              isCheck = false;
              break;
            }
          }
        } else {
          isCheck = false;
          isFirstConditionShowStaff(staffs);
        }
      }
    });
    return isCheck;
  }

  // ki???m tra xem ng??y gi??? ch???n c?? l???n h??n th???i gian hi???n t???i
  function callHourTreatment() {
    const hoursFilter = filterTime(days + '' + hour, hours);
    checkPeriodsToday(hoursFilter);
  }

  /**
   *  l???c d??? li???u gi??? theo ng??y
   */
  function checkPeriodsToday(times) {
    const timeToday = new Date();
    const today = moment(timeToday).format().substring(0, 10);
    if (days === today) {
      setPeriods([]);
      times.forEach((x) => {
        if (
          moment(timeToday).format() < moment(new Date(today + ' ' + x.substring(0, 5))).format()
        ) {
          setPeriods((prev) => [...prev, x]);
        }
      });
      return;
    }
    setPeriods(times);
  }

  /**
   *
   * @returns {boolean} ki???m tra l???n cu???i v??? l???ch ?????t c??n slot v??? th???i gian v???i nh??n vi??n
   */
  const finalCondition = async (idStaff) => {
    const actionResult = await dispatch(ListEmployeeJobDetail());
    const currentUser = await unwrapResult(actionResult);
    return isLastConditionShowStaff(currentUser.data, idStaff);
  };

  async function onSubmit(data) {
    const { day, staff, hourS, description } = data;
    const dataStaffID = listStaff.map((item) => item._id);
    let { _id } = props.data;
    if (hourS === '0' || !hourS) {
      notifyError('Vui l??ng nh???p ?????y ????? th??ng tin!');
    } else if (dataStaffID.length === 0) {
      notifyError('Kh??ng c?? nh??n vi??n n??o ph?? h???p');
      return;
    } else {
      const ranDomStaff = Math.floor(Math.random() * listStaff.length);
      let staffId;
      if (!staff || Number(staff) === 0) {
        staffId = dataStaffID[ranDomStaff];
      } else {
        staffId = staff.split(',')[0];
      }

      setIsLoading(true);
      const period = formatTimePeriod(day, hourS);
      const isCheck = await finalCondition(staffId);
      if (!isCheck) {
        notifyError(
          'Nh??n vi??n ??ang c?? l???ch tr??nh trong th???i gian n??y \n Vui l??ng ch???n th???i gian kh??c'
        );
      } else {
        const totalData = {
          staff_id: staffId,
          appointment_treatment_id: _id,
          note: description,
          number_treatment: handleProgress(props.data.progress),
          date: period,
          customer_id: props.data.customer_id
        };

        await handleTreatment(totalData);
      }
      setIsLoading(false);
    }
  }

  /**
   *
   * @param {*} id id c???a c??ng vi???c nh??n vi??n
   * @param {*} time th???i gian c???a c??ng vi???c nh??n vi??n
   */
  async function updateSchedule(id, time) {
    await dispatch(UpdateSchedule({ id, schedule: time }));
  }

  function handleProgress(progress) {
    let num1 = Number(progress.substring(0, 1));
    return (num1 += 1);
  }
  /**
   * ?????t l???ch tr??nh v?? x???p th???i gian cho nh??n vi??n
   */
  async function handleTreatment(data) {
    /**
     * c???t nh???t l???ch tr??nh cho nh??n vi??n
     * t???o l???ch h???n m???i
     * update l???i tr???ng th??i c???a kh??ch h??ng
     */
    Promise.all([
      updateSchedule(data.staff_id, data.date),
      createTreatmentDetail(data),
      dispatch(
        UpdateCustomer({
          id: data.customer_id._id,
          status: Object.keys(customerStatus)[2],
          counts: data.customer_id.counts < 1 ? 0 : data.customer_id.counts - 1
        })
      )
    ])
      .then(async (data) => {
        await handleNotification(
          data[1].data.staff_id._id,
          data[1].data.appointment_treatment_id._id,
          IMAGE_DEFAULT,
          data[1].data.appointment_treatment_id.treatment_id.treatment_name
        );
        notifySuccess('?????t li???u tr??nh th??nh c??ng');
        props.closeModal();
      })
      .catch((err) => {
        console.log(err);
        notifyError('?????t li???u tr??nh th???t b???i \n vui l??ng th??? l???i!');
      });
  }

  /**
   *
   * T???o l???ch h???n m???i
   * @param {*} customerId id kh??ch h??ng
   * @param {*} staffId id nh??n vi??n
   * @param {*} serviceId id d???ch v???
   * @param {*} period th???i gian c???a l???ch h???n
   * @param {*} treatmentId id c???a l???ch tr??nh
   */
  async function createTreatmentDetail(dataTreatment) {
    const actionResult = await dispatch(dispathTreat(dataTreatment));
    const currentUser = await unwrapResult(actionResult);

    await dispatch(
      UpdateAppointmentTreatment({
        id: dataTreatment.appointment_treatment_id,
        progress: handleProgressSV(props.data.progress)
      })
    );
    return currentUser;
  }

  function handleProgressSV(progress) {
    let index1 = Number(progress.substring(0, 1));
    const index2 = Number(progress.substring(2, 3));

    return `${(index1 += 1)}/${index2}`;
  }

  function handleNotification(staffId, treatment_id, photo, nameService) {
    const data = {
      staff_id: staffId,
      path_id: treatment_id,
      status: Object.keys(notiSTT)[0],
      content: notiContent[1] + ' cho li???u tr??nh ' + nameService,
      type: Object.keys(notiType)[0],
      photo,
      title: notiTitle[0]
    };
    return new Promise((resolve) => {
      resolve(newSocket.emit(socket[0], rooms[1], data));
    });
  }

  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            opacity: 0.3,
            backgroundColor: 'black'
          }}
        ></div>
        <section className="relative flex w-1/2 justify-center lg:h-screen lg:items-center">
          <div className="w-full rounded-md bg-gradient-to-b from-sky-400 to-sky-200 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg pb-5 text-center">
              <h1 className="font-nunito text-2xl font-bold sm:text-3xl">Th??m li???u tr??nh</h1>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Kh??ch h??ng
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            {...register('name', {
                              disabled: true
                            })}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            S??? ??i???n tho???i
                          </label>
                          <input
                            type="number"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            maxLength={10}
                            {...register('phone', {
                              disabled: true
                            })}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Li???u tr??nh
                          </label>
                          <input
                            type="text"
                            name="treatment"
                            id="treatment"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            maxLength={10}
                            {...register('treatment', {
                              disabled: true
                            })}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Th???i gian
                          </label>
                          <input
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            type="date"
                            value={days}
                            min={moment(new Date()).format().substring(0, 10)}
                            max={moment(new Date()).add(30, 'days').format().substring(0, 10)}
                            {...register('day', { required: true })}
                            onChange={(e) => setDays(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Gi???
                          </label>
                          <select
                            disabled={disableHour}
                            {...register('hourS')}
                            onChange={(e) => setHour(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                        py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none
                        focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={0}>Ch???n gi???</option>
                            {periods &&
                              periods.map((period, index) => {
                                return (
                                  <option key={index} value={period}>
                                    {period}
                                  </option>
                                );
                              })}
                          </select>
                        </div>{' '}
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Nh??n vi??n
                          </label>
                          <select
                            disabled={disableStaff}
                            {...register('staff')}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={0}>Nh??n vi??n</option>
                            {listStaff &&
                              listStaff.map((staff, index) => {
                                return (
                                  <option key={index} value={[staff._id, staff.user_id.name]}>
                                    {staff.user_id.name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Ghi ch??
                          </label>
                          <textarea
                            {...register('description')}
                            cols="30"
                            rows="3"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <ButtonComponent
                        type="submit"
                        config="inline-flex justify-center"
                        mes="Th??m li???u tr??nh"
                      />

                      <ButtonComponent
                        config="inline-flex justify-center"
                        mes=" Tr??? l???i"
                        callBack={props.closeModal}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Dialog>
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default CreateAppointmentTreatmentDetail;
