import { Fragment, useState, useEffect, memo } from 'react';
import { treatmentSTT } from 'Features/type/enumStatus';
import { UpdateAppointment } from 'Features/Slice/Appointment/AppointmentSlice';
import { useDispatch } from 'react-redux';
import { notifySuccess, notifyError } from 'Utils/Utils';
import Loading from 'Utils/Loading/Loading';
import { UpdateEmployeeJobDetail } from 'Features/Slice/EmployeeJobDetail/EmployeeJobDetailSlice';
import { useSelector } from 'react-redux';

const StatusAppointment = (props) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState([]);
  const employeeJobDetail = useSelector((state) => state.employeeJobDetail.current);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    for (let key in treatmentSTT) {
      if (Number(key) !== props.status && key > props.status) {
        setStatus((prevState) => {
          return [...prevState, key];
        });
      }
    }
    return () => setStatus([]);
  }, [props]);

  async function handleChangeStatus(status) {
    setIsLoading(true);
    if (
      Number(status) === Number(Object.keys(treatmentSTT)[4]) ||
      Number(status) === Number(Object.keys(treatmentSTT)[3])
    ) {
      const objSche = findScheduleStaff();
      await dispatch(UpdateEmployeeJobDetail(objSche));
    }
    try {
      await dispatch(UpdateAppointment({ id: props.id, appointment_status: status }));
      notifySuccess('Cập nhật trạng thái thành công');
    } catch (error) {
      notifyError('Cập nhật trạng thái thất bại');
    }
    setIsLoading(false);
  }

  function findScheduleStaff() {
    let obj;
    employeeJobDetail.forEach((element) => {
      if (element.staff_id._id === props.staffId) {
        obj = {
          id: element._id,
          schedule: element.schedule.filter((item) => item !== props.time)
        };
      }
    });
    return obj;
  }
  return (
    <Fragment>
      <div className="invisible absolute top-14 z-50 w-44 translate-y-full list-none divide-y divide-gray-100 rounded  bg-white text-left text-base opacity-0 shadow-xl transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-95 ">
        {status &&
          status.map((item, index) => {
            return (
              <ul key={index} onClick={() => handleChangeStatus(item)} className="py-1">
                <li className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-green-100  ">
                  <span className="hover:text-green-800">{treatmentSTT[item]}</span>
                </li>
              </ul>
            );
          })}
      </div>
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default memo(StatusAppointment);
