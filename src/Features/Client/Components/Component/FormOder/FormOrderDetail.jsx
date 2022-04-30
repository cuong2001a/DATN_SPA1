import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HeaderTop from '../../Header/HeaderTop';
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
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { DataTimeService, filterTime } from '../../../../../Helpers/DataTime';
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
import { useHistory } from 'react-router-dom';
import DetailAppointmentClient from './DetailAppointmentClient';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import BannerFormOrder from './../../Header/Banner/BannerFormOrder';

const FormOrderDetail = (props) => {
  let { slug: phone } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { state } = history.location;

  const { register, handleSubmit, reset, setValue } = useForm();
  const services = useSelector((state) => state.service.current);
  const customers = useSelector((state) => state.customer.current);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneG, setPhoneG] = useState(phone ? phone : '');
  const [service, setService] = useState('');
  const [listStaff, setListStaff] = useState([]);
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [disableHour, setDisableHour] = useState(true);
  const [disableStaff, setDisableStaff] = useState(true);
  const [dataAppointment, setDataAppointment] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [days, setDays] = useState(moment(new Date()).format().substring(0, 10));
  const closeModal = () => {
    setIsOpen(false);
    history.push('/');
  };

  useEffect(() => {
    if (state.id) {
      setValue('service', state?.id);
    } else if (state.id === undefined) {
      setValue('service', 0);
    }
  }, [props]);

  // run 1 lần duy nhất khi component render
  useEffect(() => {
    notifySuccess('Mời bạn đặt lịch hẹn');
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      notifyError('Ngày đặt lịch phải lớn hơn ngày hiện tại');
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
    const { name, phone, service, day, staff, hourS } = data;
    const dataStaffID = listStaff.map((item) => item._id);
    if (service === '0' || hourS === '0' || !hourS) {
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

      if (!isVietnamesePhoneNumber(phone)) {
        notifyError('Số điện thoại không hợp lệ');
      } else {
        setIsLoading(true);
        const period = formatTimePeriod(day, hourS);
        const isCheck = await finalCondition(staffId);
        if (!isCheck) {
          notifyError(
            'Nhân viên đang có lịch trình trong thời gian này \n Vui lòng chọn thời gian khác'
          );
        } else {
          const person = await handleCustomer(name, phone);
          await handleAppointment(person._id, phone, staffId, period, name, person.counts);
        }
      }
      setIsLoading(false);
    }
  }

  function handleCustomer(name, phone) {
    const person = customers.filter((item) => item.customer_phone === phone);
    if (person.length > 0) {
      return person[0];
    }
    return createCustomer(name, phone);
  }

  async function createCustomer(name, phone) {
    const actionResult = await dispatch(
      CreateCustomer({ customer_name: name, customer_phone: phone, counts: 1 })
    );
    const currentUser = await unwrapResult(actionResult);
    return currentUser.data._id;
  }

  /**
   *
   * @param {*} id id của công việc nhân viên
   * @param {*} time thời gian của công việc nhân viên
   */
  async function updateSchedule(id, time) {
    await dispatch(UpdateSchedule({ id, schedule: time }));
  }

  /**
   *
   * Tạo lịch hẹn mới
   * @param {*} customerId id khách hàng
   * @param {*} staffId id nhân viên
   * @param {*} serviceId id dịch vụ
   * @param {*} period thời gian của lịch hẹn
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
   * Đặt lịch trình và xếp thời gian cho nhân viên
   */
  async function handleAppointment(personId, phone, staffId, period, name, counts) {
    setDataAppointment(null);
    if (counts < 1) {
      counts = 0;
    }
    /**
     * cật nhật lịch trình cho nhân viên
     * tạo lịch hẹn mới
     * update lại trạng thái của khách hàng
     */
    Promise.all([
      updateSchedule(staffId, period),
      createAppointment(personId, staffId, service, period, phone),
      dispatch(
        UpdateCustomer({
          id: personId,
          customer_name: name,
          status: Object.keys(customerStatus)[2],
          counts: (counts -= 1)
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
        setDataAppointment(data[1]);
        setIsOpen(true);
        notifySuccess('Đặt lịch thành công');
      })
      .catch(() => {
        notifyError('Đặt lịch thất bại');
      });
  }

  function handleNotification(staffId, appointments_id, photo, nameService) {
    const data = {
      staff_id: staffId,
      path_id: appointments_id,
      status: Object.keys(notiSTT)[0],
      content: notiContent[0] + ' cho dịch vụ ' + nameService,
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
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerFormOrder />
      </header>
      <section className="relative flex lg:items-center">
        <div
          className="w-full bg-center px-4 sm:px-6"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/hand-drawn-flowers-background_79603-1546.jpg?t=st=1650901828~exp=1650902428~hmac=71957661d326eef241676a1a411cb10563a848da71623080faf61aa6cea6916f&w=1060')"
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto max-w-xl space-y-4 bg-white p-4 md:p-10"
          >
            <div className="flex items-center justify-center space-x-2">
              <span className="block text-center font-nunito text-3xl font-bold lg:text-4xl">
                Đặt lịch hẹn
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className=" max-w-md text-center text-gray-500 ">
                Đặt lịch ngay để không phải chờ đợi, và hưởng những ưu đãi - dịch vụ tốt nhất!
              </span>
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-pink-400 p-4 text-sm shadow-sm"
                  placeholder="Tên khách hàng..."
                  {...register('name', {
                    required: true,
                    minLength: 3,
                    maxLength: 100
                  })}
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  value={phoneG}
                  type="text"
                  className="w-full rounded-lg border-pink-400 p-4 text-sm shadow-sm"
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

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <select
                {...register('service', { required: true })}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-lg border-pink-400 p-4 text-sm shadow-sm"
              >
                <option value={0}>Chọn dịch vụ</option>
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
            <div>
              <input
                type="date"
                className="w-full rounded-lg border-pink-400 py-4 pl-4 pr-3 text-sm shadow-sm"
                value={days}
                min={moment(new Date()).format().substring(0, 10)}
                max={moment(new Date()).add(30, 'days').format().substring(0, 10)}
                {...register('day', { required: true })}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>
            <div>
              <select
                disabled={disableHour}
                {...register('hourS')}
                className="w-full rounded-lg border-pink-400 p-4 text-sm shadow-sm"
                onChange={(e) => setHour(e.target.value)}
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
            </div>
            <div>
              <select
                disabled={disableStaff}
                {...register('staff')}
                className="w-full rounded-lg border-pink-400 p-4 text-sm shadow-sm"
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
            <div className="flex items-center justify-between">
              <ButtonComponent
                mes="Đặt lịch ngay"
                config="inline-block rounded-lg w-full border border-[#f472b6] text-sm font-medium text-white shadow-inner"
                color="#f472b6"
                background-color="white"
                size="large"
                width="100%"
                height="100%"
                type="submit"
              />
            </div>
          </form>
        </div>
      </section>
      {dataAppointment && (
        <DetailAppointmentClient
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          data={dataAppointment.data}
        />
      )}
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default FormOrderDetail;
