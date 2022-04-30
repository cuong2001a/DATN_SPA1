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
    const treatmentServiceID = data.treatment_id._id;

    treatments.forEach((element) => {
      if (element.treatment_id._id === treatmentServiceID) {
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
    const { day, staff, hourS, description } = data;
    const dataStaffID = listStaff.map((item) => item._id);
    let { _id } = props.data;
    if (hourS === '0' || !hourS) {
      notifyError('Vui lòng nhập đầy đủ thông tin!');
    } else if (dataStaffID.length === 0) {
      notifyError('Không có nhân viên nào phù hợp');
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
          'Nhân viên đang có lịch trình trong thời gian này \n Vui lòng chọn thời gian khác'
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
   * @param {*} id id của công việc nhân viên
   * @param {*} time thời gian của công việc nhân viên
   */
  async function updateSchedule(id, time) {
    await dispatch(UpdateSchedule({ id, schedule: time }));
  }

  function handleProgress(progress) {
    let num1 = Number(progress.substring(0, 1));
    return (num1 += 1);
  }
  /**
   * Đặt lịch trình và xếp thời gian cho nhân viên
   */
  async function handleTreatment(data) {
    /**
     * cật nhật lịch trình cho nhân viên
     * tạo lịch hẹn mới
     * update lại trạng thái của khách hàng
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
        notifySuccess('Đặt liệu trình thành công');
        props.closeModal();
      })
      .catch((err) => {
        console.log(err);
        notifyError('Đặt liệu trình thất bại \n vui lòng thử lại!');
      });
  }

  /**
   *
   * Tạo lịch hẹn mới
   * @param {*} customerId id khách hàng
   * @param {*} staffId id nhân viên
   * @param {*} serviceId id dịch vụ
   * @param {*} period thời gian của lịch hẹn
   * @param {*} treatmentId id của lịch trình
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
      content: notiContent[1] + ' cho liệu trình ' + nameService,
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
              <h1 className="font-nunito text-2xl font-bold sm:text-3xl">Thêm liệu trình</h1>
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
                            Khách hàng
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
                            Số điện thoại
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
                            disabled={disableHour}
                            {...register('hourS')}
                            onChange={(e) => setHour(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white
                        py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none
                        focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={0}>Chọn giờ</option>
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
                            Nhân viên
                          </label>
                          <select
                            disabled={disableStaff}
                            {...register('staff')}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={0}>Nhân viên</option>
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
                            Ghi chú
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
                        mes="Thêm liệu trình"
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

export default CreateAppointmentTreatmentDetail;
