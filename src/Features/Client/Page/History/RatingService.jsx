import { Dialog } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import RatingServiceDetail from './RatingServiceDetail';

const RatingService = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-nunito"
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
        <div
          className="enter-done fixed inset-0  z-50 flex transform items-center justify-center px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-h-[60%] max-w-2xl overflow-auto rounded-lg bg-white shadow-lg">
            <h3 className="sticky top-0 z-50  max-w-2xl bg-white py-3 text-center text-base font-bold leading-normal text-gray-800 sm:text-lg md:text-xl lg:text-2xl">
              Đánh giá dịch vụ
            </h3>
            <div>
              <div className="mt-5 overscroll-contain border-slate-200">
                <div className="px-8">
                  <RatingServiceDetail />
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 right-0 z-50 flex items-center justify-end space-x-2 bg-white py-1  px-3 ">
              <button
                onClick={props.closeModal}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Trở lại
              </button>
              <button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default RatingService;
