import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getId, notifyErrorLogin } from 'Utils/Utils';
import Spin from 'react-cssfx-loading/lib/Spin';
import FormOrderPhone from '../FormOder/FormOrderPhone';

const NavBottom = () => {
  const user = useSelector((state) => state.auth.current);
  const [userId, setUserId] = useState();
  const loading = useSelector((state) => state.cart.loading);
  const [isDisabled, setIsDisabled] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserId(user._id);
    } else if (getId() !== null) {
      setUserId(getId());
    } else {
      setUserId(undefined);
    }
  }, [user]);

  let productOnCart = sessionStorage.getItem('cart');
  let cartNumberStorage = sessionStorage.getItem('cartNumber');
  const [cartNumber, setCartNumber] = useState(cartNumberStorage);
  useEffect(() => {
    setCartNumber(cartNumberStorage);
  }, [productOnCart]);

  const alertLogin = () => {
    notifyErrorLogin('Đăng nhập để mua hàng!');
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  };
  return (
    <Fragment>
      <section className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 bg-white py-2 transition duration-700 ease-in-out xl:invisible">
        <Link to="/service" className="group cursor-pointer text-center">
          <i className="fas fa-spa text-[18px] duration-500 group-hover:-translate-y-1 group-hover:text-[#f472b6]"></i>
          <span className="block text-[11px] font-bold capitalize group-hover:text-[#f472b6]">
            Dịch vụ
          </span>
        </Link>
        <Link to="/filter" className="group cursor-pointer text-center">
          <div className="relative">
            <i className="fas fa-tint text-[18px] duration-500 group-hover:-translate-y-1 group-hover:text-[#f472b6]"></i>
          </div>
          <span className="block text-[11px] font-bold capitalize group-hover:text-[#f472b6]">
            Sản phẩm
          </span>
        </Link>
        <div className="group cursor-pointer text-center" onClick={openModal}>
          <i className="far fa-calendar-check text-[18px] duration-500 group-hover:-translate-y-1 group-hover:text-[#f472b6]"></i>
          <span className="block text-center text-[11px] font-bold capitalize group-hover:text-[#f472b6]">
            Đặt lịch
          </span>
        </div>
        {userId ? (
          <Link to="/cart">
            <div className="group cursor-pointer">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-6 w-6 duration-500 group-hover:-translate-y-1 group-hover:stroke-[#f472b6]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span
                  className="absolute -top-[2px] left-5 right-0 mx-auto flex h-[15px] 
                  w-[15px] items-center justify-center rounded-full bg-black text-[10px] text-white duration-500 group-hover:-translate-y-1"
                >
                  {!loading ? (
                    cartNumber
                  ) : (
                    <Spin className="mx-auto" color="white" width="12px" height="12px" />
                  )}
                </span>
              </div>
              <span className="block text-center text-[11px] font-bold capitalize group-hover:text-[#f472b6]">
                Giỏ hàng
              </span>
            </div>
          </Link>
        ) : (
          <button onClick={alertLogin} disabled={isDisabled}>
            <div className="group cursor-pointer">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-6 w-6 duration-500 group-hover:-translate-y-1 group-hover:stroke-[#f472b6]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <span className="block text-center text-[11px] font-bold capitalize group-hover:text-[#f472b6]">
                Giỏ hàng
              </span>
            </div>
          </button>
        )}
      </section>

      <FormOrderPhone isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
    </Fragment>
  );
};

export default NavBottom;
