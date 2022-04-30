import { Fragment, useEffect, useState, memo } from 'react';
import { userRole } from 'Features/type/enumUser';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser } from 'Features/Slice/Users/UserSlice';
import { CreateStaff, ListStaff } from 'Features/Slice/Staff/StaffSlice';
import { hanldeTimeSchedule, notifyError, newSocket, notifyDefault } from 'Utils/Utils';
import Loading from 'Utils/Loading/Loading';
import { confirmAlert } from 'react-confirm-alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {
  CreateEmployeeJobDetail,
  ListEmployeeJobDetail,
  UpdateEmployeeJobDetail
} from 'Features/Slice/EmployeeJobDetail/EmployeeJobDetailSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { socket, rooms, notiType } from 'Features/type/notification';
import { notiSTT, notiContent } from 'Features/type/notification';
import { IMAGE_CHANGE_ROLE } from 'Constants';
import { CreateWorkdayHistory } from 'Features/Slice/WorkdayHistory/WorkdayHistorySlice';

const RoleUser = (props) => {
  const dispatch = useDispatch();
  const staffs = useSelector((state) => state.staff.current);
  const emloyeeJobDetail = useSelector((state) => state.employeeJobDetail.current);
  const users = useSelector((state) => state.user.current);

  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [serviceN, setServiceN] = useState('');
  const [per, setPer] = useState('');

  useEffect(() => {
    for (let key in userRole) {
      if (Number(key) !== props.role && Number(key) !== Number(Object.keys(userRole)[4])) {
        setRoles((prevState) => [...prevState, key]);
      }
    }
    return () => setRoles([]);
  }, [props, isLoading]);

  const confirmUpdateRole = (role) => {
    confirmAlert({
      title: 'Bạn có chắc muốn thay đổi quyền truy cập?',
      buttons: [
        {
          label: 'Thay đổi',
          onClick: () =>
            Number(role) === Number(Object.keys(userRole)[2])
              ? handleServiceRole(role)
              : handleRole(role)
        },
        {
          label: 'Trở lại'
        }
      ]
    });
  };

  const handleServiceRole = (per) => {
    setIsOpen2(true);
    setPer(per);
  };

  async function handleRole(role) {
    setIsLoading(true);
    const dataRes = await dispatch(ListEmployeeJobDetail());
    const { data: dataCurrent } = await await unwrapResult(dataRes);
    const dataSchedule = dataCurrent.find((item) => item.staff_id.user_id._id === props.id);

    if (dataSchedule) {
      const isCheckSchedule = hanldeTimeSchedule(dataSchedule.schedule);
      if (isCheckSchedule) {
        setIsLoading(false);
        notifyDefault('Không thể thay đổi quyền truy cập khi đang có lịch làm việc');
        return;
      }

      try {
        await dispatch(UpdateEmployeeJobDetail({ id: dataSchedule._id, active: true }));
      } catch (error) {
        notifyError(error);
      }
    }

    const findUser = users.find((item) => item._id === props.id);
    if (findUser.role === Number(Object.keys(userRole)[4])) {
      const createRes = await dispatch(CreateStaff({ user_id: props.id }));
      const { data: dataCreate } = await unwrapResult(createRes);

      if (Number(role) === Number(Object.keys(userRole)[2])) {
        await dispatch(
          CreateEmployeeJobDetail({ staff_id: dataCreate._id, service_id: serviceN, active: true })
        );
      }
      if (
        Number(role) !== Number(Object.keys(userRole)[4]) &&
        Number(role) !== Number(Object.keys(userRole)[2])
      ) {
        await dispatch(CreateEmployeeJobDetail({ staff_id: dataCreate._id, active: true }));
      }
      Promise.all([
        dispatch(UpdateUser({ id: props.id, role })),
        dispatch(CreateWorkdayHistory({ staff_id: dataCreate._id }))
      ]);
      const resStaff = await dispatch(ListStaff());
      const { data: dataStaff } = await unwrapResult(resStaff);
      notiSocket(role, dataStaff);
      setIsLoading(false);
      setIsOpen2(false);
      notifyDefault('Cập nhật thành công');
      return;
    }

    try {
      await dispatch(UpdateUser({ id: props.id, role }));
      if (role === Object.keys(userRole)[2]) {
        await conditionRole(role);
      }
      await handledStaffOne(role);

      const resStaff = await dispatch(ListStaff());
      const { data: dataStaff } = await unwrapResult(resStaff);
      notiSocket(role, dataStaff);
      notifyDefault('Cập nhật thành công');
    } catch (error) {
      notifyError(error);
    }
    setIsLoading(false);
  }

  function notiSocket(role, dataStaff) {
    const dataS = dataStaff.find((item) => {
      return item.user_id._id === props.id;
    });

    const data = {
      staff_id: dataS._id,
      status: Object.keys(notiSTT)[0],
      content: dataS.user_id.name + ' ' + notiContent[9] + userRole[role],
      type: Object.keys(notiType)[2],
      photo: IMAGE_CHANGE_ROLE
    };
    newSocket.emit(socket[0], rooms[6], data);
  }

  /**
   * Trường hợp thay đổi quyền là từ khách hàng sang nhân viên
   * sẽ tạo mới 1  bản ghi vào bảng staff với user_id là id của user
   *  */
  async function handledStaffOne(role) {
    if (Number(role) === Number(Object.keys(userRole)[4])) return;
    const staff = staffs.find((item) => {
      return item.user_id._id === props.id;
    });
    if (!staff) {
      return new Promise((resolve) => {
        resolve(dispatch(CreateStaff({ user_id: props.id })));
      });
    }
  }

  async function conditionRole() {
    const staff = staffs.find((item) => {
      return item.user_id._id === props.id;
    });
    if (!staff) {
      // tạo mới nhân viên khi chưa được thiết lập
      handleCreateStaff();
      return;
    }

    // cập nhật lại công việc cho nhân viên
    const isCheck = emloyeeJobDetail.find((item) => item.staff_id._id === staff._id);

    if (isCheck) {
      dispatch(UpdateEmployeeJobDetail({ id: isCheck._id, service_id: serviceN, active: true }));
    } else {
      dispatch(
        CreateEmployeeJobDetail({ staff_id: staff._id, service_id: serviceN, active: true })
      );
    }
    setIsOpen2(false);
  }

  /**
   * Trường hợp thay đổi quyền từ khách hàng -> nhân viên  dịch vụ sẽ tạo mới 1 bản ghi vào bảng staff với user_id là id của user
   * tạo cùng lúc 1 bản ghi vào bảng employee với user_id là id của user và service_id là id của dịch vụ được chọn
   * @returns
   */
  function handleCreateStaff() {
    return new Promise((resolve) => {
      resolve(dispatch(CreateStaff({ user_id: props.id, service_id: serviceN })));
    }).then(() => {
      setIsOpen2(false);
    });
  }

  function hanldeConfirmService() {
    handleRole(per);
  }

  return (
    <Fragment>
      <div className=" invisible absolute top-14 z-50 w-40 translate-y-full list-none divide-y divide-gray-100  rounded bg-white text-base opacity-0 shadow-xl transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-95 ">
        {roles &&
          roles.map((item, index) => {
            return (
              <ul onClick={() => confirmUpdateRole(item)} key={index} className="py-1">
                <li className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-green-100  ">
                  <span className="hover:text-green-800">{userRole[item]}</span>
                </li>
              </ul>
            );
          })}
      </div>
      {isLoading && <Loading />}
      <div
        className={`fixed inset-0 z-50 overflow-y-auto pt-[9%] font-nunito ${
          isOpen2 ? 'block' : 'hidden'
        }`}
      >
        <div
          onClick={() => setIsOpen2(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            backgroundColor: 'rgb(199, 194, 201)',
            opacity: 0.7
          }}
        ></div>
        <div className="absolute inset-0 top-[45%]  ">
          <div className="flex items-center justify-center">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} className="bg-white">
              <InputLabel id="demo-simple-select-autowidth-label">Chọn dịch vụ</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={serviceN}
                onChange={(e) => {
                  setServiceN(e.target.value);
                }}
                autoWidth
                label="Chọn dịch vụ"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {props.services &&
                  props.services.map((item, index) => {
                    return (
                      <MenuItem key={index} value={item._id}>
                        {item.service_name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Stack direction="row">
              <Button onClick={hanldeConfirmService} variant="contained">
                Xác nhận
              </Button>
            </Stack>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default memo(RoleUser);
