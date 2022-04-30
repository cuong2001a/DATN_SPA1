import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateWorkdayHistory } from 'Features/Slice/WorkdayHistory/WorkdayHistorySlice';
import { notifySuccess } from 'Utils/Utils';
import { staffSTT } from 'Features/type/enumStatus';
import { unwrapResult } from '@reduxjs/toolkit';
import { UpdateStaff } from 'Features/Slice/Staff/StaffSlice';
import moment from 'moment';

/**
 * nhận data từ props từ component cha (ScreenTab1/2/3/4) để hiển thị nhân viên tương ứng
 * data sẽ xử lý để  update lại cho component này
 **/

const SwitchAttendance = (props) => {
  const dispatch = useDispatch();
  const workStt = useSelector((state) => state.workdayHistory.current);
  const id = props.data._id;

  const [enabled, setEnabled] = useState(
    workStt.find(
      (item) =>
        item.staff_id._id === id && item.day === moment().format('YYYY-MM-DD').substring(0, 10)
    ).workday_status === Number(Object.keys(staffSTT)[4])
      ? true
      : false
  );

  async function handleChange() {
    setEnabled(!enabled);
    const data = workStt.find(
      (item) => item.staff_id._id === id && item.day === moment().format('YYYY-MM-DD')
    );
    if (!data) return;

    const curr = await dispatch(
      UpdateWorkdayHistory({
        id: data._id,
        workday_status: data.verify
          ? Number(Object.keys(staffSTT)[2])
          : Number(Object.keys(staffSTT)[4]),
        verify: !data.verify
      })
    );
    const current = await unwrapResult(curr);
    if (
      current.data.workday_status === Number(Object.keys(staffSTT)[2]) ||
      current.data.workday_status === Number(Object.keys(staffSTT)[4])
    ) {
      await dispatch(
        UpdateStaff({ id: current.data.staff_id._id, status: current.data.workday_status })
      );
    }
    notifySuccess('Đã cập nhật trạng thái');
  }
  return (
    <div>
      <Switch.Group>
        <div className="flex items-center">
          <Switch
            checked={enabled}
            onChange={handleChange}
            className={`${
              !enabled ? 'bg-gray-200' : 'bg-blue-600'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            <span
              className={`${
                enabled ? 'translate-x-1' : 'translate-x-6'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </Switch.Group>
    </div>
  );
};

export default SwitchAttendance;
