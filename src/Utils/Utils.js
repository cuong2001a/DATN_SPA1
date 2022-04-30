import { auth } from '../Firebase/index';
import { toast } from 'react-toastify';
import moment from 'moment';
import io from 'socket.io-client';
import { TIME_END_WORK, TIME_START_WORK } from 'Constants/dataTime';
import { treatmentSTT } from 'Features/type/enumStatus';

export const newSocket = io(process.env.REACT_APP_API_SOCKET);
// export const newSocket = io('http://localhost:7500');

export const notifyError = (error) => toast.error(error);
export const notifyWarning = (error) => toast.warning(error);

export const notifySuccess = (success) => toast.success(success, { icon: '🚀' });
export const notifyDefault = (success) => toast(success, { icon: '🦄' });
export const notifyErrorLogin = (error) =>
  toast.error(error, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
  });
export const notifySuccessAddToCart = (success) =>
  toast.success(success, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined
  });

export const logout = () => {
  sessionStorage.clear();
  auth.signOut();
};

export const setToken = (token) => {
  sessionStorage.setItem('token', token);
};

export const setRefreshToken = (token) => {
  sessionStorage.setItem('refreshToken', token);
};

export const setExpires = (expires) => {
  sessionStorage.setItem('expires', expires);
};

export const getId = () => {
  if (!sessionStorage.getItem('user')) {
    return null;
  } else {
    return JSON.parse(sessionStorage.getItem('user')).id;
  }
};

export const getPhoneNumber = () => {
  if (!sessionStorage.getItem('user')) {
    return null;
  } else {
    return JSON.parse(sessionStorage.getItem('user')).phone;
  }
};

export const getRefreshToken = () => {
  return sessionStorage.getItem('refreshToken');
};

export const getToken = () => {
  return sessionStorage.getItem('token');
};

export const getExpires = () => {
  return sessionStorage.getItem('expires');
};

export const getPermission = () => {
  if (!sessionStorage.getItem('user')) return null;
  return JSON.parse(sessionStorage.getItem('user')).role;
};

/**
 *
 * @param {*} price type number số tiền cần format
 * @returns tiền sau khi đc format
 */
// export const changeDisplayPrices = (price) => {
//   let x = price.toLocaleString('it-IT', {
//     style: 'currency',
//     currency: 'USD'
//   });
//   return x.toString().substring(0, x.length - 7) + ' USD';
// };

export const changeDisplayPrices = (price) => {
  return (price = price.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND'
  }));
};

export const changeDisplayPricesType2 = (price) => {
  return (price = price.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }));
};

/**
 *
 * @param  {...any} money type:number[] tập hợp các khoản tiền
 * @returns tổng các tập hợp số đưa vào
 */
export const sumTotal = (...money) => {
  if (money[0].length === 0) return 0;
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  return money[0].reduce(reducer);
};

/**
 *
 * @param {*} text type:string đoạn chữ cần rút gọn
 * @param {*} start vị trí đầu tiên
 * @param {*} end vị trí kết thúc
 * @returns chữ sau khi đã rút gọn
 */
export const sortText = (text, start = 0, end) => {
  if (text.length < 40) return text;
  return `${text.substr(start, end)} ...`;
};

/**
 *
 * @param {*} email type:string nhận email
 * @returns boolean true | false
 */
