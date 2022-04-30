import React, { Fragment, useState, useEffect } from 'react';
import { changeDisplayPricesType2, notifyErrorLogin, notifySuccess } from 'Utils/Utils';
import { orderSTT } from 'Features/type/enumStatus';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'Utils/Loading/Loading';
import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import RatingProduct from './RatingProduct';
import { removeOrder } from 'Services/order';
import { RemoveOrder, UpdateOrder } from 'Features/Slice/Order/OrderSlice';
import { Link } from 'react-router-dom';
import { readProduct } from 'Services/product';
import { UpdateProduct } from 'Features/Slice/Product/ProductSlice';

const MainProcess = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  const [productsOrder, setProductsOrder] = useState();
  const [order, setOrder] = useState();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const handleShowModalEvaluate = (products, order) => {
    setProductsOrder(products);
    setOrder(order);
    setIsOpen(true);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const buttonColors = [
    'bg-[#ffa940]',
    'bg-[#1890ff]',
    'bg-[#13c2c2]',
    'bg-[#f5222d]',
    'bg-[#52c41a]',
    'bg-[#52c41a]'
  ];

  const currentCart = useSelector((state) => state.cart.current);
  const productStore = useSelector((state) => state.product.current);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //mua lại
  const handleRegain = (order) => {
    let cartProducts = currentCart.cart_products;
    const orderProducts = order.cart;

    const isOutOfStock = orderProducts.find((item) => item.amount < 1);
    if (isOutOfStock !== undefined) {
      setIsDisabled(true);
      notifyErrorLogin(`Sản phẩm ${isOutOfStock.name} đã hết hàng trong kho!`);
      setTimeout(() => {
        setIsDisabled(false);
      }, 3000);
    } else {
      const newIds = orderProducts.map((item) => item.id);
      cartProducts = cartProducts.filter((ele) => !newIds.includes(ele.id));
      let newOrderProducts = orderProducts;
      newOrderProducts = newOrderProducts.map((product) => {
        return {
          ...product,
          quantity: 1
        };
      });
      console.log('newOrderProducts: ', newOrderProducts);

      const newCart = {
        ...currentCart,
        cart_products: [...cartProducts, ...newOrderProducts]
      };
      setIsLoading(true);
      dispatch(UpdateCart(newCart));
      notifySuccess('Thêm giỏ hàng thành công!');
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      history.push('cart');
    }
  };
  //xác nhận mua lại
  const confirmRegain = (order) => {
    confirmAlert({
      title: 'Bạn có chắc chắn muốn mua lại?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleRegain(order)
        },
        {
          label: 'No'
        }
      ],
      closeOnEscape: true,
      onClickOutside: true
    });
  };

  //hiển thị trạng thái giao hàng
  const statusShipping = (status) => {
    if (status === 0) {
      return (
        <p className="space-x-2 text-red-500">
          <i className="fas fa-times-circle"></i> <span>Chưa gửi hàng </span>
        </p>
      );
    } else if (status === 1) {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-shipping-fast"></i> <span>Đã gửi hàng </span>
        </p>
      );
    } else if (status === 2) {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-shipping-fast"></i> <span>Đang giao hàng </span>
        </p>
      );
    } else if (status === 3) {
      return (
        <p className="space-x-2 text-[red]">
          <i className="fas fa-times-circle"></i> <span>Đơn bị huỷ </span>
        </p>
      );
    } else {
      return (
        <p className="space-x-2 text-[#26aa99]">
          <i className="fas fa-clipboard-check"></i> <span>Đã giao hàng </span>
        </p>
      );
    }
  };

  //xử lý huỷ đơn hàng
  const handleCancelOrder = (id) => {
    const filterOrder = props.orders.filter((order) => order._id === id);
    let calcelOrder = filterOrder[0];
    calcelOrder = {
      ...calcelOrder,
      status: Number(3)
    };
    //update lại số lượng sản phẩm trong kho
    calcelOrder.cart.forEach(async (item) => {
      const { data } = await readProduct(item.id);
      const newAmount = data.product_amount + item.quantity;
      const newData = {
        ...data,
        product_amount: newAmount
      };
      dispatch(UpdateProduct(newData));
    });

    setIsLoading(true);
    dispatch(UpdateOrder(calcelOrder));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  //xác nhận xóa đơn hàng
  const confirmCancelOrder = (id) => {
    confirmAlert({
      title: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleCancelOrder(id)
        },
        {
          label: 'No'
        }
      ],
      closeOnEscape: true,
      onClickOutside: true
    });
  };

  const noOrder = () => {
    return (
      <div className="my-10 text-center">
        <h3 className="mb-6 text-center text-3xl">Chưa có đơn hàng nào. Đặt hàng ngay!</h3>
        <Link
          to="/cart"
          className="mr-6 rounded-lg bg-blue-500 px-4 py-3  text-center font-bold text-white transition duration-300 ease-in-out hover:bg-blue-600"
        >
          Giỏ hàng
        </Link>
      </div>
    );
  };

  return (
    <Fragment>
      {props.orders.length < 1 ? (
        noOrder()
      ) : (
        <div>
          <form className="group relative">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="pointer-events-none absolute left-3 top-1/2 -mt-2.5 text-slate-400 group-focus-within:text-blue-500"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              />
            </svg>
            <input
              className="w-full appearance-none rounded-md py-2 pl-10 text-sm leading-6 
          text-slate-900 placeholder-slate-400 shadow-sm ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-transparent"
              type="text"
              aria-label="Filter projects"
              placeholder="Tìm kiếm theo tên sản phẩm ...."
            />
          </form>
          {props.orders.map((order) => {
            return (
              <Fragment key={order._id}>
                <div className="border-b px-5">
                  <div className="mt-5 flex justify-end">{statusShipping(order.status)}</div>
                  {order.cart.map((item, index) => {
                    let productDetail = productStore.filter((product) => product._id === item.id);
                    productDetail = productDetail[0];
                    return (
                      <article key={index} className="flex items-start space-x-6 p-3">
                        <Link to={`/product-detail/${productDetail?._id}`}>
                          <img
                            src={item.image}
                            alt=""
                            width="60"
                            height="88"
                            className="flex-none rounded-md bg-slate-100"
                          />
                        </Link>
                        <div className="relative min-w-0 flex-auto">
                          <div className="flex items-center justify-between">
                            <Link to={`/product-detail/${productDetail?._id}`}>
                              <h2 className="truncate pr-20 text-[20px] font-semibold text-slate-900">
                                {item.name}
                              </h2>
                            </Link>
                          </div>
                          <dl className=" mt-2 text-sm font-medium leading-6">
                            <div className="flex items-center justify-between">
                              <p>
                                Danh mục:{' '}
                                <span>
                                  {productDetail && productDetail.category_id.category_name}
                                </span>
                              </p>
                            </div>
                            <div className="flex items-center justify-between">
                              <p>
                                Số lượng: <span className="ml-2">{item.quantity}</span>{' '}
                                <span className="ml-2">x</span>{' '}
                                <span className="ml-2 text-[#ee4d48]">
                                  {changeDisplayPricesType2(item.price)}
                                </span>
                                {productDetail &&
                                productDetail.product_sale > 0 &&
                                productDetail.product_sale < productDetail.product_price ? (
                                  <span className="ml-1 text-gray-300 line-through">
                                    {changeDisplayPricesType2(productDetail.product_price)}
                                  </span>
                                ) : (
                                  ''
                                )}
                              </p>
                              <div className="space-x-2">
                                {/* <span className="text-gray-300 line-through">{changeDisplayPricesType2(item.price)}</span> */}
                                <span className="text-base">Giá tiền:</span>
                                {productDetail &&
                                productDetail.product_sale > 0 &&
                                productDetail.product_sale < productDetail.product_price ? (
                                  <span className="text-gray-300 line-through">
                                    {changeDisplayPricesType2(
                                      productDetail.product_price * item.quantity
                                    )}
                                  </span>
                                ) : (
                                  ''
                                )}
                                <span> </span>
                                <span className="text-base text-[#ee4d48]">
                                  {changeDisplayPricesType2(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                          </dl>
                        </div>
                      </article>
                    );
                  })}
                  <div className="my-2 flex items-center justify-end space-x-2 text-2xl text-[#1f1f1f]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-report-money"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      stroke-width={2}
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                      <rect x={9} y={3} width={6} height={4} rx={2}></rect>
                      <path d="M14 11h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5"></path>
                      <path d="M12 17v1m0 -8v1"></path>
                    </svg>
                    <span className="block">Tổng số tiền: </span>{' '}
                    <span className="block text-[#ee4d48]">
                      {changeDisplayPricesType2(Number(order.totalPrice))}
                    </span>
                  </div>
                  <div className="mb-5 flex items-center justify-end space-x-2">
                    {order.status == 4 ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleShowModalEvaluate(order.cart, order)}
                          type="button"
                          className="inline-block rounded border border-white bg-[#ee4d2d] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:border-[#ee4d2d] hover:bg-white hover:text-[#ee4d2d] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        >
                          Đánh giá
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                    {order.status == 5 ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          type="button"
                          className="inline-block rounded border border-white bg-[#19aaff] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:border-[#ee4d2d] hover:bg-white hover:text-[#ee4d2d] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                        >
                          Đã đánh giá
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                    {order.status == 0 ? (
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => confirmCancelOrder(order._id)}
                          type="button"
                          className={`inline-block rounded bg-[#ff4d4f] px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:opacity-70  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg`}
                        >
                          Hủy đơn hàng
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="flex justify-center space-x-2">
                      <label
                        className={`inline-block rounded ${
                          buttonColors[order.status]
                        } px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out  hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg`}
                      >
                        {order.status == 4 || order.status == 5
                          ? 'Đã hoàn thành'
                          : orderSTT[order.status]}
                      </label>
                    </div>

                    <div className="flex justify-center space-x-2">
                      {order.status >= 3 && order.status <= 5 ? (
                        <button
                          onClick={() => confirmRegain(order)}
                          type="button"
                          disabled={isDisabled}
                          className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                        >
                          Mua lại
                        </button>
                      ) : (
                        ''
                      )}
                    </div>

                    {/* <div className="flex justify-center space-x-2">
                  <button
                    type="button"
                    className="inline-block rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg">
                    Chi tiết đơn hàng
                  </button>
                </div> */}
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
      <RatingProduct
        products={productsOrder}
        order={order}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        closeModal={closeModal}
      />
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default MainProcess;
