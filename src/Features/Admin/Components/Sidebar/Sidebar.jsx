import { LOGO } from 'Constants';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sideBarOpen }) => {
  return (
    <div
      className={`${
        sideBarOpen ? 'fixed md:top-0 md:left-0' : 'fixed hidden md:top-0 md:left-0 lg:block'
      }`}
    >
      <NavLink
        to="/"
        className="absolute top-0 left-0 mb-8 flex h-20 w-full items-center border-b bg-[#002633] px-4"
      >
        <img className="mx-auto" src={LOGO} alt="logo" />
      </NavLink>
      <div className="scroll-custom-side-bar h-screen w-1/2 overflow-auto border-r bg-[#002633] px-4 pt-[100px] text-white md:w-64 lg:block lg:w-64">
        <NavLink
          to="/admin"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            stroke="#60a5fa"
            strokeWidth="0.5"
            className=" h-6 w-6 fill-current text-blue-400"
            viewBox="0 0 20 20"
          >
            <path d="M17.431,2.156h-3.715c-0.228,0-0.413,0.186-0.413,0.413v6.973h-2.89V6.687c0-0.229-0.186-0.413-0.413-0.413H6.285c-0.228,0-0.413,0.184-0.413,0.413v6.388H2.569c-0.227,0-0.413,0.187-0.413,0.413v3.942c0,0.228,0.186,0.413,0.413,0.413h14.862c0.228,0,0.413-0.186,0.413-0.413V2.569C17.844,2.342,17.658,2.156,17.431,2.156 M5.872,17.019h-2.89v-3.117h2.89V17.019zM9.587,17.019h-2.89V7.1h2.89V17.019z M13.303,17.019h-2.89v-6.651h2.89V17.019z M17.019,17.019h-2.891V2.982h2.891V17.019z" />
          </svg>
          <span className="text-white">Thống kê</span>
        </NavLink>
        <NavLink
          to="/admin/appointment"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            strokeWidth="0.5"
            className=" h-6 w-6 fill-current text-blue-400"
            viewBox="0 0 20 20"
          >
            <path d="M16.557,4.467h-1.64v-0.82c0-0.225-0.183-0.41-0.409-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H5.901v-0.82c0-0.225-0.185-0.41-0.41-0.41c-0.226,0-0.41,0.185-0.41,0.41v0.82H3.442c-0.904,0-1.64,0.735-1.64,1.639v9.017c0,0.904,0.736,1.64,1.64,1.64h13.114c0.904,0,1.64-0.735,1.64-1.64V6.106C18.196,5.203,17.461,4.467,16.557,4.467 M17.377,15.123c0,0.453-0.366,0.819-0.82,0.819H3.442c-0.453,0-0.82-0.366-0.82-0.819V8.976h14.754V15.123z M17.377,8.156H2.623V6.106c0-0.453,0.367-0.82,0.82-0.82h1.639v1.23c0,0.225,0.184,0.41,0.41,0.41c0.225,0,0.41-0.185,0.41-0.41v-1.23h8.196v1.23c0,0.225,0.185,0.41,0.41,0.41c0.227,0,0.409-0.185,0.409-0.41v-1.23h1.64c0.454,0,0.82,0.367,0.82,0.82V8.156z" />
          </svg>
          <span className="text-white"> Quản lý lịch hẹn</span>
        </NavLink>
        <NavLink
          to="/admin/treatment"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-white">Quản lý liệu trình</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className=" h-6 w-6 text-blue-400"
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
          <span className="text-white">Quản lý người dùng</span>
        </NavLink>
        <NavLink
          to="/admin/staffs"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <span className="text-white">Quản lý nhân viên</span>
        </NavLink>
        <NavLink
          to="/admin/category"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg className=" h-6 w-6 fill-current text-blue-400" viewBox="0 0 20 20">
            <path d="M15.396,2.292H4.604c-0.212,0-0.385,0.174-0.385,0.386v14.646c0,0.212,0.173,0.385,0.385,0.385h10.792c0.211,0,0.385-0.173,0.385-0.385V2.677C15.781,2.465,15.607,2.292,15.396,2.292 M15.01,16.938H4.99v-2.698h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.519,1.156-1.156s-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.321-1.089,0.771H4.99v-3.083h1.609c0.156,0.449,0.586,0.771,1.089,0.771c0.638,0,1.156-0.518,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V6.531h1.609C6.755,6.98,7.185,7.302,7.688,7.302c0.638,0,1.156-0.519,1.156-1.156c0-0.638-0.519-1.156-1.156-1.156c-0.503,0-0.933,0.322-1.089,0.771H4.99V3.062h10.02V16.938z M7.302,13.854c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386s-0.173,0.385-0.385,0.385S7.302,14.066,7.302,13.854 M7.302,10c0-0.212,0.173-0.385,0.385-0.385S8.073,9.788,8.073,10s-0.173,0.385-0.385,0.385S7.302,10.212,7.302,10 M7.302,6.146c0-0.212,0.173-0.386,0.385-0.386s0.385,0.174,0.385,0.386S7.899,6.531,7.688,6.531S7.302,6.358,7.302,6.146" />
          </svg>
          <span className="text-white">Quản lý danh mục</span>
        </NavLink>
        <NavLink
          to="/admin/brand"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
            />
          </svg>

          <span className="text-white">Quản lý thương hiệu</span>
        </NavLink>
        <NavLink
          to="/admin/service"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg className=" h-6 w-6 fill-current text-blue-400" viewBox="0 0 20 20">
            <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10" />
          </svg>
          <span className="text-white">Quản lý dịch vụ</span>
        </NavLink>
        <NavLink
          to="/admin/customers"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
          <span className="text-white">Quản lý khách hàng</span>
        </NavLink>

        <NavLink
          to="/admin/product"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-white">Quản lý sản phẩm</span>
        </NavLink>
        <NavLink
          to="/admin/order"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg className=" h-6 w-6 fill-current text-blue-400" viewBox="0 0 576 512">
            <path d="M0 24C0 10.75 10.75 0 24 0H96C107.5 0 117.4 8.19 119.6 19.51L121.1 32H312V134.1L288.1 111C279.6 101.7 264.4 101.7 255 111C245.7 120.4 245.7 135.6 255 144.1L319 208.1C328.4 218.3 343.6 218.3 352.1 208.1L416.1 144.1C426.3 135.6 426.3 120.4 416.1 111C407.6 101.7 392.4 101.7 383 111L360 134.1V32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24V24zM224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464zM416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464z" />
          </svg>
          <span className="text-white">Quản lý đơn hàng</span>
        </NavLink>
        <NavLink
          to="/admin/blog"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="text-white">Quản lý bài viết</span>
        </NavLink>
        <NavLink
          to="/admin/contact"
          className="group my-3 mx-2 flex h-10 w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-2  hover:bg-gray-700  active:bg-slate-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
          <span className="text-white">Quản lý liên hệ</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