export const regexEmail = (email) => {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

/**
 *
 * @param {*} userData type:object nhận dữ liệu người dùng & lưu vào localStorage
 */
export const setUser = (userData) => {
  const data = JSON.stringify(userData);
  sessionStorage.setItem('user', data);
};

export const setStaff = (staff) => {
  const data = JSON.stringify(staff);
  sessionStorage.setItem('staff', data);
};

export const getStaff = () => {
  return JSON.parse(sessionStorage.getItem('staff')).id;
};

/**
 *
 * @param {*} number type number | string số điện thoại, bắt đầu bằng 03 hoặc 09 và 10 số
 * @returns type boolean kiểu số điện thoại có hợp lệ hay không
 */
export const isVietnamesePhoneNumber = (number) => {
  return /(03|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
};

/**
 *
 * @param {*} startDate type string ngày bắt đầu
 * @param {*} endDate type string ngày kết thúc
 * @returns boolean true | false
 */
export const isWithinPeriod = (startDate, endDate) => {
  const startMoment = moment(startDate).format();
  const endMoment = moment(endDate).format();
  const time = moment(startMoment).diff(endMoment, 'minutes');
  return time <= -30 && time <= 30 ? true : false;
};

/**
 *
 * @param {*} periodIn thời gian trong khung quy định sẵn
 * @param {*} periodOut thời gian mà nhân viên đang bận
 * @returns khoảng thời gian mà nhân viên đang rảnh
 */
export const removeTimeDuplicates = (periodIn, periodOut) => {
  return periodIn.filter((x) => x.toString().trim() !== periodOut.toString().trim());
};

/**
 * @param {*} dateStaff type string ngày nhân viên đang làm việc
 * @param {*} dateBooking type string ngày đặt phòng
 * @param {*} periods type arr thời gian đặt phòng
 * @returns boolean true | false đã đặt phòng trong khoảng thời gian nhân viên đang làm việc hay chưa
 */
export const comparisonDate = (dateStaff, dateBooking, periods) => {
  if (!dateStaff || !dateBooking || !periods) return false;
  const timeStart = periods.substring(0, 5);
  const timeEnd = periods.substring(8, 13);

  const dateBookingStart = moment(dateBooking + 'T' + timeStart).format();
  const dateBookingEnd = moment(dateBooking + 'T' + timeEnd).format();
  const dateStaffStart = moment(dateStaff.substring(0, 16)).format();
  const dateStaffEnd = moment(dateStaff.substring(19, dateStaff.length)).format();

  return dateBookingStart <= dateStaffEnd && dateStaffStart <= dateBookingEnd;
};

/**
 * @param {*} dateStaff type string ngày nhân viên đang làm việc
 * @param {*} dateBooking type string ngày đặt phòng
 * @param {*} periods type arr thời gian đặt phòng
 * @returns boolean true | false đã đặt phòng trong khoảng thời gian nhân viên nghir việc hay chưa
 */
export const isConditionDayOffStaff = (dayOff, dateBooking, periods) => {
  if (!dayOff || !dateBooking || !periods) return;
  const timeStart = periods.substring(0, 5);
  const timeEnd = periods.substring(8, 13);
  const dayOffStart = moment(dayOff.substring(0, 16).trim()).format();
  const dayOffEnd = moment(dayOff.substring(18).trim()).format();
  const dateBookingStart = moment(dateBooking + 'T' + timeStart).format();
  const dateBookingEnd = moment(dateBooking + 'T' + timeEnd).format();
  return dateBookingStart <= dayOffEnd && dayOffStart <= dateBookingEnd;
};

/***
 * @param {*} date type string ngày cần kiểm tra
 * @returns boolean true | false ngày có lớn hơn ngày hiên tại hay không
 */
export const checkDays = (date) => {
  const today = moment(new Date()).format('YYYY-MM-DD');
  return moment(date).isSameOrAfter(today);
};

/**
 *
 * @param {*} day ngày đặt lịch
 * @param {*} time khoảng thời gian đặt lịch
 * @returns
 */
export const formatTimePeriod = (day, times) => {
  const timeStart = moment(day + 'T' + times.substring(0, 5))
    .format()
    .substring(0, 16)
    .trim();
  const timeEnd = moment(day + 'T' + times.substring(8, 13))
    .format()
    .substring(0, 16)
    .trim();
  return timeStart + ' - ' + timeEnd;
};

/**
 *
 * @param {0} string type string chuỗi cần format
 * @returns string chuỗi đã đc format sang dạng number
 */
export const fixedNumber = (string) => {
  return string.replace(/[^0-9\\.]+/g, '');
};

/**
 * @param {*} string type string thời gian cần phân tách và tên dịch vụ
 * @returns object có 2 thuộc tính: time: thời gian, service: tên dịch vụ
 */
export const timeDissection = (time, service, appointment, treatment, user) => {
  const data = appointment.find(
    (app) =>
      app.appointment_date === time &&
      app.staff_id.user_id._id === user &&
      app.service_id._id === service
  );
  const dataT = treatment.find((app) => app.date === time && app.staff_id.user_id._id === user);

  if (data) {
    return {
      title: `Dich vụ: ${data.service_id.service_name}
        Khách hàng: ${data.customer_id.customer_name}              
        Trạng thái ${treatmentSTT[data.appointment_status]}`,
      startDate: new Date(time.substring(0, 16).trim()),
      endDate: new Date(time.substring(19, time.length).trim()),
      customer: data.customer_id.customer_name,
      status: treatmentSTT[data.appointment_status]
    };
  } else if (dataT) {
    return {
      title: `Dich vụ: ${dataT.appointment_treatment_id.treatment_id.treatment_name}
        Khách hàng: ${dataT.appointment_treatment_id.customer_id.customer_name}              
        Trạng thái ${treatmentSTT[dataT.status]}`,
      startDate: new Date(time.substring(0, 16).trim()),
      endDate: new Date(time.substring(19, time.length).trim()),
      customer: dataT.appointment_treatment_id.customer_id.customer_name,
      status: treatmentSTT[dataT.status]
    };
  } else {
    return { title: '', startDate: '', endDate: '' };
  }
};

/**
 * @param {*} stars số lượng đánh giá sao của sản phẩm
 * @returns số ký tự sao hiển thị ra UI
 */
export const starTick = (stars, textColor) => {
  let starsTick = [];
  for (let i = 0; i < stars; i++) {
    starsTick.push(i);
  }
  return starsTick.map((star, index) => {
    return <i key={index} className={`fas fa-star ${textColor}`}></i>;
  });
};

export const starNoTick = (stars, textColor) => {
  let starsNoTick = [];
  for (let i = 0; i < 5 - stars; i++) {
    starsNoTick.push(i);
  }
  return starsNoTick.map((star, index) => {
    return <i key={index} className={`far fa-star ${textColor}`}></i>;
  });
};

export const addToCart = (id, name, image, price, amount) => {
  let cartStorage = sessionStorage.getItem('cart');
  let screenCart = null;
  if (cartStorage === null || cartStorage === undefined) {
    screenCart = [];
  } else {
    screenCart = JSON.parse(cartStorage);
  }
  let item = {
    id: id,
    name: name,
    image: image,
    price: price,
    amount: amount
  };

  let existed = screenCart.findIndex((ele) => ele.id === item.id);
  if (existed === -1) {
    item.quantity = 1;
    screenCart.push(item);
  } else {
    if (screenCart[existed].quantity >= screenCart[existed].amount) {
      return false;
    } else {
      screenCart[existed].quantity += 1;
    }
  }
  sessionStorage.setItem('cart', JSON.stringify(screenCart));
};

export const getTotalItemOnCart = () => {
  let cartStorage = sessionStorage.getItem('cart');
  let screenCart = null;
  if (cartStorage == null || undefined) {
    screenCart = [];
  } else {
    screenCart = JSON.parse(cartStorage);
  }
  let totalItems = 0;
  screenCart.forEach((element) => {
    totalItems += element.quantity;
  });
  sessionStorage.setItem('cartNumber', totalItems);
  return totalItems;
};

export const formatTimenotification = (time) => {
  return {
    timeStart: time.substring(0, 16).trim(),
    timeEnd: time.substring(18, time.length).trim()
  };
};

/**
 *
 * @param {*} data type string chuỗi cần tìm kiếm
 * @param {*} arr type arr mảng cần tìm kiếm
 * @returns arr mảng có chuỗi đã tìm kiếm
 */
export const filterCharater = (data, arr) => {
  const p = Array.from(data).reduce((a, v, i) => `${a}[^${data.substr(i)}]*?${v}`, '');
  const re = RegExp(p.toLowerCase());

  return arr?.filter(
    (item) =>
      item.name?.toLowerCase().match(re) ||
      item.email?.toLowerCase().match(re) ||
      item.phoneNumber?.toLowerCase().match(re)
  );
};

// tìm kiếm sản phẩm
export const filterProduct = (data, arr) => {
  const p = Array.from(data).reduce((a, v, i) => `${a}[^${data.substr(i)}]*?${v}`, '');
  const re = RegExp(p.toLowerCase());
  return arr?.filter(
    (item) =>
      item?.product_name?.toLowerCase().match(re) ||
      item?.product_content?.toLowerCase().match(re) ||
      item?.product_description?.toLowerCase().match(re) ||
      item?.category_id.category_name?.toLowerCase().match(re) ||
      item?.product_price === data ||
      item?.product_sale === data
  );
};

// tìm kiếm dịch vụ
export const filterServices = (data, arr) => {
  const p = Array.from(data).reduce((a, v, i) => `${a}[^${data.substr(i)}]*?${v}`, '');
  const re = RegExp(p.toLowerCase());
  return arr?.filter(
    (item) =>
      item.service_name?.toLowerCase().match(re) ||
      item.service_description?.toLowerCase().match(re) ||
      item?.service_price == data ||
      item?.service_star == data
  );
};

// tìm kiếm bài viết
export const filterBlog = (data, arr) => {
  const p = Array.from(data).reduce((a, v, i) => `${a}[^${data.substr(i)}]*?${v}`, '');
  const re = RegExp(p.toLowerCase());
  return arr?.filter(
    (item) =>
      item.blog_name.toLowerCase().match(re) || item.blog_description.toLowerCase().match(re)
  );
};

export const hanldeTimeSchedule = (schedule) => {
  let bool = false;

  for (let i = 0; i < schedule.length; i++) {
    if (
      moment(schedule[i].substring(0, 10).trim()).isAfter(moment().format().substring(0, 10)) ||
      moment(schedule[i].substring(0, 10).trim()).isSame(moment().format().substring(0, 10))
    ) {
      bool = true;
      break;
    }
  }
  return bool;
};

/**
 *
 * @param {*} str type string chuỗi cần chuyển sang html
 * @returns html
 */
export const stringToHTML = function (str) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');
  return doc.body.innerHTML;
};

/**
 *
 * @param {*} separator
 * @returns
 */
export const getCurrentDate = (separator = '-') => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`;
};

export const checkTimeWork = () => {
  const timeStart = moment().format('YYYY-MM-DD') + `T${TIME_START_WORK}`;
  const timeEnd = moment().format('YYYY-MM-DD') + `T${TIME_END_WORK}`;

  if (moment() > moment(timeStart) && moment() < moment(timeEnd)) {
    return true;
  }
  return false;
};
