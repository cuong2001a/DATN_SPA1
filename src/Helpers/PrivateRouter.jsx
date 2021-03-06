import { unwrapResult } from '@reduxjs/toolkit';
import CheckInOutStaff from 'Features/Admin/Components/Components/AttendanceStaff/CheckInOutStaff';
import SideBarStaff from 'Features/Admin/Components/Sidebar/SideBarStaff';
import { ListAppointment } from 'Features/Slice/Appointment/AppointmentSlice';
import { ListCategory } from 'Features/Slice/Category/CategorySlice';
import { ListCustomer } from 'Features/Slice/Customer/CustomerSlice';
import {
  FindStaffId,
  ListEmployeeJobDetail
} from 'Features/Slice/EmployeeJobDetail/EmployeeJobDetailSlice';
import { ListProduct } from 'Features/Slice/Product/ProductSlice';
import { ListService } from 'Features/Slice/Service/ServiceSlice';
import { ListStaff } from 'Features/Slice/Staff/StaffSlice';
import { ListUser } from 'Features/Slice/Users/UserSlice';
import { ListTreatment } from 'Features/Slice/Treatment/TreatmentSlice';
import {
  FindWorkDayHistoryByStaffId,
  ListWorkdayHistory
} from 'Features/Slice/WorkdayHistory/WorkdayHistorySlice';
import { checkWorkSTT } from 'Features/type/enumStatus.js';
import { userRole } from 'Features/type/enumUser';
import moment from 'moment';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import Loading from 'Utils/Loading/Loading';
import { getPermission, getStaff } from 'Utils/Utils';
import HeaderAdmin from '../Features/Admin/Components/Header/Header';
import Sidebar from '../Features/Admin/Components/Sidebar/Sidebar';
import { ListAppointmentTreatment } from 'Features/Slice/Treatment/AppointmentTreatmentSlice';
import { ListAppointmentTreatmentDetail } from 'Features/Slice/Treatment/AppointmentTreatmentDetail';
import { ListOrder } from 'Features/Slice/Order/OrderSlice';

let COUNT = 0;
const PrivateRouter = ({ ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const auth = getPermission();
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const [workdayHistoryStaff, setWorkdayHistoryStaff] = useState(null);
  const [dataWork, setDataWork] = useState(null);

  useLayoutEffect(() => {
    document.getElementsByClassName('fb_dialog_advanced')[0]?.remove();
    if (auth === null || auth === undefined) {
      window.location.href = '/';
      return;
    }
    if (auth === Number(Object.keys(userRole)[5])) {
      window.location.href = '/';
      return;
    }

    if (COUNT <= 2) {
      Number(auth) !== Number(Object.keys(userRole)[0]) && getWorkdayHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Number(auth) === Number(Object.keys(userRole)[0])) return;
    if (Number(auth) < Number(Object.keys(userRole)[4])) {
      history.push('/admin/staffs/work');
    } else {
      history.push('/admin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect(() => {
    COUNT++;
    setLoading(true);
    isCondition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function isCondition() {
    if (COUNT > 1) {
      setLoading(false);
      return;
    }

    switch (Number(auth)) {
      case Number(Object.keys(userRole)[1]): // Nh??n vi??n b??n h??ng
        await dispatchChainingRole1();
        break;

      case Number(Object.keys(userRole)[2]): // Nh??n vi??n d???ch v???
        await dispatchChainingRole2();
        break;
      case Number(Object.keys(userRole)[3]): // Nh??n vi??n l??? t??n
        await dispatchChainingRole3();
        break;
      default:
        // Admin
        await dispatchChainingAll();
        break;
    }

    await dispatch(ListUser()); // L???y danh s??ch user

    if (Number(auth) !== Number(Object.keys(userRole)[0])) {
      dispatch(FindStaffId(getStaff())); // L???y th??ng tin c??ng vi???c nh??n vi??n
    }
    setLoading(false);
  }

  const dispatchChainingAll = () => {
    Promise.all([
      dispatch(ListAppointment()), // L???y danh s??ch l???ch h???n
      dispatch(ListStaff()), // L???y danh s??ch nh??n vi??n
      dispatch(ListWorkdayHistory()),
      dispatch(ListCategory()), // L???y danh s??ch danh m???c
      dispatch(ListProduct()), // L???y danh s??ch s???n ph???m
      dispatch(ListService()), // L???y danh s??ch d???ch v???
      dispatch(ListCustomer()), // L???y danh s??ch kh??ch h??ng
      dispatch(ListTreatment()), // l???y danh s??ch li???u tr??nh
      dispatch(ListEmployeeJobDetail()),
      dispatch(ListAppointmentTreatment()),
      dispatch(ListAppointmentTreatmentDetail()),
      dispatch(ListOrder()) // l???y danh s??ch ????n h??ng
    ]);
  };

  const dispatchChainingRole1 = () => {
    Promise.all([
      dispatch(ListCategory()),
      dispatch(ListProduct()),
      dispatch(ListCustomer()),
      dispatch(ListOrder()) // l???y danh s??ch ????n h??ng
    ]);
  };

  const dispatchChainingRole2 = () => {
    Promise.all([
      dispatch(ListAppointment()), // L???y danh s??ch l???ch h???n
      dispatch(ListService()), // L???y danh s??ch d???ch v???
      dispatch(ListCustomer()), // L???y danh s??ch kh??ch h??ng
      dispatch(ListAppointmentTreatmentDetail()),
      dispatch(ListAppointmentTreatment())
    ]);
  };
  const dispatchChainingRole3 = () => {
    Promise.all([
      dispatch(ListAppointment()),
      dispatch(ListStaff()),
      dispatch(ListService()),
      dispatch(ListCustomer()),
      dispatch(ListAppointmentTreatmentDetail()),
      dispatch(ListAppointmentTreatment())
    ]);
  };

  async function getWorkdayHistory() {
    const staffId = getStaff();
    const data = {
      staffId,
      day: moment().format('YYYY-MM-DD')
    };
    const workdayHistoryCurr = await dispatch(FindWorkDayHistoryByStaffId(data));
    const resultWorkdayHistory = await unwrapResult(workdayHistoryCurr);
    setDataWork(resultWorkdayHistory.data[0]);
  }

  useEffect(() => {
    if (!dataWork) return;
    checkInOutStaff(dataWork);
  }, [dataWork]);

  function checkInOutStaff(data) {
    if (Number(data.time_start) === 0 && data.type === Number(Object.keys(checkWorkSTT)[2])) {
      setIsOpen(true);
      setWorkdayHistoryStaff(data);
    }
  }

  return (
    <div className="leading-normal tracking-normal" id="main-body">
      <div className="flex flex-wrap">
        {auth === 0 ? (
          <Sidebar sideBarOpen={sideBarOpen} />
        ) : (
          <SideBarStaff sideBarOpen={sideBarOpen} staffId={auth} />
        )}

        <div
          className="h-screen w-full overflow-hidden bg-gray-100 pl-0 lg:pl-64"
          id="main-content"
        >
          <HeaderAdmin sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />

          <div className="mb-20 bg-gray-100 p-6">
            <Route {...rest} />
          </div>
        </div>
      </div>
      {loading && <Loading />}
      {workdayHistoryStaff !== null && (
        <CheckInOutStaff
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          data={workdayHistoryStaff}
        />
      )}
    </div>
  );
};

export default PrivateRouter;
