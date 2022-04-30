import BannerService from 'Features/Client/Components/Header/Banner/BannerService';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { UpdateProduct } from 'Features/Slice/Product/ProductSlice';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createOrder } from 'Services/order';
import { readProduct } from 'Services/product';
import Loading from 'Utils/Loading/Loading';
import {
  changeDisplayPrices,
  getCurrentDate,
  getId,
  isVietnamesePhoneNumber,
  notifyErrorLogin,
  notifySuccess,
  newSocket
} from 'Utils/Utils';
import { notiType, rooms, socket } from 'Features/type/notification';
import { orderSTT } from 'Features/type/enumStatus';
import { IMAGE_DEFAULT } from 'Constants';

const Checkout = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const history = useHistory();
  const [validPhone, setValidPhone] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const checkout_cart = JSON.parse(sessionStorage.getItem('checkout_cart'));
  const checkout_number = JSON.parse(sessionStorage.getItem('checkout_number'));
  const checkout_totalPrice = JSON.parse(sessionStorage.getItem('checkout_totalPrice'));
  const user = JSON.parse(sessionStorage.getItem('user'));
  const currentCart = useSelector((state) => state.cart.current);

  const cleanupStorage = () => {
    sessionStorage.removeItem('checkout_cart');
    sessionStorage.removeItem('checkout_number');
    sessionStorage.removeItem('checkout_totalPrice');
  };

  useEffect(() => {
    if (!getId()) {
      notifyErrorLogin('Đăng nhập để mua hàng!');
      history.push('/');
    } else if (checkout_cart === null) {
      notifyErrorLogin('Hãy chọn sản phẩm để đặt hàng');
      history.push('/cart');
    }
  }, [checkout_cart, history]);

  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        name: user.name
      });
    }
    return () => {
      cleanupStorage();
    };
  }, []);

  const isInvalidPhone = (e) => {
    setValidPhone(isVietnamesePhoneNumber(e.target.value));
  };

  const onSubmit = async (data) => {
    let ordered_cart = checkout_cart.map((product) => {
      product.amount -= product.quantity;
      return product;
    });

    if (validPhone) {
      const order = {
        user: data.id,
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        note: data.note,
        cart: ordered_cart,
        cartNumber: checkout_number,
        totalPrice: checkout_totalPrice,
        create_at: getCurrentDate(),
        status: 0
      };
      setIsLoading(true);
      await createOrder(order).then((items) => {
        const dataSocket = {
          user_id: items.data.user,
          order_id: items.data._id,
          path_id: items.data._id,
          content: orderSTT[0],
          photo: IMAGE_DEFAULT,
          type: Number(Object.keys(notiType)[1])
        };
        newSocket.emit(socket[0], rooms[4], dataSocket);
      });

      //update lại số lượng sản phẩm trong kho
      order.cart.forEach(async (item) => {
        const { data } = await readProduct(item.id);
        const newAmount = data.product_amount - item.quantity;
        const newData = {
          ...data,
          product_amount: newAmount
        };
        dispatch(UpdateProduct(newData));
      });

      //update lại giỏ hàng sau khi checkout
      let cartProducts = currentCart.cart_products;
      const newIds = order.cart.map((item) => item.id);
      cartProducts = cartProducts.filter((ele) => !newIds.includes(ele.id));
      const newCart = {
        ...currentCart,
        cart_products: cartProducts
      };
      dispatch(UpdateCart(newCart));
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      notifySuccess('Đặt hàng thành công!');
      history.push('/process');
    }
  };

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerService />
      </header>
      <div className="my-10 font-nunito">
        <div className="container mx-auto px-5 text-center">
          <h2 className="text-[48px] font-bold">Thông tin đặt hàng</h2>
          <p>Hillsbeauty Spa - hãy để chúng tôi luôn bên bạn– nơi khách hàng gửi trọn niềm tin</p>
        </div>
        <div className="container mx-auto grid grid-cols-1 overflow-hidden px-5 md:w-[1300px] lg:grid-cols-2">
          <div>
            <div className="space-y-8 py-5 px-12">
              <div className="rounded-md">
                <h1 className="pb-2 pt-2 text-xl text-gray-700">Thông tin đặt hàng</h1>
                <p className="mb-6 text-sm text-gray-700">Những phần đánh dấu * là bắt buộc</p>
                <form className="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="group relative z-0 mb-10 w-full">
                    <input
                      type="text"
                      name="name"
                      className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-gray-700 dark:focus:border-blue-500"
                      placeholder=" "
                      {...register('name', { required: true })}
                    />
                    <label
                      htmlFor="name"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-[30px] scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-[30px] peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                      Họ và Tên *
                    </label>
                  </div>
                  <div className="-translate-y-2 md:-translate-y-5">
                    {errors.name && <span className="text-red-500">Nhập đầy đủ tên!</span>}
                  </div>
                  <div className="group relative z-0 mb-10 w-full">
                    <input
                      onKeyUp={isInvalidPhone}
                      type="number"
                      name="phone_number"
                      className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-gray-700 dark:focus:border-blue-500"
                      placeholder=" "
                      maxLength="10"
                      {...register('phoneNumber', { required: true })}
                    />
                    <labelD
                      htmlFor="phone_number"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-[30px] scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-[30px] peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                      Số điện thoại *
                    </labelD>
                  </div>
                  <div className="-translate-y-4 md:-translate-y-10">
                    {errors.phoneNumber && <span className="text-red-500">Nhập số điện thoại</span>}
                    {!errors.phoneNumber && !validPhone ? (
                      <span className="text-red-500">Số điện thoại không đúng định dạng</span>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="group relative z-0 mb-10 w-full">
                    <input
                      type="text"
                      name="address"
                      className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-gray-700 dark:focus:border-blue-500"
                      placeholder=" "
                      {...register('address', { required: true })}
                    />
                    <label
                      htmlFor="address"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-[30px] scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-[30px] peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                      Địa chỉ *
                    </label>
                  </div>
                  <div className="-translate-y-2 md:-translate-y-5">
                    {errors.address && <span className="text-red-500">Hãy nhập địa chỉ</span>}
                  </div>
                  <div className="group relative z-0 mb-10 w-full">
                    <textarea
                      type="text"
                      name="note"
                      className="peer block h-[50px] w-full resize-none appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-gray-700 dark:focus:border-blue-500"
                      placeholder=" "
                      {...register('note')}
                    />
                    <label
                      htmlFor="note"
                      className="absolute top-3 -z-10 origin-[0] -translate-y-[30px] scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-[30px] peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500">
                      Ghi chú
                    </label>
                  </div>

                  <button className="submit-button mt-4 w-full rounded-full bg-[#002633] px-4 py-3 text-xl font-semibold text-white transition-colors focus:outline-none focus:ring">
                    Đặt hàng
                  </button>
                </form>
              </div>
            </div>
          </div>
          <aside class="">
            <div class=" overflow-hidden bg-white bg-fixed py-5 px-12 shadow-md">
              <h1 className="pb-2 pt-2 text-xl text-gray-700">Thông tin đơn hàng</h1>
              {checkout_cart &&
                checkout_cart.map((item) => {
                  return (
                    <ul key={item.id} className="space-y-3 border-b border-t px-3">
                      <li className="border-b-1 grid grid-cols-8 gap-x-2 py-3">
                        <div className="col-span-1 self-center">
                          <img src={item && item.image} alt="Product" className="w-full rounded" />
                        </div>
                        <div className="col-span-3 flex flex-col pt-2">
                          <span className="text-md font-semi-bold text-gray-600">
                            {item && item.name}
                          </span>
                        </div>
                        <div className="col-span-4 pt-3">
                          <div className="flex items-center justify-between space-x-2 text-sm">
                            <span className="text-gray-500">
                              {item.quantity} x {item && changeDisplayPrices(item.price)}
                            </span>
                            <span className="inline-block font-semibold text-[#002633]">
                              {item &&
                                changeDisplayPrices(Number(item.quantity) * Number(item.price))}
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  );
                })}
              <div className="space-y-3 px-8 pt-3">
                <div className="flex justify-between text-gray-600">
                  <span>Số lượng sản phẩm: </span>
                  <span className="font-semibold text-[#002633]">{checkout_number}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tổng tiền hàng</span>
                  <span className="font-semibold text-[#002633]">
                    {checkout_totalPrice && changeDisplayPrices(checkout_totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="font-semibold text-[#002633]">0 VND</span>
                </div>
              </div>
              <div className="flex justify-between px-8 pt-3 text-xl font-semibold text-gray-600">
                <span>Tổng thanh toán:</span>
                <span className="text-[#f9a291]">
                  {checkout_totalPrice && changeDisplayPrices(checkout_totalPrice)}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default Checkout;
