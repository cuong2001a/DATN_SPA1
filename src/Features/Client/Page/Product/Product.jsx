import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { Fragment, useEffect, useState, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from 'Utils/Loading/Loading';
import {
  addToCart,
  changeDisplayPrices,
  getId,
  getTotalItemOnCart,
  notifyErrorLogin,
  notifySuccess,
  starNoTick,
  starTick
} from 'Utils/Utils';
import NavBottom from '../../Components/Component/NavBottom/NavBottom';
import BannerProduct from '../../Components/Header/Banner/BannerProduct';
import HeaderTop from '../../Components/Header/HeaderTop';
import { AuthContext } from 'Helpers/AuthProvider';
import SignIn from 'Features/Client/Page/SignIn/SignIn';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import RangeSlider from './RangeSlide';

const Product = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  document.title = 'Sản phẩm';
  const dispatch = useDispatch();
  const productsByStore = useSelector((state) => state.product.current);
  const currentCart = useSelector((state) => state.cart.current);
  const user = useSelector((state) => state.auth.current);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [context] = useContext(AuthContext);

  //phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 6;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(productsByStore?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const subCategories = useSelector((state) => state.category.current);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserId(user._id);
    } else if (getId() !== null) {
      setUserId(getId());
    }
  }, [user]);

  const addProductCart = async (id, name, image, price, amount) => {
    if (!userId) {
      setIsDisabled(true);
      notifyErrorLogin('Đăng nhập để mua hàng!');
      setTimeout(() => {
        setIsDisabled(false);
      }, 3000);
    } else {
      if (addToCart(id, name, image, price, amount) === false) {
        notifyErrorLogin('Sản phẩm này trong giỏ hàng đã đạt số lượng tối đa!');
      } else {
        getTotalItemOnCart();
        const newCart = {
          ...currentCart,
          cart_products: JSON.parse(sessionStorage.getItem('cart'))
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

  const alertLogin = () => {
    setIsDisabled(true);
    notifyErrorLogin('Đăng nhập để mua hàng!');
    if (!context) {
      setIsOpen(true);
    }
    setTimeout(() => {
      setIsDisabled(false);
    }, 2000);
  };

  const buttonAdd = (id, name, image, price, amount) => {
    if (userId) {
      if (amount < 1) {
        return (
          <label
            className={
              !isDisabled
                ? 'mx-auto flex w-full items-center justify-center space-x-1 rounded-md bg-[#fa5931] py-2 capitalize text-white opacity-0 group-hover:opacity-100'
                : 'mx-auto flex w-full items-center justify-center space-x-1 rounded-md bg-[#f472b6] py-2 capitalize text-white opacity-0 group-hover:opacity-100'
            }
            disabled={isDisabled}
          >
            <span className="block"> hết hàng </span>
            <i className="far fa-sad-tear"></i>
          </label>
        );
      } else {
        return (
          <Button
            className="w-full opacity-0 group-hover:opacity-100"
            disabled={isDisabled}
            onClick={() => {
              addProductCart(id, name, image, price, amount);
            }}
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
          >
            Thêm vào giỏ
          </Button>
        );
      }
    } else {
      if (amount < 1) {
        return (
          <label
            className={
              !isDisabled
                ? 'mx-auto flex w-full items-center justify-center space-x-1 rounded-md bg-[#fa5931] py-2 capitalize text-white opacity-0 group-hover:opacity-100'
                : 'mx-auto flex w-full items-center justify-center space-x-1 rounded-md bg-[#f472b6] py-2 capitalize text-white opacity-0 group-hover:opacity-100'
            }
            disabled={isDisabled}
          >
            <span className="block"> hết hàng </span>
            <i className="far fa-sad-tear"></i>
          </label>
        );
      } else {
        return (
          <Button
            className="w-full opacity-0 group-hover:opacity-100"
            disabled={isDisabled}
            onClick={alertLogin}
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
          >
            Thêm vào giỏ
          </Button>
        );
      }
    }
  };

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerProduct />
      </header>
      <main className="mx-auto max-w-7xl px-4 font-nunito sm:px-6">
        <div className="relative z-10 flex flex-wrap items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="font-nunito text-2xl tracking-tight text-gray-900 md:text-3xl">
            Sản phẩm
          </h1>
          <div className="mr-[5%] flex items-center justify-center gap-5 space-x-2">
            <span className="mb-2 ">Lọc theo giá</span>
            <RangeSlider min={100000} max={21000000} />
          </div>
        </div>
        <section aria-labelledby="products-heading" className="py-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block lg:overflow-hidden lg:bg-fixed">
              <h3 className="sr-only">Categories</h3>
              <ul className=" border-b border-gray-200 pb-6 font-nunito text-base text-gray-900">
                {subCategories.map((category) => (
                  <Link to={`/category/${category._id}`} key={category._id}>
                    <li className="cursor-pointer py-2 px-3 hover:bg-gray-200 active:text-[#e78fa1]">
                      {category.category_name}
                    </li>
                  </Link>
                ))}
              </ul>
            </form>
            {/* Product grid */}
            <div className="lg:col-span-3 ">
              {/* Replace with your content */}
              <div className="bg-white">
                <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl">
                  <h2 className="sr-only">Products</h2>
                  <div className="grid grid-cols-2 gap-y-40 gap-x-5    md:grid-cols-3 md:gap-x-6">
                    {productsByStore &&
                      productsByStore
                        ?.slice(pageVisited, pageVisited + newPerPage)
                        ?.map((product) => (
                          <div className="md:bg-4 flex items-center justify-center   lg:mb-8 xl:mb-12">
                            <div
                              className="group relative h-[100%] w-[100%] bg-cover bg-center sm:h-[130px] sm:w-[150px] sm:max-w-full md:h-[170px] md:w-[170px] md:max-w-full lg:h-[200px] lg:w-[200px] lg:max-w-full xl:h-[243px] xl:w-[243px] xl:max-w-full"
                              style={{
                                backgroundImage: `url(${product.product_album[0]})`
                              }}
                            >
                              <Link to={`/product-detail/${product._id}`}>
                                <div className="relative w-full">
                                  <img
                                    className="mx-auto h-[100%] w-[100%] opacity-0 duration-700 group-hover:opacity-100"
                                    src={product.product_album[1]}
                                    alt={product.imageAlt}
                                  />
                                </div>
                              </Link>
                              <div className="absolute inset-x-0 -bottom-40 z-30   duration-300 group-hover:-translate-y-5">
                                <div className="w-full space-y-1 bg-white px-2 py-3 text-center">
                                  <h4>
                                    <Link
                                      to={`/product-detail/${product._id}`}
                                      className="text-[12px] uppercase text-[#999]"
                                    >
                                      {product.product_name}
                                    </Link>
                                  </h4>
                                  <div>
                                    {starTick(product.product_star, 'text-yellow-500')}
                                    {starNoTick(product.product_star)}
                                  </div>
                                  <h3 className="text-[16px] font-semibold">
                                    {product.product_name}
                                  </h3>
                                  <div className="flex justify-between">
                                    <span className="block text-[16px] font-semibold line-through">
                                      {changeDisplayPrices(
                                        product.product_sale !== 0 &&
                                          product.product_sale < product.product_price
                                          ? product.product_price
                                          : ''
                                      )}
                                    </span>
                                    <span className="block text-[16px] font-semibold text-red-500">
                                      {changeDisplayPrices(
                                        product.product_sale !== 0 &&
                                          product.product_sale < product.product_price
                                          ? product.product_sale
                                          : product.product_price
                                      )}
                                    </span>
                                  </div>
                                  {buttonAdd(
                                    product._id,
                                    product.product_name,
                                    product.product_album[0],
                                    product.product_sale !== 0 &&
                                      product.product_sale < product.product_price
                                      ? product.product_sale
                                      : product.product_price,
                                    product.product_amount
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
              {/* /End replace */}
              <div className="flex justify-center pt-40">
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pt-6 sm:px-6">
                  <ReactPaginate
                    breakLabel="...."
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    pageCount={countPage}
                    onPageChange={changePage}
                    containerClassName={'paginationBttns flex justify-end my-5 mx-5 items-center'}
                    previousLinkClassName={
                      'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }
                    nextLinkClassName={
                      'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }
                    pageClassName={
                      'flex justify-center items-center w-[30px] relative h-[35px] mx-1 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg leading-tight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    }
                    pageLinkClassName={'w-full h-full absolute text-center pt-[8px]'}
                    activeClassName={'paginationActive text-white bg-[#f472b6]'}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {isLoading && <Loading />}
      <NavBottom />
      <SignIn isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
    </Fragment>
  );
};

export default Product;
