import { configureStore } from '@reduxjs/toolkit';
import staffSlice from 'Features/Slice/Staff/StaffSlice.js';
import serviceSlice from 'Features/Slice/Service/ServiceSlice.js';
import productSlice from 'Features/Slice/Product/ProductSlice.js';
import appointmentSlice from 'Features/Slice/Appointment/AppointmentSlice.js';
import customerSlice from 'Features/Slice/Customer/CustomerSlice.js';
import employeeJobDetailSlice from 'Features/Slice/EmployeeJobDetail/EmployeeJobDetailSlice.js';
import detailInvoiceSlice from 'Features/Slice/Invoice/DetailInvoiceSlice.js';
import categorySlice from 'Features/Slice/Category/CategorySlice.js';
import usersSlice from 'Features/Slice/Users/UserSlice.js';
import authSlice from 'Features/Auth/AuthSlice';
import workdayHistorySlice from 'Features/Slice/WorkdayHistory/WorkdayHistorySlice.js';
import cartSlice from 'Features/Slice/Cart/CartSlice';
import brandSlice from 'Features/Slice/Brand/BrandSlice';
import orderSlide from 'Features/Slice/Order/OrderSlice';
import treatmentSlice from 'Features/Slice/Treatment/TreatmentSlice';
import appointmentTreatmentSlice from 'Features/Slice/Treatment/AppointmentTreatmentSlice';
import appointmentTreatmentDetailSlice from 'Features/Slice/Treatment/AppointmentTreatmentDetail';

import blogSlice from 'Features/Slice/Blog/BlogSlice';
import evaluateSlice from 'Features/Slice/Evaluate/EvaluateSlice';

const rootReducers = {
  auth: authSlice,
  user: usersSlice,
  staff: staffSlice,
  category: categorySlice,
  service: serviceSlice,
  product: productSlice,
  brand: brandSlice,
  order: orderSlide,
  appointment: appointmentSlice,
  customer: customerSlice,
  employeeJobDetail: employeeJobDetailSlice,
  detailInvoice: detailInvoiceSlice,
  workdayHistory: workdayHistorySlice,
  cart: cartSlice,
  treatment: treatmentSlice,
  blog: blogSlice,
  evaluate: evaluateSlice,
  appointmentTreatment: appointmentTreatmentSlice,
  appointmentTreatmentDetail: appointmentTreatmentDetailSlice
};

const store = configureStore({
  reducer: rootReducers
});

export default store;
