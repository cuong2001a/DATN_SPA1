import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  CreateCustomer,
  FindCustomer,
  UpdateCustomer
} from 'Features/Slice/Customer/CustomerSlice';
import Loading from 'Utils/Loading/Loading';
import { notifyError, isVietnamesePhoneNumber, fixedNumber } from 'Utils/Utils';
import { Dialog } from '@headlessui/react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { typeCustomer } from 'Features/type/enumStatus';

const FormOrderPhone = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [phoneG, setPhoneG] = useState('');

  useEffect(() => {
    setPhoneG((pre) => fixedNumber(pre));
  }, [phoneG]);

  async function onSubmit(data) {
    if (!isVietnamesePhoneNumber(data.phone)) {
      notifyError('Số điện thoại không hợp lệ');
      return;
    }
    setIsLoading(true);
    try {
      const phone = await handleFindCustomer(data.phone);
      if (phone) {
        history.push({
          pathname: `/appointment/${data.phone}`,
          state: { id: props?.id }
        });
        return;
      }
      await dispatch(
        CreateCustomer({
          customer_phone: data.phone,
          counts: 1,
          customer_type: { type: Number(Object.keys(typeCustomer)[0]) }
        })
      );
      history.push({
        pathname: `/appointment/${data.phone}`,
        state: { id: props?.id }
      });
    } catch (error) {
      notifyError(error.message);
    }
    setIsLoading(false);
  }

  async function handleFindCustomer(phone) {
    try {
      const actionResult = await dispatch(FindCustomer(phone));
      const { data } = await unwrapResult(actionResult);
      if (data.length > 0) {
        await dispatch(UpdateCustomer({ id: data[0]._id, counts: (data[0].counts += 1) }));

        return true;
      }
      return false;
    } catch (error) {
      notifyError(error.message);
      return false;
    }
  }

  function isValid() {
    if (!phoneG) {
      notifyError('Vui lòng nhập số điện thoại');
    }
  }
  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
        <div
          className="bg-cover bg-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(199, 194, 201)',
            opacity: 0.7
          }}></div>

        <form onSubmit={handleSubmit(onSubmit)} className="font-nunito">
          <div className="max-w-screen-6xl relative mx-auto px-5">
            <div className="block max-w-6xl rounded-md bg-white p-5 text-center sm:text-left ">
              <div className="relative mx-auto max-w-screen-xl lg:flex  lg:items-center">
                <button
                  onClick={props.closeModal}
                  type="button"
                  className="absolute -top-4 -right-4 rounded-full stroke-black text-4xl font-bold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="max-w-2xl space-y-3 text-center sm:text-left">
                  <img src="/images/banner/welcome1.png" alt="" />
                  <div className="group relative ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="pointer-events-none absolute left-3 top-1/2 -mt-2.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <input
                      className="appearance w-full rounded border py-2 pl-10 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm"
                      value={phoneG}
                      type="text"
                      placeholder="Nhập số điện thoại để đặt lịch ..."
                      maxLength={10}
                      {...register('phone', {
                        required: true,
                        maxLength: 11
                      })}
                      onChange={(e) => {
                        setPhoneG(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    onClick={isValid}
                    className="block w-full rounded border bg-[#1a76d2]  px-12 py-3 text-sm font-medium text-white shadow-xl hover:bg-white hover:text-[#002633]">
                    Đặt lịch ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {isLoading && <Loading />}
      </Dialog>
    </Fragment>
  );
};

export default FormOrderPhone;
