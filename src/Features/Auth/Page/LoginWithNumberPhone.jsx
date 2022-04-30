import { Fragment, useState, useContext } from 'react';
import { configCapCha, signInWithNumberPhone, verifyNumberPhone } from '../../../Firebase';
import { useForm } from 'react-hook-form';
import {
  notifyError,
  isVietnamesePhoneNumber,
  notifySuccess,
  setUser,
  setStaff,
  setRefreshToken,
  setExpires
} from 'Utils/Utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Login } from '../AuthSlice';
import Loading from 'Utils/Loading/Loading';
import { logout, setToken } from 'Utils/Utils';
import { FindStaff } from 'Features/Slice/Staff/StaffSlice';
import { userRole } from 'Features/type/enumUser';
import { AuthContext } from 'Helpers/AuthProvider';

const LoginWithNumberPhone = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [otp, setOtp] = useState(null);
  const [reverify, setReverify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hiddenOTP, setHiddenOTP] = useState('hidden');
  // eslint-disable-next-line no-unused-vars
  const [context, setContext] = useContext(AuthContext);

  const onSubmit = async (data) => {
    if (!data.phoneNumber || data.phoneNumber === '') {
      notifyError('Vui lòng nhập số điện thoại');
      return;
    }
    const phoneRegex = isVietnamesePhoneNumber(data.phoneNumber);
    if (!phoneRegex) {
      notifyError('Số điện thoại không hợp lệ');
      return;
    }
    setIsLoading(true);
    try {
      configCapCha(handleSubmit, 'signIn');
      await signInWithNumberPhone(data.phoneNumber);
      notifySuccess('Đã gửi mã xác thực đến số điện thoại của bạn');
      setHiddenOTP('block');
      setReverify(true);
    } catch (error) {
      notifyError('Lỗi hệ thống');
    }
    setIsLoading(false);
  };

  async function handleVerify() {
    if (!otp) {
      notifyError('Vui lòng nhập mã xác thực');
      return;
    }
    setIsLoading(true);
    const data = await verifyNumberPhone(otp);
    try {
      logout();
      const { uid, phoneNumber } = data;
      const dataPhone = {
        uid,
        verify: true,
        phoneNumber
      };
      const actionResult = await dispatch(Login(dataPhone));
      const currentUser = await unwrapResult(actionResult);
      const dataCurrentUser = {
        id: currentUser.user._id,
        email: currentUser.user.email,
        name: currentUser.user.name,
        role: currentUser.user.role,
        photoURL: currentUser.user.photoURL,
        phone: currentUser.user.phoneNumber
      };
      if (currentUser.user.verify === false) {
        notifyError('Tài khoản đã bị khóa');
        throw new Error('Tài khoản đã bị khóa');
      }
      setUser(dataCurrentUser);
      setToken(currentUser.token);
      setRefreshToken(currentUser.refreshToken);
      setExpires(currentUser.expires);
      if (
        Number(dataCurrentUser.role) > Number(Object.keys(userRole)[0]) &&
        Number(dataCurrentUser.role) < Number(Object.keys(userRole)[4])
      ) {
        const actionResult2 = await dispatch(FindStaff(dataCurrentUser.id));
        const currentUser2 = await unwrapResult(actionResult2);
        setStaff({
          id: currentUser2.data._id
        });
      }

      notifySuccess('Đăng nhập thành công');
      props.closeModal();
      setContext(true);
      props.routerTo();
    } catch (error) {
      notifyError('Mã xác thực không hợp lệ');
    }
    setIsLoading(false);
  }
  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:space-y-2">
          <div className="space-y-2">
            <label htmlFor="SDT" className="normal-case">
              Số điện thoại
            </label>
            <div className="group relative ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute left-3 top-1/2 -mt-2.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <input
                className="appearance w-full rounded-lg border border-white py-2 pl-10 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-transparent"
                type="number"
                maxLength={10}
                minLength={9}
                aria-label="Filter projects"
                placeholder="Số điện thoại ..."
                {...register('phoneNumber')}
              />
            </div>
          </div>
          <div className={`space-y-2 ${hiddenOTP} duration-1000`}>
            <label htmlFor="SDT" className="normal-case">
              Mã xác thực gửi về số điện thoại
            </label>
            <div className="group relative appearance-none">
              <i className="fas fa-lock-open pointer-events-none absolute left-3 top-1/2 -mt-2.5 h-5 w-5 text-slate-400 group-focus-within:text-blue-500"></i>
              <input
                className="w-full appearance-none rounded-lg border border-white py-2 pl-10 text-sm leading-6 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-1 focus:ring-transparent"
                type="number"
                aria-label="Filter projects"
                placeholder="Nhập mã OTP ..."
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          </div>
          <div className="py-2">
            {!reverify ? (
              <button className="w-full rounded-lg bg-gradient-to-r from-rose-400 to-orange-300 py-2 font-semibold hover:text-white">
                Đăng nhập
              </button>
            ) : (
              <button
                onClick={handleVerify}
                type="button"
                className="to-tranring-transparent w-full rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 py-2 font-semibold hover:text-white "
              >
                Gửi mã xác thực
              </button>
            )}
          </div>
        </div>
      </form>
      <div id="signIn"></div>
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default LoginWithNumberPhone;
