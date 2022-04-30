import React, { Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { starNoTick, starTick } from 'Utils/Utils';

const ProductComment = (props) => {
  const { evaluates, product } = props;
  const { register, handleSubmit } = useForm();

  const showListEvaluates = () => {
    return evaluates.slice(3).map((evaluate) => {
      return (
        <div key={evaluate._id} className="p-4">
          <div className="flex w-full flex-col items-start justify-start bg-gray-50 p-6 ">
            <div className="flex w-full flex-col justify-between md:flex-row">
              <div className="flex flex-row items-start justify-between">
                <p className="text-xl font-medium leading-normal text-gray-800 md:text-2xl">
                  <span>{product?.product_name}</span> -{' '}
                  <span>{product?.category_id.category_name}</span>
                </p>
                <button className="ml-4 md:hidden">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 12.5L10 7.5L5 12.5"
                      stroke="#1F2937"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <div className="mt-2 flex cursor-pointer space-x-0.5 md:mt-0">
                {starTick(evaluate.star, 'text-yellow-400')}
                {starNoTick(evaluate.star, 'text-yellow-400')}
              </div>
              <p className="mt-3 w-full text-base leading-normal text-gray-600 md:w-9/12 xl:w-5/6">
                {evaluate.comment}
              </p>
              <div className="mt-6 hidden flex-row items-start justify-start space-x-4 md:flex">
                <div>
                  {evaluate?.image !== null ? (
                    <img
                      className="h-[130px] w-[130px]"
                      src={evaluate?.image}
                      alt={evaluate?.product_name}
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="mt-6 flex flex-row items-center justify-start space-x-2.5">
                <div>
                  <img
                    className="w-12 rounded-full"
                    src={
                      evaluate.user_id.photoURL
                        ? evaluate.user_id.photoURL
                        : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'
                    }
                    alt={evaluate.user_id.name}
                  />
                </div>
                <div className="flex flex-col items-start justify-start space-y-2">
                  <p className="text-base font-medium leading-none text-gray-800">
                    {evaluate?.user_id.name}
                  </p>
                  <p className="text-sm leading-none text-gray-600">
                    {evaluate.createdAt.split('T')[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
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
          onSubmit={handleSubmit()}
        >
          <div className="relative max-h-[60%] max-w-6xl overflow-auto rounded-lg bg-white px-5 shadow-lg">
            <h3 className="sticky top-0 z-50  max-w-6xl bg-white py-3 text-center text-base font-bold leading-normal text-gray-800 sm:text-lg md:text-xl lg:text-2xl">
              Đánh giá của khách hàng
            </h3>
            <div className="overscroll-hidden mt-5 overscroll-contain border-slate-200">
              {showListEvaluates()}
            </div>
            <div className="sticky bottom-0 right-0 z-50 flex items-center justify-end space-x-2 bg-white p-3 ">
              <button
                onClick={props.closeModal}
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Trở lại
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default ProductComment;
