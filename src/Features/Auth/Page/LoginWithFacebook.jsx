import { useEffect, Fragment, memo, useState, useContext } from 'react';
import { signInWithFacebook, auth } from '../../../Firebase';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { Login } from '../AuthSlice';
import { setUser, notifyError, setStaff, setRefreshToken, setExpires } from 'Utils/Utils';
import { FindStaff } from 'Features/Slice/Staff/StaffSlice';
import { userRole } from 'Features/type/enumUser';
import { AuthContext } from 'Helpers/AuthProvider';
import { notifySuccess, setToken } from 'Utils/Utils';

const LoginWithFacebook = (props) => {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [context, setContext] = useContext(AuthContext);
  const [state, setState] = useState(false);

  useEffect(() => {
    if (!state) return;
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const { uid, photoURL, displayName } = user;
      // const token = await user.getIdToken();
      const dataFacebook = {
        uid,
        photoURL,
        name: displayName,
        verify: true
      };

      try {
        const actionResult = await dispatch(Login(dataFacebook));
        const currentUser = await unwrapResult(actionResult);
        const data = {
          id: currentUser.user._id,
          name: currentUser.user.name,
          role: currentUser.user.role,
          photoURL: currentUser.user.photoURL
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
        notifyError('Đăng nhập thất bại');
      }
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleLogin = () => {
    signInWithFacebook();
    setState(true);
  };
  return (
    <Fragment>
      <button onClick={handleLogin} className="w-full">
        <div className="col-span-6 space-x-2 rounded-md border bg-[#1b72ee] py-2 px-5 text-white group-hover:border-[#1b72ee] group-hover:bg-white sm:col-span-3">
          <i className="fab fa-facebook-f col-span-1 group-hover:text-[#1b72ee]"></i>
          <span className="col-span-6 text-center normal-case group-hover:text-[#1b72ee]">
            Đăng nhập với Facebook
          </span>
        </div>
      </button>
    </Fragment>
  );
};

export default memo(LoginWithFacebook);
