import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { checkWorkSTT } from 'Features/type/enumStatus';
import CheckInOutStaff from 'Features/Admin/Components/Components/AttendanceStaff/CheckInOutStaff';

const InformationStaff = () => {
  const workdayHistory = useSelector((state) => state.workdayHistory.current[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Fragment>
      {workdayHistory && workdayHistory.type !== Number(Object.keys(checkWorkSTT)[1]) && (
        <button
          type="submit"
          onClick={() => setIsOpen(true)}
          className=" my-3 inline-flex rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {workdayHistory && workdayHistory.type === Number(Object.keys(checkWorkSTT)[2])
            ? checkWorkSTT[0]
            : checkWorkSTT[1]}
        </button>
      )}

      <div className="bg-cover font-sans leading-normal tracking-wider text-gray-900 antialiased">
        <div className="mx-auto my-10 flex h-auto max-w-4xl flex-wrap items-center lg:my-10">
          <div
            id="profile"
            className="mx-6 w-full rounded-lg bg-white opacity-75 shadow-2xl lg:mx-0 lg:w-3/5 lg:rounded-l-lg lg:rounded-r-none"
          >
            <div className="p-4 text-center md:px-12 lg:text-left">
              <div
                className="mx-auto -mt-16 block h-48 w-48 rounded-full bg-cover bg-center shadow-xl lg:hidden"
                style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}
              ></div>
              <h1 className="pt-8 text-3xl font-bold lg:pt-0">Tên nhân viên 1</h1>
              <div className="mx-auto w-4/5 border-b-2 border-green-500 pt-3 opacity-25 lg:mx-0"></div>
              <p className="flex items-center justify-center pt-4 text-base font-bold lg:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="pl-3">Nhân viên bán hàng</span>
              </p>
              <p className="flex items-center justify-center pt-2 text-xs text-gray-600 lg:justify-start lg:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="pl-3">Đang làm việc</span>
              </p>
              <p className="flex items-center justify-center pt-2 text-xs text-gray-600 lg:justify-start lg:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="pl-3">0123456789</span>
              </p>
              <p className="flex items-center justify-center pt-2 text-xs text-gray-600 lg:justify-start lg:text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="pl-3">cập nhật</span>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-2/5">
            <img
              className="hidden rounded-none shadow-2xl lg:block lg:rounded-lg"
              src="https://source.unsplash.com/MP0IUfwrn0A"
              alt=""
            />
          </div>
        </div>
      </div>
      {workdayHistory && (
        <CheckInOutStaff
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          data={workdayHistory}
        />
      )}
    </Fragment>
  );
};

export default InformationStaff;
