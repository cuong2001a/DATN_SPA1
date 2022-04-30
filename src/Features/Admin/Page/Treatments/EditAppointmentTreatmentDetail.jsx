import { Fragment, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  checkDays,
  comparisonDate,
  formatTimePeriod,
  isConditionDayOffStaff,
  notifyError,
  notifySuccess
} from 'Utils/Utils';
import Loading from 'Utils/Loading/Loading';
import moment from 'moment';
import {
  ListEmployeeJobDetail,
  UpdateEmployeeJobDetail
} from 'Features/Slice/EmployeeJobDetail/EmployeeJobDetailSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { staffSTT, treatmentSTT } from 'Features/type/enumStatus';
import { userRole } from 'Features/type/enumUser';
import { DataTimeService, filterTime } from 'Helpers/DataTime';
import { UpdateAppointmentTreatmentDetail } from 'Features/Slice/Treatment/AppointmentTreatmentDetail';
import { UpdateAppointmentTreatment } from 'Features/Slice/Treatment/AppointmentTreatmentSlice';
import { listAppointmentTreatmentDetail } from 'Services/appointmentTreatmentDetail';

const EditAppointmentTreatmentDetail = (props) => {
  const treatments = useSelector((state) => state.treatment.current);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [listStaff, setListStaff] = useState([]);
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [days, setDays] = useState(moment(props.data.date.substring(0, 10)).format('YYYY-MM-DD'));
  const [time, setTime] = useState('');
  const [serviceId, setServiceId] = useState(null);
  const [statusAll, setStatusAll] = useState([]);
  const [staffOld, setStaffOld] = useState(null);

  useEffect(() => {
    reset({
      treatment: props.data.appointment_treatment_id.treatment_id.treatment_name,
      note: props.data.note || 0
    });
    setDays(moment(props.data.date.substring(0, 10)).format('YYYY-MM-DD'));

    setTime(props.data.date.substring(11, 16) + ' - ' + props.data.date.substring(30, 35));
    setStaffOld({ id: props.data.staff_id._id, name: props.data.staff_id.user_id.name });
    handleStatus();
    return () => {
      setDays('');
      setTime('');
      setStatusAll([]);
      setStaffOld(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset, props]);

  function handleStatus() {
    Object.keys(treatmentSTT).forEach((key, index) => {
      if (Number(key) !== Number(props.data.status) && Number(key) > Number(props.data.status)) {
        setStatusAll((pre) => [...pre, key]);
      }
    });
  }

  useEffect(() => {
    if (!checkDays(days)) {
      setDays(moment(new Date()).format().substring(0, 10));
      notifyError('Ngày đặt lịch phải lớn hơn ngày hiện tại');
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
   * Lấy thời gian của tưng dịch vụ
   */
  function callTimeTreatment() {
    treatments.forEach((element) => {
      if (element.treatment_id._id === props.data.appointment_treatment_id.treatment_id._id) {
        setServiceId(element.service_id._id);
        setHours(DataTimeService(element.treatment_id.treatment_duration));
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
        element.service_id._id === serviceId &&
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
      if (element.service_id._id === serviceId && element.staff_id._id === idStaff) {
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
  function callHourTreatment() {
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

  /**
   *
   * @returns {boolean} kiểm tra lần cuối về lịch đặt còn slot về thời gian với nhân viên
   */
  const finalCondition = async (idStaff) => {
    const actionResult = await dispatch(ListEmployeeJobDetail());
    const currentUser = await unwrapResult(actionResult);
    return isLastConditionShowStaff(currentUser.data, idStaff);
  };

  async function onSubmit(data) {
    const period = formatTimePeriod(data.day, data.hourS);
    let isCheck = true;
    const newData = {
      id: props.data._id,
      staff_id: data.staff !== '0' ? data.staff.split(',')[0] : props.data.staff_id._id,
      date: period,
      status: data.status,
      note: data.note
    };
    setIsLoading(true);
    if (props.data.staff_id._id !== newData.staff_id) {
      isCheck = await finalCondition(newData.staff_id);
    }

    if (!isCheck) {
      notifyError(
        'Nhân viên đang có lịch trình trong thời gian này \n Vui lòng chọn thời gian khác'
      );
    } else {
      // giữ nguyên nhân viên cũ
      if (props.data.staff_id._id === newData.staff_id) {
        // giữ nguyên thời gian
        if (Number(newData.status) === Number(Object.keys(treatmentSTT)[3])) {
          await findAndRemove(newData.staff_id, newData.date);
        }
        if (period === props.data.date) {
          await dispatch(UpdateAppointmentTreatmentDetail(newData));
          notifySuccess('Cập nhật thành công');
        } else {
          // thay đổi thời gian
          await findAndReplacePeriod(newData.staff_id, props.data.date, newData.date);
          await dispatch(UpdateAppointmentTreatmentDetail(newData));
          notifySuccess('Cập nhật thành công');
        }
      } else {
        // đổi nhân viên mới
        await addPeriod(newData.staff_id, newData.date, props.data.date, props.data.staff_id._id);
        await dispatch(UpdateAppointmentTreatmentDetail(newData));
        notifySuccess('Cập nhật thành công');
      }
      await handleUpdateTreatmentAppointment(newData.status);
    }
    props.handleClose();
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

  async function findAndRemove(staffId, periods) {
    const actionResult = await dispatch(ListEmployeeJobDetail());
    const { data } = await unwrapResult(actionResult);
    const jobStaff = data.find((item) => item.staff_id._id === staffId);
    const index = jobStaff.schedule.findIndex((item) => item === periods);
    const schedule = [...jobStaff.schedule];
    schedule.splice(index, 1);
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

  async function handleUpdateTreatmentAppointment(stt) {
    let status;
    const numberTreatment = props.data.number_treatment;
    const totalTreatment = props.data.appointment_treatment_id.progress.substring(2, 3);
    if (
      Number(numberTreatment) >= Number(totalTreatment - 1) &&
      Number(stt) === Number(Object.keys(treatmentSTT)[2])
    ) {
      const { data } = await listAppointmentTreatmentDetail();
      const datas = data.data.filter(
        (item) => item.appointment_treatment_id._id === props.data.appointment_treatment_id._id
      );
      const bool = datas.every(
        (item) => Number(item.status) === Number(Object.keys(treatmentSTT)[2])
      );
      if (bool) {
        status = Object.keys(treatmentSTT)[2];
      } else {
        status = Object.keys(treatmentSTT)[1];
      }
    } else if (
      Number(stt) === Number(Object.keys(treatmentSTT)[1]) ||
      Number(stt) === Number(Object.keys(treatmentSTT)[2])
    ) {
      status = Object.keys(treatmentSTT)[1];
    } else if (Number(stt) === Number(Object.keys(treatmentSTT)[3])) {
      const { data } = await listAppointmentTreatmentDetail();
      const datas = data.data.filter(
        (item) => item.appointment_treatment_id._id === props.data.appointment_treatment_id._id
      );
      const bool = datas.every(
        (item) => Number(item.status) === Number(Object.keys(treatmentSTT)[3])
      );
      if (bool) {
        status = Object.keys(treatmentSTT)[3];
      } else {
        status = Object.keys(treatmentSTT)[1];
      }
    } else {
      status = Object.keys(treatmentSTT)[0];
    }
    await dispatch(
      UpdateAppointmentTreatment({ id: props.data.appointment_treatment_id._id, status })
    );
  }

  return (
    <Fragment>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        className="fixed inset-0 z-[1] flex items-center justify-center overflow-hidden"
      >
        <div className="w-full rounded-md bg-gradient-to-b from-sky-400 to-sky-200 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg pb-5 text-center">
            <h1 className="font-nunito text-2xl font-bold sm:text-3xl">Cập nhập liệu trình</h1>
          </div>
          <div className="mt-10 sm:mt-0">
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="" className="block text-sm font-medium text-gray-700">
                          Liệu trình
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
                          Thời gian
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
                          Giờ
                        </label>
                        <select
                          {...register('hourS')}
                          onChange={(e) => setHour(e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                            py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none
                            focus:ring-indigo-500 sm:text-sm"
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
                          {staffOld && (
                            <option value={[staffOld.id, staffOld.name]}>{staffOld.name}</option>
                          )}
                          {listStaff &&
                            listStaff.map((staff, index) => {
                              if (staff._id !== staffOld.id) {
                                return (
                                  <option key={index} value={[staff._id, staff.user_id.name]}>
                                    {staff.user_id.name}
                                  </option>
                                );
                              }
                            })}
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="" className="block text-sm font-medium text-gray-700">
                          Trạng thái
                        </label>
                        <select
                          {...register('status')}
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value={props.data.status}>
                            {treatmentSTT[props.data.status]}
                          </option>
                          {statusAll &&
                            statusAll.map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {treatmentSTT[item]}
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
                          Ghi chú
                        </label>
                        <textarea
                          {...register('note')}
                          cols="30"
                          rows="3"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>
                    <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <ButtonComponent
                        type="submit"
                        config="inline-flex justify-center"
                        mes="Cập nhật"
                      />

                      <ButtonComponent
                        config="inline-flex justify-center"
                        mes=" Trở lại"
                        callBack={props.handleClose}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {isLoading && <Loading />}
      </Dialog>
    </Fragment>
  );
};

export default EditAppointmentTreatmentDetail;
