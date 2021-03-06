import React, { Fragment, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import {
  notifyError,
  notifySuccess,
  isVietnamesePhoneNumber,
  comparisonDate,
  formatTimePeriod,
  fixedNumber,
  checkDays,
  isConditionDayOffStaff,
  newSocket
} from 'Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { DataTimeService, filterTime } from 'Helpers/DataTime';
import {
  ListEmployeeJobDetail,
  UpdateSchedule
} from 'Features/Slice/EmployeeJobDetail/EmployeeJobDetailSlice';
import { CreateCustomer, UpdateCustomer } from 'Features/Slice/Customer/CustomerSlice';
import { CreateAppointment } from 'Features/Slice/Appointment/AppointmentSlice';
import Loading from 'Utils/Loading/Loading';
import { customerStatus, userRole } from 'Features/type/enumUser';
import {
  notiContent,
  notiSTT,
  rooms,
  socket,
  notiType,
  notiTitle
} from 'Features/type/notification';
import { staffSTT } from 'Features/type/enumStatus';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const CreateAppointmentAdmin = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const services = useSelector((state) => state.service.current);
  const customers = useSelector((state) => state.customer.current);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneG, setPhoneG] = useState('');
  const [service, setService] = useState('');
  const [listStaff, setListStaff] = useState([]);
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [disableHour, setDisableHour] = useState(true);
  const [disableStaff, setDisableStaff] = useState(true);
  const [days, setDays] = useState(moment(new Date()).format().substring(0, 10));

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    if (!phoneG) return;
    setPhoneG((pre) => fixedNumber(pre));
  }, [phoneG]);

  useEffect(() => {
    if (service === '' || Number(service) === 0) {
      setDisableHour(true);
      return;
    }
    setDisableHour(false);
    if (Number(hour) === 0 || hour === null) {
      setDisableStaff(true);
      return;
    }
    setDisableStaff(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, hour]);

  useEffect(() => {
    if (!checkDays(days)) {
      setDays(moment(new Date()).format().substring(0, 10));
      notifyError('Ng??y ?????t l???ch ph???i l???n h??n ng??y hi???n t???i');
      return;
    }
    setIsLoading(true);
    callTimeService();
    callEmployeeJobDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, days, hour]);

  useEffect(() => {
    callHourService();
    callEmployeeJobDetail();
    return () => setPeriods([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours]);

  /**
   * L???y th???i gian c???a t??ng d???ch v???
   */
  function callTimeService() {
    services.forEach((element) => {
      if (element._id === service) {
        setHours(DataTimeService(element.service_time));
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
        element.service_id._id === service &&
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
      if (element.service_id._id === service && element.staff_id._id === idStaff) {
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
  function callHourService() {
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
    const { name, phone, service, day, staff, hourS } = data;
    const dataStaffID = listStaff.map((item) => item._id);
    if (service === '0' || hourS === '0' || !hourS) {
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

      if (!isVietnamesePhoneNumber(phone)) {
        notifyError('S??? ??i???n tho???i kh??ng h???p l???');
      } else {
        setIsLoading(true);
        const period = formatTimePeriod(day, hourS);
        const isCheck = await finalCondition(staffId);
        if (!isCheck) {
          notifyError(
            'Nh??n vi??n ??ang c?? l???ch tr??nh trong th???i gian n??y \n Vui l??ng ch???n th???i gian kh??c'
          );
        } else {
          const personId = await handleCustomer(name, phone);
          await handleAppointment(personId, phone, staffId, period, name);
        }
      }
      setIsLoading(false);
    }
  }

  function handleCustomer(name, phone) {
    const person = customers.filter((item) => item.customer_phone === phone);
    if (person.length > 0) {
      return person[0]._id;
    }
    return createCustomer(name, phone);
  }

  async function createCustomer(name, phone) {
    const actionResult = await dispatch(
      CreateCustomer({ customer_name: name, customer_phone: phone })
    );
    const currentUser = await unwrapResult(actionResult);
    return currentUser.data._id;
  }

  /**
   *
   * @param {*} id id c???a c??ng vi???c nh??n vi??n
   * @param {*} time th???i gian c???a c??ng vi???c nh??n vi??n
   */
  async function updateSchedule(id, time) {
    await dispatch(UpdateSchedule({ id, schedule: time }));
  }

  /**
   *
   * T???o l???ch h???n m???i
   * @param {*} customerId id kh??ch h??ng
   * @param {*} staffId id nh??n vi??n
   * @param {*} serviceId id d???ch v???
   * @param {*} period th???i gian c???a l???ch h???n
   */
  async function createAppointment(customerId, staffId, serviceId, period, phone) {
    const actionResult = await dispatch(
      CreateAppointment({
        customer_id: customerId,
        staff_id: staffId,
        service_id: serviceId,
        appointment_date: period,
        customer_phone: phone
      })
    );
    const currentUser = await unwrapResult(actionResult);
    return currentUser;
  }

  /**
   * ?????t l???ch tr??nh v?? x???p th???i gian cho nh??n vi??n
   */
  async function handleAppointment(personId, phone, staffId, period, name) {
    /**
     * c???t nh???t l???ch tr??nh cho nh??n vi??n
     * t???o l???ch h???n m???i
     * update l???i tr???ng th??i c???a kh??ch h??ng
     */
    Promise.all([
      updateSchedule(staffId, period),
      createAppointment(personId, staffId, service, period, phone),
      dispatch(
        UpdateCustomer({
          id: personId,
          customer_name: name,
          status: Object.keys(customerStatus)[2]
        })
      )
    ])
      .then(async (data) => {
        await handleNotification(
          staffId,
          data[1].data_id,
          data[1].data.service_id.service_album[0],
          data[1].data.service_id.service_name
        );
        notifySuccess('T???o l???ch h???n th??nh c??ng');
        props.closeModal();
      })
      .catch(() => {
        notifyError('T???o l???ch h???n th???t b???i \n vui l??ng th??? l???i!');
      });
  }

  function handleNotification(staffId, appointments_id, photo, nameService) {
    const data = {
      staff_id: staffId,
      path_id: appointments_id,
      status: Object.keys(notiSTT)[0],
      content: notiContent[0] + ' cho d???ch v??? ' + nameService,
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
        <section
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex w-1/2 justify-center lg:h-screen lg:items-center"
        >
          <div className="w-full rounded-md bg-gradient-to-b from-sky-400 to-sky-200 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg pb-5 text-center">
              <h1 className="font-nunito text-2xl font-bold sm:text-3xl">?????t l???ch m???i</h1>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            T??n kh??ch h??ng
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            {...register('name', {
                              required: true,
                              minLength: 3,
                              maxLength: 100
                            })}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            S??? ??i???n tho???i
                          </label>
                          <input
                            value={phoneG}
                            type="text"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="S??? ??i???n tho???i..."
                            maxLength={10}
                            {...register('phone', {
                              required: true,
                              minLength: 10,
                              maxLength: 11
                            })}
                            onChange={(e) => {
                              setPhoneG(e.target.value);
                            }}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            D???ch v???
                          </label>
                          <select
                            {...register('service', { required: true })}
                            onChange={(e) => setService(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={0}>Ch???n d???ch v???</option>
                            {services &&
                              services.map((listService, index) => {
                                return (
                                  <option key={index} value={listService._id}>
                                    {listService.service_name}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Ng??y
                          </label>
                          <input
                            type="date"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            value={days}
                            min={moment(new Date()).format().substring(0, 10)}
                            max={moment(new Date()).add(30, 'days').format().substring(0, 10)}
                            {...register('day', { required: true })}
                            onChange={(e) => setDays(e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Ch???n gi???
                          </label>
                          <select
                            disabled={disableHour}
                            {...register('hourS')}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            onChange={(e) => setHour(e.target.value)}
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
                        </div>
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
                      </div>
                    </div>
                    <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <ButtonComponent
                        type="submit"
                        mes="T???o l???ch h???n m???i"
                        config="inline-flex justify-center"
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

export default CreateAppointmentAdmin;
