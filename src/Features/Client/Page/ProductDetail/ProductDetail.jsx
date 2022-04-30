import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import React, { Fragment, useState, useEffect, useContext } from 'react';
import RelatedProducts from './RelatedProducts';
import ReviewProduct from './ReviewProduct';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listRelatedProduct, readProduct } from 'Services/product';
import {
  changeDisplayPrices,
  getId,
  notifyErrorLogin,
  notifySuccess,
  starNoTick,
  starTick
} from 'Utils/Utils';
import { useHistory } from 'react-router-dom';
import { ReadProduct } from 'Features/Slice/Product/ProductSlice';
import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { AuthContext } from 'Helpers/AuthProvider';
import Loading from 'Utils/Loading/Loading';
import SignIn from 'Features/Client/Page/SignIn/SignIn';
import { ListEvaluateByProduct } from 'Features/Slice/Evaluate/EvaluateSlice';
import { listOrder } from 'Services/order';
import BannerFormOrder from 'Features/Client/Components/Header/Banner/BannerFormOrder';

const ProductDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id: idProduct } = useParams();
  useEffect(() => {
    dispatch(ReadProduct(idProduct));
    dispatch(ListEvaluateByProduct(idProduct));
  }, [idProduct]);
  const loading = useSelector((state) => state.product.loading);
  const currentCart = useSelector((state) => state.cart.current);
  const evaluatesByProduct = useSelector((state) => state.evaluate.current);
  const [cart, setCart] = useState(currentCart.cart_products);
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [productToAdd, setProductToAdd] = useState(product);
  const [isLoading, setIsLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useContext(AuthContext);

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    setCart(currentCart.cart_products);
  }, [currentCart]);

  useEffect(() => {
    const getProductById = async () => {
      const { data } = await readProduct(idProduct);
      setProduct({
        ...data,
        quantity: quantity
      });
    };
    getProductById();
  }, [idProduct]);

  const [mainImg, setMainImg] = useState('');
  useEffect(() => {
    setMainImg(product && product.product_album[0]);
    product &&
      setProductToAdd({
        id: product._id,
        name: product.product_name,
        image: product.product_album[0],
        price:
          product.product_sale !== 0 && product.product_sale < product.product_price
            ? product.product_sale
            : product.product_price,
        amount: product.product_amount,
        quantity: 1
      });
  }, [product]);

  const [productsRelated, setProductsRelated] = useState([]);
  const [countProductsSold, setCountProductsSold] = useState(0);
  useEffect(() => {
    const getProductsRelated = async () => {
      const { data } = await listRelatedProduct(idProduct);
      setProductsRelated(data.data);
    };
    getProductsRelated();

    const getOrders = async () => {
      let { data } = await listOrder();
      let orderDone = data.filter((item) => item.status === 4 || item.status === 5);
      let dataProduct = orderDone.map((item) => item.cart);
      let count = 0;
      dataProduct.forEach((cart) => {
        cart.forEach((item) => {
          if (item.id === idProduct) {
            setCountProductsSold((prev) => (prev += item.quantity));
          }
        });
      });
    };
    getOrders();
  }, [idProduct]);

  const user = useSelector((state) => state.auth.current);
  const [userId, setUserId] = useState();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserId(user._id);
    } else if (getId() !== null) {
      setUserId(getId());
    }
  }, [user]);

  const alertLogin = () => {
    notifyErrorLogin('Đăng nhập để mua hàng!');
    if (!context) {
      setIsOpen(true);
    }
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  };
  const handleChooseImage = (image) => {
    setMainImg(image);
  };

  const plusQuantity = () => {
    setProductToAdd((prev) => {
      const newProduct = {
        ...prev,
        quantity: prev.quantity >= prev.amount ? prev.amount : prev.quantity + 1
      };
      return newProduct;
    });
  };

  const minusQuantity = () => {
    setProductToAdd((prev) => {
      const newProduct = {
        ...prev,
        quantity: prev.quantity < 2 ? 1 : prev.quantity - 1
      };
      return newProduct;
    });
  };

  const addProductToCart = () => {
    let cartStorage = sessionStorage.getItem('cart');
    let screenCart = null;
    if (cartStorage === null || cartStorage === undefined) {
      screenCart = [];
    } else {
      screenCart = JSON.parse(cartStorage);
    }
    let existed = currentCart.cart_products.findIndex((ele) => ele.id === productToAdd.id);
    if (existed === -1) {
      if (productToAdd.quantity > productToAdd.amount) {
        notifyErrorLogin('Chọn quá số lượng trong kho!');
      } else {
        screenCart.push(productToAdd);
        const newCart = {
          ...currentCart,
          cart_products: screenCart
        };
        setIsLoading(true);
        dispatch(UpdateCart(newCart));
        setTimeout(() => {
          notifySuccess('Đã thêm vào giỏ hàng!');
          setIsLoading(false);
        }, 1500);
      }
    } else {
      if (screenCart[existed].amount - screenCart[existed].quantity < productToAdd.quantity) {
        notifyErrorLogin(
          'Số lượng sản phẩm trong giỏ hàng và đang đặt đang vượt quá số lượng trong kho!'
        );
        setIsDisabled(true);
        setTimeout(() => {
          setIsDisabled(false);
        }, 3000);
      } else {
        screenCart[existed].quantity += productToAdd.quantity;
        const newCart = {
          ...currentCart,
          cart_products: screenCart
        };
        setIsLoading(true);
        dispatch(UpdateCart(newCart));
        setTimeout(() => {
          notifySuccess('Đã thêm vào giỏ hàng!');
          setIsLoading(false);
        }, 1500);
      }
    }
  };

  const handleCheckout = () => {
    const totalPrice = Number(productToAdd.price) * Number(productToAdd.quantity);
    const checkoutNumber = productToAdd.quantity;
    sessionStorage.setItem('checkout_cart', JSON.stringify([productToAdd]));
    sessionStorage.setItem('checkout_totalPrice', JSON.stringify(totalPrice));
    sessionStorage.setItem('checkout_number', JSON.stringify(checkoutNumber));
    history.push('/checkout');
  };
  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerFormOrder />
      </header>
      <main className="font-nunito">
        <div className="bg-white">
          <div className="pt-6">
            <nav aria-label="Breadcrumb">
              <ol className="mx-auto mb-8 flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <li>
                  <div className="flex items-center">
                    <Link to="/" className="mr-2  font-medium text-gray-900">
                      Trang chủ
                    </Link>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

                <li>
                  <div className="flex items-center">
                    <Link to="/product" className="mr-2  font-medium text-gray-900">
                      Sản phẩm+
                    </Link>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

                <li className="">
                  <Link
                    to=""
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product && product.product_name}
                  </Link>
                </li>
              </ol>
            </nav>
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product && product.product_album[0]}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                  <img
                    src={product && product.product_album[1]}
                    alt="Model wearing plain black basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                  <img
                    src={product && product.product_album[2]}
                    alt="Model wearing plain gray basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-w-4 aspect-h-5 lg:aspect-w-3 lg:aspect-h-4 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product && product.product_album[3]}
                  alt="Model wearing plain white basic tee."
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                  {product && product.product_name}
                </h1>
              </div>
              <div className="mt-4 space-y-5 lg:row-span-3 lg:mt-0">
                <div className="space-x-2 text-gray-900">
                  <span className="text-lg text-gray-300 line-through">
                    {product &&
                      changeDisplayPrices(product.product_sale !== 0 ? product.product_price : '')}
                  </span>
                  <span className="text-3xl text-red-600">
                    {product &&
                      changeDisplayPrices(
                        product.product_sale !== 0 && product.product_sale < product.product_price
                          ? product.product_sale
                          : product.product_price
                      )}
                  </span>
                </div>
                <div className="text-[16px]">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center justify-between">
                    <div className="mt-2 -ml-0.5 flex">
                      {starTick(product && product.product_star, 'text-yellow-400')}
                      {starNoTick(product && product.product_star, 'text-yellow-400')}
                    </div>
                    <span className="border-l border-r px-3 font-medium text-indigo-600 hover:text-indigo-500">
                      {evaluatesByProduct.length} bình luận
                    </span>
                    <p>
                      {countProductsSold}
                      <span className="px-2">Đã bán</span>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-9">
                  <div className="col-span-3">
                    <span>Mã giảm giá</span>
                  </div>
                  <button className="col-span-6 text-left">
                    <span className="bg-[#fbebed] px-3 py-1">SPA2022</span>
                  </button>
                </div>
                <div className="grid grid-cols-9">
                  <div className="col-span-3">
                    <span>Vận chuyển</span>
                  </div>
                  <button className="col-span-6 text-left">
                    <p className="">
                      <i className="fal fa-truck-moving"></i>
                      <span className="pl-2">Miễn phí vận chuyển</span>
                    </p>
                    <span className="text-[14px]">
                      Miễn phí vận chuyển cho đơn hàng trên ₫50.000
                    </span>
                  </button>
                </div>
                <div className="flex">
                  <label className="w-28 font-normal text-[#757575]">Số lượng</label>
                  <div className="flex h-8 items-center justify-center rounded border border-solid border-slate-400">
                    <span
                      onClick={() => minusQuantity()}
                      id="minus"
                      className="cursor-pointer border-r border-solid border-gray-400 px-2 text-xl text-gray-400"
                    >
                      <i className="fa-solid fa-minus cursor-pointer hover:text-red-500"></i>
                    </span>
                    <span id="num" className="cursor-pointer px-2 ">
                      {productToAdd && productToAdd.quantity}
                    </span>
                    <span
                      onClick={() => plusQuantity()}
                      id="plus"
                      className="cursor-pointer border-l border-solid border-gray-400 px-2 text-xl text-gray-400"
                    >
                      <i className="fa-solid fa-plus cursor-pointer hover:text-red-500"></i>
                    </span>
                  </div>
                </div>
                <div className="ml-20">
                  {productToAdd && productToAdd.quantity >= productToAdd.amount ? (
                    <span className="text-red-500">Đã đạt số lượng tối đa trong kho!</span>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-5">
                  {userId ? (
                    <button
                      onClick={handleCheckout}
                      className={
                        productToAdd && productToAdd.quantity < productToAdd.amount
                          ? 'flex w-full items-center justify-center rounded-md border border-transparent bg-[#f87171] py-3 px-2 text-base font-medium text-white hover:bg-[#f87171]/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                          : 'flex w-full items-center justify-center rounded-md border border-transparent bg-[#f87171]/80 py-3 px-2 text-base font-medium text-white hover:bg-[#f87171]/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      }
                      disabled={productToAdd && productToAdd.quantity > productToAdd.amount}
                    >
                      Mua Ngay
                    </button>
                  ) : (
                    <button
                      onClick={alertLogin}
                      disabled={isDisabled}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-[#f87171] py-3 px-2 text-base font-medium text-white hover:bg-[#f87171]/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Mua Ngay
                    </button>
                  )}
                  {userId ? (
                    <button
                      type="submit"
                      onClick={addProductToCart}
                      disabled={isDisabled}
                      className="flex w-full items-center justify-center space-x-2 rounded-md border border-transparent bg-indigo-600 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span>Thêm vào giỏ</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={alertLogin}
                      disabled={isDisabled}
                      className="flex w-full items-center justify-center space-x-2 rounded-md border border-transparent bg-indigo-600 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span>Thêm vào giỏ</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center">
                    <span>Chia sẻ:</span>
                    <Link to="">
                      <i className="fa-brands fa-facebook-messenger ml-2 text-2xl text-[#0384ff] duration-500 hover:-translate-y-2" />
                    </Link>
                    <Link to="">
                      <i className="fa-brands fa-facebook ml-2 text-2xl text-[#3b5999] duration-500 hover:-translate-y-2" />
                    </Link>
                    <Link to="">
                      <i className="fab fa-pinterest ml-2 text-2xl text-[#e00f23] duration-500 hover:-translate-y-2" />
                    </Link>
                    <Link to="">
                      <i className="fab fa-twitter ml-2 text-2xl text-[#10c2ff] duration-500 hover:-translate-y-2" />
                    </Link>
                  </div>
                  <div className="inline-flex items-center border-gray-200">
                    <i className="fa-regular fa-heart mr-2 text-2xl text-red-400 hover:font-bold" />
                    <span>Đã thích</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8">
                <div>
                  <div className="space-y-6">
                    <p
                      className="text-base text-gray-900"
                      dangerouslySetInnerHTML={{
                        __html: product && product.product_description
                      }}
                    ></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ReviewProduct evaluates={evaluatesByProduct} product={product} />
        <RelatedProducts products={productsRelated} userId={userId} />
      </main>
      <SignIn isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />

      {(loading || isLoading) && <Loading />}
    </Fragment>
  );
};

export default ProductDetail;
