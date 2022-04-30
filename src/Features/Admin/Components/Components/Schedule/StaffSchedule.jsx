import { Fragment, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui';
import { useSelector } from 'react-redux';
import { timeDissection } from 'Utils/Utils';
import { useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

const StaffSchedule = (props) => {
  const { state: dataProps } = useLocation();

  const employeeJobDetail = useSelector((state) => state.employeeJobDetail.current);
  const appointment = useSelector((state) => state.appointment.current);
  const treatment = useSelector((state) => state.appointmentTreatmentDetail.current);

  const [currentDate] = useState(new Date());
  const [dataDate, setDataDate] = useState([]);

  useEffect(() => {
    if (dataProps) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      props = dataProps;
    }
    if (!employeeJobDetail) return;
    let staffs;

    employeeJobDetail.forEach((element) => {
      if (
        Number(element.staff_id.user_id.role) === Number(props.role) &&
        element.staff_id.user_id._id === props.id
      ) {
        staffs = element;
      }
    });
    if (!staffs) return;
    // console.log(treatment);

    staffs.schedule.forEach((item) => {
      setDataDate((pre) => {
        return [
          ...pre,
          timeDissection(item, staffs.service_id._id, appointment, treatment, props.id)
        ];
      });
    });
    return () => {
      setDataDate([]);
    };
  }, [employeeJobDetail, props.id, props.role]);

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Lịch trình </TableCell>
              <TableCell>Thời gian bắt đầu</TableCell>
              <TableCell>Thời gian kết thúc</TableCell>
              <TableCell> Khách hàng</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataDate.map((row, index) => {
              if (moment(row.startDate).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) {
                return (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.title.split('Kh')[0]}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {moment(row.startDate).format('HH:mm DD/MM/YYYY')}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {moment(row.endDate).format('HH:mm DD/MM/YYYY')}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.customer}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.status}
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="h-10"></div>
      <Paper>
        <Scheduler data={dataDate} locale={currentDate} height={660}>
          <ViewState defaultCurrentDate={currentDate} />
          <WeekView startDayHour={7} endDayHour={22} />
          <Toolbar />
          <DateNavigator />
          <Appointments />
          <AppointmentTooltip />
        </Scheduler>
      </Paper>
    </Fragment>
  );
};

export default StaffSchedule;
