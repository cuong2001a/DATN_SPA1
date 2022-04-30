import Paper from '@mui/material/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  Title,
  BarSeries,
  Legend
} from '@devexpress/dx-react-chart-material-ui';
import { useState } from 'react';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { useSelector } from 'react-redux';
import { treatmentSTT, orderSTT } from 'Features/type/enumStatus';
import moment from 'moment';

const Root = (props) => (
  <Legend.Root {...props} sx={{ display: 'flex', margin: 'auto', flexDirection: 'row' }} />
);
const Label = (props) => <Legend.Label {...props} sx={{ whiteSpace: 'nowrap' }} />;

const Char = () => {
  const [priceAppointment, setPriceAppointment] = useState(0);
  const [priceTreatment, setPriceTreatment] = useState(0);
  const [priceProducts, setPriceProducts] = useState(0);

  const [day1Appointment, setDay1Appointment] = useState(0);
  const [day1Treatment, setDay1Treatment] = useState(0);
  const [day1Products, setDay1Products] = useState(0);
  const [day2Appointment, setDay2Appointment] = useState(0);
  const [day2Treatment, setDay2Treatment] = useState(0);
  const [day2Products, setDay2Products] = useState(0);
  const [day3Appointment, setDay3Appointment] = useState(0);
  const [day3Treatment, setDay3Treatment] = useState(0);
  const [day3Products, setDay3Products] = useState(0);
  const [day4Appointment, setDay4Appointment] = useState(0);
  const [day4Treatment, setDay4Treatment] = useState(0);
  const [day4Products, setDay4Products] = useState(0);
  const [day5Appointment, setDay5Appointment] = useState(0);
  const [day5Treatment, setDay5Treatment] = useState(0);
  const [day5Products, setDay5Products] = useState(0);
  const [day6Appointment, setDay6Appointment] = useState(0);
  const [day6Treatment, setDay6Treatment] = useState(0);
  const [day6Products, setDay6Products] = useState(0);
  const [day7Appointment, setDay7Appointment] = useState(0);
  const [day7Treatment, setDay7Treatment] = useState(0);
  const [day7Products, setDay7Products] = useState(0);

  const appointments = useSelector((state) => state.appointment.current);
  const treatments = useSelector((state) => state.appointmentTreatment.current);
  const orders = useSelector((state) => state.order.current);

  const carbonEmmision = [
    {
      country: moment().day(-3).format('YYYY-MM-DD'),
      gold: day1Appointment,
      silver: day1Treatment,
      bronze: day1Products
    },
    {
      country: moment().day(-2).format('YYYY-MM-DD'),
      gold: day2Appointment,
      silver: day2Treatment,
      bronze: day2Products
    },
    {
      country: moment().day(-1).format('YYYY-MM-DD'),
      gold: day3Appointment,
      silver: day3Treatment,
      bronze: day3Products
    },
    {
      country: moment()
        .day(+0)
        .format('YYYY-MM-DD'),
      gold: day4Appointment,
      silver: day4Treatment,
      bronze: day4Products
    },
    {
      country: moment()
        .day(+1)
        .format('YYYY-MM-DD'),
      gold: day5Appointment,
      silver: day5Treatment,
      bronze: day5Products
    },
    {
      country: moment()
        .day(+2)
        .format('YYYY-MM-DD'),

      gold: day6Appointment,
      silver: day6Treatment,
      bronze: day6Products
    },
    {
      country: moment()
        .day(+3)
        .format('YYYY-MM-DD'),
      gold: day7Appointment,
      silver: day7Treatment,
      bronze: day7Products
    }
  ];

  useState(() => {
    const arr1 = appointments.filter(
      (item) => Number(item.appointment_status) === Number(Object.keys(treatmentSTT)[2])
    );
    const arr2 = treatments.filter(
      (item) => Number(item.status) === Number(Object.keys(treatmentSTT)[2])
    );
    const arr3 = orders.filter((item) => Number(item.status) >= Number(Object.keys(orderSTT)[4]));
    if (arr1.length > 0) {
      setPriceAppointment(
        arr1.reduce(
          (acc, item) => acc + (item.service_id.service_price - item.service_id.service_sale),
          0
        )
      );
    }
    if (arr2.length > 0) {
      setPriceTreatment(
        arr2.reduce(
          (pre, item) =>
            pre + (item.treatment_id.treatment_price - item.treatment_id.treatment_sale),
          0
        )
      );
    }

    if (arr3.length > 0) {
      setPriceProducts(orders.reduce((acc, item) => acc + item.totalPrice, 0));
    }
  }, [appointments, treatments]);

  useState(() => {
    const dayApp1 = [];
    const dayApp2 = [];
    const dayApp3 = [];
    const dayApp4 = [];
    const dayApp5 = [];
    const dayApp6 = [];
    const dayApp7 = [];

    const dayTreat1 = [];
    const dayTreat2 = [];
    const dayTreat3 = [];
    const dayTreat4 = [];
    const dayTreat5 = [];
    const dayTreat6 = [];
    const dayTreat7 = [];

    const dayOrder1 = [];
    const dayOrder2 = [];
    const dayOrder3 = [];
    const dayOrder4 = [];
    const dayOrder5 = [];
    const dayOrder6 = [];
    const dayOrder7 = [];

    appointments.forEach((item) => {
      if (Number(item.appointment_status) === Number(Object.keys(treatmentSTT)[2])) {
        if (moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-3).format('YYYY-MM-DD')) {
          dayApp1.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-2).format('YYYY-MM-DD')
        ) {
          dayApp2.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-1).format('YYYY-MM-DD')
        ) {
          dayApp3.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+0)
            .format('YYYY-MM-DD')
        ) {
          dayApp4.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+1)
            .format('YYYY-MM-DD')
        ) {
          dayApp5.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+2)
            .format('YYYY-MM-DD')
        ) {
          dayApp6.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+3)
            .format('YYYY-MM-DD')
        ) {
          dayApp7.push(item);
        }
      }
    });
    treatments.forEach((item) => {
      if (Number(item.status) === Number(Object.keys(treatmentSTT)[2])) {
        if (moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-3).format('YYYY-MM-DD')) {
          dayTreat1.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-2).format('YYYY-MM-DD')
        ) {
          dayTreat2.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-1).format('YYYY-MM-DD')
        ) {
          dayTreat3.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+0)
            .format('YYYY-MM-DD')
        ) {
          dayTreat4.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+1)
            .format('YYYY-MM-DD')
        ) {
          dayTreat5.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+2)
            .format('YYYY-MM-DD')
        ) {
          dayTreat6.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+3)
            .format('YYYY-MM-DD')
        ) {
          dayTreat7.push(item);
        }
      }
    });

    orders.forEach((item) => {
      if (Number(item.status) >= Number(Object.keys(orderSTT)[4])) {
        if (moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-3).format('YYYY-MM-DD')) {
          dayOrder1.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-2).format('YYYY-MM-DD')
        ) {
          dayOrder2.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') === moment().day(-1).format('YYYY-MM-DD')
        ) {
          dayOrder3.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+0)
            .format('YYYY-MM-DD')
        ) {
          dayOrder4.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+1)
            .format('YYYY-MM-DD')
        ) {
          dayOrder5.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+2)
            .format('YYYY-MM-DD')
        ) {
          dayOrder6.push(item);
        } else if (
          moment(item.updatedAt).format('YYYY-MM-DD') ===
          moment()
            .day(+3)
            .format('YYYY-MM-DD')
        ) {
          dayOrder7.push(item);
        }
      }
    });

    if (dayApp1.length > 0) {
      setDay1Appointment(
        dayApp1.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp2.length > 0) {
      setDay2Appointment(
        dayApp2.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp3.length > 0) {
      setDay3Appointment(
        dayApp3.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp4.length > 0) {
      setDay4Appointment(
        dayApp4.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp5.length > 0) {
      setDay5Appointment(
        dayApp5.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp6.length > 0) {
      setDay6Appointment(
        dayApp6.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }
    if (dayApp7.length > 0) {
      setDay7Appointment(
        dayApp7.reduce(
          (pre, items) => pre + (items.service_id.service_price - items.service_id.service_sale),
          0
        )
      );
    }

    if (dayTreat1.length > 0) {
      setDay1Treatment(
        dayTreat1.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat2.length > 0) {
      setDay2Treatment(
        dayTreat2.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat3.length > 0) {
      setDay3Treatment(
        dayTreat3.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat4.length > 0) {
      setDay4Treatment(
        dayTreat4.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat5.length > 0) {
      setDay5Treatment(
        dayTreat5.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat6.length > 0) {
      setDay6Treatment(
        dayTreat6.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }
    if (dayTreat7.length > 0) {
      setDay7Treatment(
        dayTreat7.reduce(
          (pre, items) =>
            pre + (items.treatment_id.treatment_price - items.treatment_id.treatment_sale),
          0
        )
      );
    }

    if (dayOrder1.length > 0) {
      setDay1Products(dayOrder1.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder2.length > 0) {
      setDay2Products(dayOrder2.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder3.length > 0) {
      setDay3Products(dayOrder3.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder4.length > 0) {
      setDay4Products(dayOrder4.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder5.length > 0) {
      setDay5Products(dayOrder5.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder6.length > 0) {
      setDay6Products(dayOrder6.reduce((pre, items) => pre + items.totalPrice, 0));
    }
    if (dayOrder7.length > 0) {
      setDay7Products(dayOrder7.reduce((pre, items) => pre + items.totalPrice, 0));
    }
  }, [priceAppointment, priceTreatment, priceProducts]);

  return (
    <div>
      <Paper>
        <Chart data={carbonEmmision}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries name="Dịch vụ" valueField="gold" argumentField="country" color="#ffd700" />
          <BarSeries
            name="Liệu trình"
            valueField="silver"
            argumentField="country"
            color="#c0c0c0"
          />
          <BarSeries name="Sản phẩm" valueField="bronze" argumentField="country" color="#cd7f32" />
          <Animation />
          <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
          <Title text="Biểu đồ thống kê doanh thu (Tuần VND)" />
          <Stack />
        </Chart>
      </Paper>
    </div>
  );
};

export default Char;
