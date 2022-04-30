import { useEffect, memo, useState, useContext } from 'react';
import { signInWithGoogle, auth } from '../../../Firebase';
import { useDispatch } from 'react-redux';
import {
  setUser,
  notifyError,
  notifySuccess,
  setStaff,
  setRefreshToken,
  setExpires
} from 'Utils/Utils';
import { unwrapResult } from '@reduxjs/toolkit';
import { Login } from '../AuthSlice';
import { Fragment } from 'react';
import { FindStaff } from 'Features/Slice/Staff/StaffSlice';
import { userRole } from 'Features/type/enumUser';
import { AuthContext } from 'Helpers/AuthProvider';
import { setToken } from 'Utils/Utils';

const LoginWithGoogle = (props) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [context, setContext] = useContext(AuthContext);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (!state) return;
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const { uid, photoURL, displayName, email, emailVerified } = user;
      // const token = await user.getIdToken();
      const dataGoogle = {
        uid,
        photoURL,
        name: displayName,
        email,
        verify: emailVerified
      };

      try {
        const actionResult = await dispatch(Login(dataGoogle));
        const currentUser = await unwrapResult(actionResult);

        const data = {
          id: currentUser.user._id,
          email: currentUser.user.email,
          name: currentUser.user.name,
          role: currentUser.user.role,
          photoURL: currentUser.user.photoURL,
          phone: 'Chưa cập nhật'
        };

        if (currentUser.user.verify === false) {
          notifyError('Tài khoản đã bị khóa');
          throw new Error('Tài khoản đã bị khóa');
        }
        setUser(data);
        setToken(currentUser.token);
        setRefreshToken(currentUser.refreshToken);
        setExpires(currentUser.expires);
        if (
          Number(data.role) > Number(Object.keys(userRole)[0]) &&
          Number(data.role) < Number(Object.keys(userRole)[4])
        ) {
          const actionResult2 = await dispatch(FindStaff(data.id));
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
        console.log(error);
        notifyError('Đăng nhập thất bại');
      }
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleLogin = () => {
    signInWithGoogle();
    setState(true);
  };
  return (
    <Fragment>
      <button onClick={handleLogin} className="w-full">
        <div className=" grid grid-cols-7 items-center space-x-2 rounded-md border bg-white py-2 px-5 text-white group-hover:border-[#fc7f82] group-hover:bg-white">
          <img
            className="col-span-1 mx-auto h-5 w-5"
            src="https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK"
            alt=""
          />
          <span className="col-span-6 text-center normal-case text-[#50555e]">
            Đăng nhập với Google
          </span>
        </div>
      </button>
    </Fragment>
  );
};

export default memo(LoginWithGoogle);
