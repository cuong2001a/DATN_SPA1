import { Dialog } from '@headlessui/react';
import { CreateEvaluate } from 'Features/Slice/Evaluate/EvaluateSlice';
import { UpdateOrder } from 'Features/Slice/Order/OrderSlice';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { getId, notifyErrorLogin, notifySuccessAddToCart } from 'Utils/Utils';
import RatingProductDetail from './RatingProductDetail';
import Loading from 'Utils/Loading/Loading';

const RatingProduct = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  let [dataEvaluate, setDataEvaluate] = useState([]);
  const user = useSelector((state) => state.auth.current);
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserId(user._id);
    } else if (getId() !== null) {
      setUserId(getId());
    } else {
      setUserId(undefined);
    }
  }, [user]);

  const onChangeEvaluate = (params) => {
    setDataEvaluate([...dataEvaluate, params]);

    let existed = dataEvaluate.findIndex((item) => item.product_id === params.product_id);
    if (existed === -1) {
      setDataEvaluate([...dataEvaluate, params]);
    } else {
      const newDataEvaluate = dataEvaluate.map((item) => {
        if (item.product_id === params.product_id) {
          return params;
        } else {
          return item;
        }
      });
      setDataEvaluate(newDataEvaluate);
    }
  };

  const handleSubmitEvaluate = () => {
    if (dataEvaluate.length < props.products.length) {
      notifyErrorLogin('Đánh giá đầy đủ sản phẩm trước khi hoàn thành!');
    } else {
      const isChooseStars = dataEvaluate.every((evaluate) => evaluate.star != 0);
      if (!isChooseStars) {
        notifyErrorLogin('Hãy đánh giá sao đầy đủ trước khi hoàn thành!');
      } else {
        setIsLoading(true);
        dataEvaluate.forEach((eva) => {
          let newEvaluate = {
            ...eva,
            user_id: userId
          };
          dispatch(CreateEvaluate(newEvaluate));
          const newOrder = {
            ...props.order,
            status: 5
          };
          dispatch(UpdateOrder(newOrder));
        });
        setTimeout(() => {
          setIsLoading(false);
          notifySuccessAddToCart('Đánh giá sản phẩm thành công!');
          props.closeModal();
        }, 1000);
      }
    }
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
        <div className="enter-done fixed inset-0  z-50 flex transform items-center justify-center px-4 sm:px-6">
          <div className="relative max-h-[60%] max-w-2xl overflow-auto rounded-lg bg-white shadow-lg">
            <h3 className="sticky top-0 z-50  max-w-2xl bg-white py-3 text-center text-base font-bold leading-normal text-gray-800 sm:text-lg md:text-xl lg:text-2xl">
              Đánh giá sản phẩm
            </h3>
            <div>
              <div className="mt-5 overscroll-contain border-slate-200">
                <div className="px-8">
                  {props.products &&
                    props.products.map((product, index) => {
                      return (
                        <RatingProductDetail
                          product={product}
                          handleEvaluate={setDataEvaluate}
                          key={index}
                          onChangeEvaluate={onChangeEvaluate}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 right-0 z-50 flex items-center justify-end space-x-2 bg-white py-1  px-3 ">
              <button
                onClick={() => {
                  props.closeModal();
                  setDataEvaluate([]);
                }}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Trở lại
              </button>
              <button
                onClick={handleSubmitEvaluate}
                className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-10 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Hoàn thành
              </button>
            </div>
          </div>
        </div>
      </Dialog>
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default RatingProduct;
