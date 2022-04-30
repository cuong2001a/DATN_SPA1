import { Fragment, useState, useEffect } from 'react';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import { IMAGE_DEFAULT } from 'Constants';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { treatmentSTT } from 'Features/type/enumStatus';
import EditAppointmentTreatmentDetail from './EditAppointmentTreatmentDetail';

const ListAppointmentTreatmentDetail = ({ treatment }) => {
  const { current } = useSelector((state) => state.appointmentTreatmentDetail);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(
    current.filter((item) => item.appointment_treatment_id._id === treatment._id)
  );
  const [dataEdit, setDataEdit] = useState(undefined);

  const handleOpen = (item) => {
    setDataEdit(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData(current.filter((item) => item.appointment_treatment_id._id === treatment._id));
  }, [current, treatment._id]);

  return (
    <Fragment>
      {data &&
        data.map((item, index) => {
          return (
            <div key={index} className="overflow-auto border-b border-gray-600 ">
              <div className="my-2  mt-6 flex items-center justify-start gap-3">
                <div className="flex h-40   w-40 items-center rounded ">
                  <img
                    className="h-full object-cover"
                    src={item.appointment_treatment_id.treatment_id.album[0] || IMAGE_DEFAULT}
                    alt="imageTreatment"
                  />
                </div>
                <div>
                  <div>
                    <label>
                      Tên liệu trình vụ:
                      <span>{item.appointment_treatment_id.treatment_id.treatment_name}</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      Ngày làm:
                      <span>{moment(item.date.slice(0, 16)).format('HH:mm DD/MM/YYYY')}</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      Lượt làm: <span>{item.number_treatment}</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      Nhân viên: <span>{item.staff_id.user_id.name}</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      Trạng thái:
                      <span> {treatmentSTT[item.status]}</span>
                    </label>
                  </div>
                  <div>
                    <label>
                      ghi chú: <span>{item.note ? item.note : 0}</span>
                    </label>
                  </div>
                </div>
              </div>
              {item.status !== Number(Object.keys(treatmentSTT)[2]) &&
                item.status !== Number(Object.keys(treatmentSTT)[3]) && (
                  <div className="mb-2 flex justify-end">
                    <ButtonComponent mes={'Cập nhật'} callBack={() => handleOpen(item)} />
                  </div>
                )}
            </div>
          );
        })}
      {dataEdit && (
        <EditAppointmentTreatmentDetail
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          data={dataEdit}
        />
      )}
    </Fragment>
  );
};

export default ListAppointmentTreatmentDetail;
