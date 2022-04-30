import React, { Fragment, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { changeDisplayPrices, getId, notifyErrorLogin } from 'Utils/Utils';
import Loading from 'Utils/Loading/Loading';
import BannerCart from 'Features/Client/Components/Header/Banner/BannerCart';

const Cart = () => {
  document.title = 'Giỏ hàng';
  const dispatch = useDispatch();
  const history = useHistory();
  const currentCart = useSelector((state) => state.cart.current);
  const loading = useSelector((state) => state.cart.loading);

  const [checked, setChecked] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [cart, setCart] = useState(currentCart.cart_products);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!getId()) {
      notifyErrorLogin('Đăng nhập để xem giỏ hàng!');
      history.push('/');
    }
  }, [history]);

  //setCart
  useEffect(() => {
    setCart(currentCart.cart_products);
  }, [currentCart]);

  // useEffect(() => {
  //   dispatch(UpdateCart(cart));
  // }, [cart]);

  //check isCheckAll
  useEffect(() => {
    if (checked?.length === cart?.length) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  }, [cart, checked]);

  //total Price
  useEffect(() => {
    if (checked.length === 0) {
      setTotalPrice(0);
    } else {
      let sum = 0;
      checked.map((item) => (sum += item.price * item.quantity));
      setTotalPrice(sum);
    }
  }, [checked]);

  //confirm delete Product on Cart
  const confirmDelete = () => {
    confirmAlert({
      title: 'Bạn có chắc muốn xoá những sản phẩm này?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeAll()
        },
        {
          label: 'No'
        }
      ],
      closeOnEscape: true,
      onClickOutside: true
    });
  };

  const checkDeleteChecked = () => {
    if (checked.length === 0) {
      notifyErrorLogin('Hãy chọn sản phẩm để xoá!');
    } else {
      confirmDelete();
    }
  };

  //CheckedAll
  const checkAll = (e) => {
    if (e.target.checked) {
      setChecked(cart);
      setIsCheckedAll(true);
    } else {
      setChecked([]);
      setIsCheckedAll(false);
    }
  };

  //Checked Product
  const handleChecked = (event, cate) => {
    if (event.target.checked === true) {
      if (checked.length === cart.length - 1) {
        setIsCheckedAll(true);
      }
      setChecked([...checked, cate]);
    } else {
      setChecked((prev) => prev.filter((item) => item.id !== cate.id));
      setIsCheckedAll(false);
    }
  };

  //delete product on cart
  const removeItem = (item) => {
    confirmAlert({
      title: 'XÁC NHẬN?',
      message: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            if (cart.find((element) => element.id === item.id)) {
              let newData = { ...currentCart };
              setChecked((prev) => prev.filter((a) => a.id !== item.id));
              setCart((prev) => prev.filter((a) => a.id !== item.id));
              newData.cart_products = cart.filter((a) => a.id !== item.id);
              setNewCartOnDb(newData);
            }
          }
        },
        {
          label: 'No'
        }
      ],
      closeOnEscape: true,
      onClickOutside: true
    });
  };
  // delete all item
  const removeAll = () => {
    // setCart([]);
    // setChecked([]);
    // setTotalPrice(0);
    // let newData = { ...currentCart };
    // newData.cart_products = [];
    // setNewCartOnDb(newData);

    let cartProducts = currentCart.cart_products;
    const newIds = checked.map((item) => item.id);
    cartProducts = cartProducts.filter((ele) => !newIds.includes(ele.id));
    let newData = {
      ...currentCart,
      cart_products: cartProducts
    };
    dispatch(UpdateCart(newData));
    setChecked([]);
    setIsCheckedAll(false);
  };

  const setNewCartOnDb = (data) => {
    dispatch(UpdateCart(data));
  };

  //plus quantity product on cart
  const plusQuantity = (item) => {
    let newData = { ...currentCart };
    if (cart.find((element) => element.id === item.id)) {
      if (item.quantity >= item.amount) {
        setChecked((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, quantity: a.quantity } : a))
        );
        setCart((prev) => prev.map((a) => (a.id === item.id ? { ...a, quantity: a.quantity } : a)));
        newData.cart_products = cart.map((a) =>
          a.id === item.id ? { ...a, quantity: a.quantity } : a
        );
        // notifyErrorLogin('Đã đạt số lượng tối đa trong kho!');
      } else {
        setChecked((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, quantity: a.quantity + 1 } : a))
        );
        setCart((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, quantity: a.quantity + 1 } : a))
        );
        newData.cart_products = cart.map((a) =>
          a.id === item.id ? { ...a, quantity: a.quantity + 1 } : a
        );
      }
    }
    setNewCartOnDb(newData);
  };

  //minus quantity product on cart
  const minusQuantity = (item) => {
    let newData = { ...currentCart };
    if (cart.find((element) => element.id === item.id)) {
      if (item.quantity < 2) {
        // setChecked((prev) => prev.map((a) => (a.id === item.id ? { ...a, quantity: 1 } : a)));
        // setCart((prev) => prev.map((a) => (a.id === item.id ? { ...a, quantity: 1 } : a)));
        // newData.cart_products = cart.map((a) => (a.id === item.id ? { ...a, quantity: 1 } : a));
        removeItem(item);
      } else {
        setChecked((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, quantity: a.quantity - 1 } : a))
        );
        setCart((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, quantity: a.quantity - 1 } : a))
        );
        newData.cart_products = cart.map((a) =>
          a.id === item.id ? { ...a, quantity: a.quantity - 1 } : a
        );
      }
    }
    setNewCartOnDb(newData);
  };

  const changeQuanity = (e) => {
    console.log(e.target.value);
  };

  // no product
  const noProduct = () => {
    return (
      <div className="my-5 text-center">
        <h3 className="mb-4 text-center text-2xl">
          Không có sản phẩm nào trong giỏ hàng, mời bạn quay lại cửa hàng
        </h3>
        <Link
          to="/filter"
          className="mr-6 rounded-lg bg-pink-400 px-4 py-3 text-center font-bold text-white transition duration-300 ease-in-out hover:bg-pink-500"
        >
          Xem sản phẩm
        </Link>
      </div>
    );
  };

  //handle order
  const handleOrder = () => {
    if (checked.length < 1) {
      notifyErrorLogin('Hãy chọn sản phẩm để đặt hàng!');
    } else {
      let totalItems = 0;
      checked.forEach((item) => {
        totalItems += item.quantity;
      });
      sessionStorage.setItem('checkout_cart', JSON.stringify(checked));
      sessionStorage.setItem('checkout_totalPrice', JSON.stringify(totalPrice));
      sessionStorage.setItem('checkout_number', JSON.stringify(totalItems));
    }
  };

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerCart />
      </header>
      {!cart || cart.length < 1 ? (
        noProduct()
      ) : (
        <>
          <div className="my-5 py-5 font-nunito">
            <div className="container mx-auto lg:w-[1300px]">
              <div className="relative px-5  pb-10">
                <img className="mx-auto" src="images/banner/service/icon-leaf-small.png" alt="" />
                <div className="item-center absolute inset-0 top-5 my-auto flex justify-center">
                  <div className="text-center">
                    <span className="block text-[48px] font-bold">HILLSBEAUTY SPA</span>
                    <div>
                      <span className="block w-[500px] font-semibold text-[#945050] md:w-[710px]">
                        Sứ mệnh của chúng tôi là giúp bạn chăm sóc cơ thể và tinh thần.
                      </span>
                      <span className="block w-[500px] font-semibold text-[#945050] md:w-[710px]">
                        Mỗi phương pháp điều trị được thiết kế đặc biệt để mang lại trải nghiệm độc
                        đáo và hiệu quả nhất.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card_header flex h-[55px] items-center border-2 bg-white px-5 text-center text-base">
                <div className="w-[7%]">
                  <input type="checkbox" checked={isCheckedAll} onClick={checkAll} />
                </div>
                <div className="mx-5 w-[93%] text-center md:mx-0 md:w-[45%] ">
                  <span className="font-bold">Sản Phẩm</span>
                </div>
                <div className="hidden md:block md:w-[12%]">
                  <span className="font-bold">Đơn giá</span>
                </div>
                <div className="hidden md:block md:w-[12%]">
                  <span className="font-bold">Số lượng</span>
                </div>
                <div className="hidden md:block md:w-[12%]">
                  <span className="font-bold">Số tiền</span>
                </div>
                <div className="hidden md:block md:w-[12%]">
                  <span className="font-bold">Thao tác</span>
                </div>
              </div>
              <div className="card__body my-5 border-2 bg-white px-5 ">
                {cart?.map((item, index) => {
                  let totalPrice = item.quantity * item.price;
                  return (
                    <div
                      key={index}
                      className="item__product flex w-full items-center border-b-2 py-2"
                    >
                      <div className="w-[7%] text-center">
                        <input
                          type="checkbox"
                          onChange={(event) => handleChecked(event, item)}
                          checked={checked.some((element) => element.id === item.id)}
                        />
                      </div>

                      <div className="grid w-[68%] grid-cols-5 gap-x-10 md:w-[45%]">
                        <Link to={`/product-detail/${item.id}`} className="col-span-2">
                          <img
                            className="float-right h-[80px] w-[80px] object-cover"
                            src={item.image}
                            alt={item.name}
                          />{' '}
                        </Link>
                        <div className="col-span-3 flex items-center">
                          <Link
                            to={`/product-detail/${item.id}`}
                            className=" space-y-[0.5px] md:max-w-[220px]"
                          >
                            <span className="block">{item.name}</span>
                            <span className="block">danh mục</span>
                          </Link>
                        </div>
                      </div>

                      <div className="hidden w-0 text-center md:block md:w-[12%]">
                        <span>{changeDisplayPrices(item.price)}</span>
                      </div>
                      <div className="flex w-[25%] flex-col items-center justify-evenly text-center md:w-[12%] md:justify-center  md:text-center">
                        <div>
                          <div className="flex flex-auto items-center justify-center">
                            <button onClick={() => minusQuantity(item)}>
                              <i className="fa-solid fa-minus cursor-pointer hover:text-red-500"></i>
                            </button>
                            <span className=" px-4">{item.quantity}</span>
                            {/* <input
                              type="number"
                              onChange={changeQuanity}
                              value={item.quantity}
                              className="w-16 border-0 text-center outline-none"
                            /> */}
                            <button
                              onClick={() => plusQuantity(item)}
                              className={
                                item.quantity < item.amount
                                  ? 'cursor-pointer text-black hover:text-red-500'
                                  : 'text-gray-300'
                              }
                              disabled={item.quantity >= item.amount}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                          <div className="text-center">
                            {item.quantity >= item.amount && (
                              <span className="text-[14px] text-red-500">Đạt số lượng tối đa!</span>
                            )}
                          </div>
                        </div>
                        <span
                          onClick={() => removeItem(item)}
                          className="far fa-trash-alt mt-2 block cursor-pointer text-red-500 hover:text-red-700 md:hidden"
                        ></span>
                      </div>
                      <div className="hidden text-center md:block md:w-[12%]">
                        <span className=" text-[#ee4d2d]">{changeDisplayPrices(totalPrice)}</span>
                      </div>
                      <div className="hidden text-center md:block md:w-[12%]">
                        <i
                          className="far fa-trash-alt cursor-pointer text-red-500 hover:text-red-700"
                          onClick={() => removeItem(item)}
                        ></i>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="cart__footer sticky bottom-0 my-5 flex items-center gap-3 bg-white px-5 py-[12px]">
                <div className="w-[21%] text-center md:w-[7%]">
                  <input type="checkbox" checked={isCheckedAll} onClick={checkAll} />
                  <span className="block text-sm md:hidden md:text-base">
                    Chọn tất cả ({cart.length})
                  </span>
                </div>
                <div className="hidden w-[15%] text-left md:block">
                  <span>Chọn tất cả ({cart.length})</span>
                </div>
                <div className="hidden w-[10%] md:block">
                  <span className="cursor-pointer text-red-600" onClick={checkDeleteChecked}>
                    Xóa ({checked.length})
                  </span>
                </div>
                <div className="w-[54%]  md:w-[43%] md:text-center">
                  <p>
                    <span className="text-sm md:text-base">Tổng sản phẩm thanh toán</span>
                    <span className="text-sm md:text-base">({checked.length}):</span>
                    <span className="mx-1 text-xl font-bold text-[#ee4d2d] md:text-lg">
                      {changeDisplayPrices(totalPrice)}
                    </span>{' '}
                    <span
                      className="block cursor-pointer text-red-600 md:hidden"
                      onClick={removeAll}
                    >
                      Xóa tất cả
                    </span>
                  </p>
                </div>
                <div className="w-[25%] text-center">
                  {checked.length < 1 ? (
                    <button
                      className="rounded-lg bg-[#ee4d2d] px-5 py-3 text-white hover:bg-red-400 sm:py-[13px] sm:px-[36px]"
                      onClick={handleOrder}
                    >
                      Đặt hàng
                    </button>
                  ) : (
                    <Link to="/checkout">
                      <button
                        className="rounded-lg bg-[#ee4d2d] px-5 py-3 text-white hover:bg-red-400 sm:py-[13px] sm:px-[36px]"
                        onClick={handleOrder}
                      >
                        Đặt hàng
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {loading && <Loading />}
    </Fragment>
  );
};

export default Cart;
