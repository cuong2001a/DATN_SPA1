import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { readUser } from 'Services/user';
import { starNoTick, starTick } from 'Utils/Utils';
import ProductComment from './ProductComment';

const ReviewProduct = (props) => {
  const { evaluates, product } = props;
  let [isOpen, setIsOpen] = useState(false);
  const [seeMoreValue, setSeeMoreValue] = useState();

  useEffect(() => {
    if (evaluates.length > 3) {
      setSeeMoreValue(evaluates.length - 3);
    } else {
      setSeeMoreValue(0);
    }
  }, [evaluates]);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const showListEvaluates = () => {
    if (evaluates.length === 0) {
      return (
        <div className="text-center">
          <div className="rounded-md bg-sky-50 py-16 text-2xl shadow-lg">
            Sản phẩm chưa có đánh giá <i className="far fa-sad-tear"></i>
          </div>
        </div>
      );
    } else {
      return evaluates.slice(0, 3).map((evaluate) => {
        return (
          <div
            key={evaluate._id}
            className="flex w-full flex-col items-start justify-start rounded-sm bg-gray-50 p-6 shadow-md"
          >
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
              <div className="mt-2 flex cursor-pointer space-x-0.5 md:mt-0">
                {starTick(evaluate.star, 'text-yellow-400')}
                {starNoTick(evaluate.star, 'text-yellow-400')}
              </div>
            </div>
            <div>
              <p className="mt-3 w-full text-base leading-normal text-gray-600 md:w-9/12 xl:w-5/6">
                {evaluate.comment}
              </p>
              <div className="mt-4 hidden flex-row items-start justify-start space-x-4 md:flex">
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
              <div className="mt-4 flex flex-row items-center justify-start space-x-2.5">
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
        );
      });
    }
  };

  return (
    <div className="flex items-center justify-center px-4 md:px-6 2xl:container 2xl:mx-auto 2xl:px-0">
      <div className="mb-5 flex w-full flex-col  justify-start space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="mt-5 text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
              Đánh giá của khách hàng
            </p>
          </div>
        </div>
        {showListEvaluates()}

        <div className="mx-auto my-10">
          {seeMoreValue !== 0 && (
            <button
              onClick={openModal}
              className="relative overflow-visible rounded-lg bg-blue-600 px-10 py-2 font-bold text-white hover:bg-blue-600/90"
            >
              Xem thêm
              <span className="absolute top-0 right-0 -mt-2 -mr-2 rounded-full bg-red-500 px-3 py-1 text-sm">
                {seeMoreValue}
              </span>
            </button>
          )}
        </div>
      </div>
      <ProductComment
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
        evaluates={evaluates}
        product={product}
      />
    </div>
  );
};

export default ReviewProduct;
