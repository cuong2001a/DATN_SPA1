import React, { Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';

const DoiCa = (props) => {
  const { register, handleSubmit } = useForm();

  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            opacity: 0.3,
            backgroundColor: 'black'
          }}
        ></div>
        <div className="relative rounded-lg bg-white p-10 font-nunito" onSubmit={handleSubmit()}>
          <button
            onClick={props.closeModal}
            type="button"
            className="absolute top-2 right-2 z-40 rounded-full stroke-black text-4xl font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center justify-center pb-4">
            <p
              tabIndex="0"
              className="text-base font-bold leading-normal text-gray-800 focus:outline-none sm:text-lg md:text-xl lg:text-2xl"
            >
              Đổi lịch làm việc
            </p>
          </div>
          <div className="flex w-full flex-col items-center">
            <form className="mx-auto mt-4 grid w-full grid-cols-1 gap-20 md:grid-cols-2">
              <div className="rounded-lg border p-5">
                <ul className="">
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="rounded py-2 px-8 text-gray-600">
                      <p>
                        Họ tên: <span className="pl-1">Nguyễn thị nhân viên</span>
                      </p>
                    </div>
                  </li>
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="rounded py-2 px-8 text-gray-600 ">
                      <p>
                        Mã nhân viên: <span className="pl-1">Ph12345</span>
                      </p>
                    </div>
                  </li>
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="rounded py-2 px-8 text-gray-600 ">
                      <p>
                        Nghiệp vụ: <span className="pl-1">Nhân viên bán hàng</span>
                      </p>
                    </div>
                  </li>
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="rounded py-2 px-8 text-gray-600 ">
                      <p>
                        Ngày: <span className="pl-1">16/03/2022</span>
                      </p>
                    </div>
                  </li>
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="flex items-center justify-start space-x-2 rounded py-2 px-8 text-gray-600">
                      <p>Ca làm hiện tại:</p>
                      <ol className="flex items-center justify-start space-x-2">
                        <li className="cursor-pointer rounded-lg border border-indigo-800 px-7 py-2 capitalize focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                          ca 1
                        </li>
                        <li className="cursor-pointer rounded-lg border border-indigo-800 px-7 py-2 capitalize focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                          ca 2
                        </li>
                        <li className="cursor-pointer rounded-lg border border-indigo-800 px-7 py-2 capitalize focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                          ca 3
                        </li>
                      </ol>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="space-y-2 rounded-lg border p-5">
                <ul className="">
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="rounded py-2 px-8 text-gray-600">
                      <p>
                        Họ tên: <span className="pl-1">Nguyễn thị nhân viên</span>
                      </p>
                    </div>
                  </li>
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="rounded py-2 px-8 text-gray-600 ">
                      <p>
                        Mã nhân viên: <span className="pl-1">Ph12345</span>
                      </p>
                    </div>
                  </li>
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="rounded py-2 px-8 text-gray-600 ">
                      <p>
                        Nghiệp vụ: <span className="pl-1">Nhân viên bán hàng</span>
                      </p>
                    </div>
                  </li>
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="rounded py-2 px-8 text-gray-600 ">
                      <p>
                        Ngày: <span className="pl-1">16/03/2022</span>
                      </p>
                    </div>
                  </li>
                  <li className="rounded focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                    <div className="flex items-center justify-start space-x-2 rounded py-2 px-8 text-gray-600">
                      <p>Ca có thể chuyển tới:</p>
                      <ol className="flex items-center justify-start space-x-2">
                        <li className="cursor-pointer rounded-lg border border-indigo-800 px-7 py-2 capitalize focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                          ca 1
                        </li>
                        <li className="cursor-pointer rounded-lg border border-indigo-800 px-7 py-2 capitalize focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                          ca 2
                        </li>
                        <li className="cursor-pointer rounded-lg border border-indigo-800 px-7 py-2 capitalize focus:bg-indigo-50 focus:outline-none  focus:ring-2 focus:ring-indigo-800">
                          ca 3
                        </li>
                      </ol>
                    </div>
                  </li>
                </ul>
                <div className="float-right space-x-2">
                  <button className="hover:bg-blue-dark rounded bg-blue-500 py-2 px-7 font-bold text-white">
                    Đổi lịch
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default DoiCa;
