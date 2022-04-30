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
  newSocket,
  notifyWarning
} from 'Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { DataTimeService, filterTime } from 'Helpers/DataTime';
import {
  ListEmployeeJobDetail,
  UpdateEmployeeJobDetail
} from 'Features/Slice/EmployeeJobDetail/EmployeeJobDetailSlice';
import { UpdateAppointment } from 'Features/Slice/Appointment/AppointmentSlice';
import Loading from 'Utils/Loading/Loading';
import { userRole } from 'Features/type/enumUser';
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

const EditAppointment = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const services = useSelector((state) => state.service.current);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneG, setPhoneG] = useState('');
  const [service, setService] = useState('');
  const [listStaff, setListStaff] = useState([]);
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [days, setDays] = useState();
  const [servideEdit, setServideEdit] = useState();
  const [time, setTime] = useState();
  const [staffOld, setStaffOld] = useState([]);

  useEffect(() => {
    const { data } = props;
    reset({
      name: data.customer_id.customer_name
    });
    setDays(moment(data.appointment_date.substring(0, 10)).format('YYYY-MM-DD'));

    setPhoneG(data.customer_phone);
    setServideEdit({
      _id: data.service_id._id,
      name: data.service_id.service_name
    });
    setHour(
      data.appointment_date.substring(11, 16) + ' - ' + data.appointment_date.substring(30, 35)
    );
    setTime(
      data.appointment_date.substring(11, 16) + ' - ' + data.appointment_date.substring(30, 35)
    );
    setStaffOld({
      _id: data.staff_id._id,
      name: data.staff_id.user_id.name
    });

    setService(data.service_id._id);
  }, [props, reset]);

  useEffect(() => {
    if (!phoneG) return;
    setPhoneG((pre) => fixedNumber(pre));
  }, [phoneG]);

  useEffect(() => {
    if (!checkDays(days)) {
      setDays(moment(new Date()).format().substring(0, 10));
      notifyWarning('Ngày đặt lịch phải lớn hơn ngày hiện tại');
      return;
    }
    callHourService();
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
   * Lấy thời gian của tưng dịch vụ
   */
  function callTimeService() {
    services.forEach((element) => {
      if (element._id === service) {
        setHours(DataTimeService(element.service_time));
      }
    });
  }

  /**
   * Lấy danh sách nhân viên theo dịch vụ được chọn
   */
  async function callEmployeeJobDetail() {
    const actionResult = await dispatch(ListEmployeeJobDetail());
    const currentUser = await unwrapResult(actionResult);
    isFirstConditionShowStaff(currentUser.data);
    setIsLoading(false);
  }

  /**
   * Kiểm tra xem nhân viên đã có lịch trình chưa
   */
  function isFirstConditionShowStaff(staffs) {
    if (!staffs || staffs.length <= 0) return;
    setListStaff([]);

    staffs.forEach((element) => {
      if (!element.service_id || element.staff_id.user_id.role !== Number(Object.keys(userRole)[2]))
        return;
      // so sánh dịch vụ và trạng thái của nhân viên để lấy ra nhân viên cùng dịch vụ và đang rảnh
      if (
        element.service_id._id === service &&
        Number(element.staff_id.status) !==
          Number(Object.keys(staffSTT)[3] && element.active === true)
      ) {
        // so sanhs về khoảng thời gian mà nhân viên đang rảnh
        if (element.schedule.length === 0) {
          setListStaff((pre) => [...new Set([...pre, element.staff_id])]);
        } else {
          /**
           * Kiểm tra xem nhân viên đang rảnh có thời gian trùng với thời gian được chọn
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
   * @param {*} staffs id của nhân viên
   * @returns thời gian của nhân viên còn phù hợp?
   */
  function isLastConditionShowStaff(staffs, idStaff) {
    if (!staffs || staffs.length <= 0) return;
    let isCheck = true;
    setListStaff([]);
    staffs.forEach((element) => {
      if (!element.service_id || element.staff_id.user_id.role !== Number(Object.keys(userRole)[2]))
        return;
      // so sánh dịch vụ và trạng thái của nhân viên để lấy ra nhân viên cùng dịch vụ và đang rảnh
      if (element.service_id._id === service && element.staff_id._id === idStaff) {
        if (
          Number(element.staff_id.status) !== Number(Object.keys(staffSTT)[3]) &&
          element.active === true
        ) {
          if (element.schedule.length === 0) {
            // so sanhs về khoảng thời gian mà nhân viên đang rảnh
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

  // kiểm tra xem ngày giờ chọn có lớn hơn thời gian hiện tại
  function callHourService() {
    const hoursFilter = filterTime(days + '' + hour, hours);
    checkPeriodsToday(hoursFilter);
  }

  /**
   *  lọc dữ liệu giờ theo ngày
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

  async function onSubmit(data) {
    const { phone, service, day, staff, hourS } = data;
    if (!isVietnamesePhoneNumber(phone)) {
      notifyError('Số điện thoại không hợp lệ');
      return;
    }
    setIsLoading(true);
    const period = formatTimePeriod(day, hourS);
    const staffID = staff.split(',')[0];
    if (staffID === props.data.staff_id._id) {
      // Giữ lại nhân viên cũ
      if (period === props.data.appointment_date) {
        // k thay doi thoi gian
        dispatch(
          UpdateAppointment({
            id: props.data._id,
            customer_phone: phone,
            service_id: service
          })
        );
        notifySuccess('Cập nhật thành công');
      } else {
        const isCheck = await finalCondition(staffID);
        if (!isCheck) {
          notifyError(
            'Nhân viên đang có lịch trình trong thời gian này \n Vui lòng chọn thời gian khác'
          );
        } else {
          // thay doi thoi gian
          await findAndReplacePeriod(staffID, props.data.appointment_date, period);
          await dispatch(
            UpdateAppointment({
              id: props.data._id,
              customer_phone: phone,
              service_id: service,
              appointment_date: period
            })
          );
          notifySuccess('Cập nhật thành công');
        }
      }
    } else {
      const isCheck = await finalCondition(staffID);
      if (!isCheck) {
        notifyError(
          'Nhân viên đang có lịch trình trong thời gian này \n Vui lòng chọn thời gian khác'
        );
      } else {
        // chọn nhân viên mới
        await addPeriod(staffID, period, props.data.appointment_date, props.data.staff_id._id);
        await dispatch(
          UpdateAppointment({
            id: props.data._id,
            customer_phone: phone,
            service_id: service,
            appointment_date: period,
            staff_id: staffID
          })
        );
        notifySuccess('Cập nhật thành công');
      }
    }
    props.closeModal();
    setIsLoading(false);
  }

  async function findAndReplacePeriod(staffId, periodsOld, periodsNew) {
    const actionResult = await dispatch(ListEmployeeJobDetail());
    const { data } = await unwrapResult(actionResult);
    const jobStaff = data.find((item) => item.staff_id._id === staffId);
    const index = jobStaff.schedule.findIndex((item) => item === periodsOld);
    const schedule = [...jobStaff.schedule];
    schedule.splice(index, 1, periodsNew);
    await dispatch(UpdateEmployeeJobDetail({ id: jobStaff._id, schedule }));
  }

  async function addPeriod(staffId, period, periodsOld, staffOld) {
    const actionResult = await dispatch(ListEmployeeJobDetail());
    const { data } = await unwrapResult(actionResult);
    const jobStaffOld = data.find((item) => item.staff_id._id === staffOld);
    const index = jobStaffOld.schedule.findIndex((item) => item === periodsOld);
    const jobStaff = data.find((item) => item.staff_id._id === staffId);
    const scheduleOld = [...jobStaffOld.schedule];
    scheduleOld.splice(index, 1);
    await dispatch(UpdateEmployeeJobDetail({ id: jobStaffOld._id, schedule: scheduleOld }));
    const schedule = [...jobStaff.schedule];
    schedule.push(period);
    await dispatch(UpdateEmployeeJobDetail({ id: jobStaff._id, schedule }));
  }

  /**
   *
   * @returns {boolean} kiểm tra lần cuối về lịch đặt còn slot về thời gian với nhân viên
   */
  const finalCondition = async (idStaff) => {
    const actionResult = await dispatch(ListEmployeeJobDetail());
    const currentUser = await unwrapResult(actionResult);
    return isLastConditionShowStaff(currentUser.data, idStaff);
  };

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
              <h1 className="font-nunito text-2xl font-bold sm:text-3xl">Cập nhật lịch hẹn</h1>
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
                            Tên khách hàng
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
                              maxLength: 100,
                              disabled: true
                            })}
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Số điện thoại
                          </label>
                          <input
                            value={phoneG}
                            type="text"
                            autoComplete="family-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="Số điện thoại..."
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
                            Dịch vụ
                          </label>
                          <select
                            {...register('service', { required: true })}
                            onChange={(e) => setService(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={servideEdit?._id}>{servideEdit?.name}</option>
                            {services &&
                              services.map((listService, index) => {
                                if (listService._id !== props.data.service_id._id) {
                                  return (
                                    <option key={index} value={listService._id}>
                                      {listService.service_name}
                                    </option>
                                  );
                                }
                              })}
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Ngày
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
                            Chọn giờ
                          </label>
                          <select
                            {...register('hourS')}
                            onChange={(e) => setHour(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={time}>{time}</option>
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
                            Nhân viên
                          </label>
                          <select
                            {...register('staff')}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={[staffOld._id, staffOld.name]}>{staffOld.name}</option>
                            {listStaff &&
                              listStaff.map((staff, index) => {
                                if (staff._id !== staffOld._id) {
                                  return (
                                    <option key={index} value={[staff._id, staff.user_id.name]}>
                                      {staff.user_id.name}
                                    </option>
                                  );
                                }
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <ButtonComponent
                        type="submit"
                        mes="Cập nhật lịch hẹn"
                        config="inline-flex justify-center"
                      />
                      <ButtonComponent
                        config="inline-flex justify-center"
                        mes=" Trở lại"
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

export default EditAppointment;
