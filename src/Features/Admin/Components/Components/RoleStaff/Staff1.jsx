import { Disclosure } from '@headlessui/react';
import { NavLink } from 'react-router-dom';

// nhân viên bán hàng
const Role1 = (props) => {
  return (
    <div>
      <Disclosure>
        <Disclosure.Button className="w-full py-2">
          <NavLink
            to="/admin/staffs/product"
            className="flex h-10 w-full cursor-pointer items-center rounded-lg pl-4 hover:bg-gray-700"
          >
            <svg
              strokeWidth="0.5"
              className="mr-2 h-6 w-6 fill-current text-blue-400"
              viewBox="0 0 20 20"
            >
              <path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z" />
            </svg>
            <span className="text-gray-400">Quản lý sản phẩm</span>
          </NavLink>
        </Disclosure.Button>
      </Disclosure>
      <Disclosure>
        <Disclosure.Button className="w-full py-2">
          <NavLink
            to="/admin/staffs/order"
            className="flex h-10 w-full cursor-pointer items-center rounded-lg pl-4 hover:bg-gray-700"
          >
            <svg
              strokeWidth="0.5"
              className="mr-2 h-6 w-6 fill-current text-blue-400"
              viewBox="0 0 20 20"
            >
              <path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z" />
            </svg>
            <span className="text-gray-400">Quản lý đơn hàng</span>
          </NavLink>
        </Disclosure.Button>
      </Disclosure>
      <Disclosure>
        <Disclosure.Button className="w-full py-2">
          <NavLink
            to="/admin/staffs/work"
            className="flex h-10 w-full cursor-pointer items-center rounded-lg pl-4 hover:bg-gray-700"
          >
            <svg
              strokeWidth="0.5"
              className="mr-2 h-6 w-6 fill-current text-blue-400"
              viewBox="0 0 20 20"
            >
              <path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z" />
            </svg>
            <span className="text-gray-400">Lịch làm việc</span>
          </NavLink>
        </Disclosure.Button>
      </Disclosure>
      <Disclosure>
        <Disclosure.Button className="w-full py-2">
          <NavLink
            to="/admin/staffs/profile"
            className="flex h-10 w-full cursor-pointer items-center rounded-lg pl-4 hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-gray-300">Tài khoản</span>
          </NavLink>
        </Disclosure.Button>
      </Disclosure>
    </div>
  );
};

export default Role1;
