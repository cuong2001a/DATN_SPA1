import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { Fragment, useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { AuthContext } from 'Helpers/AuthProvider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Loading from 'Utils/Loading/Loading';
const ProductPageHome = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.current);
  const productSortByStar = []
    .concat(products)
    .sort((a, b) => (a.product_star > b.product_star ? -1 : 1));

  const currentCart = useSelector((state) => state.cart.current);
  const user = useSelector((state) => state.auth.current);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [context] = useContext(AuthContext);

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
      <section>
        <article className="container mx-auto my-20 justify-between px-5 md:flex md:px-0">
          <div>
            <Link to="">
              <h3 className="font-spa text-[38px] lg:text-[60px]">Sản phẩm độc quyền</h3>
            </Link>
            <span className="block w-[380px] indent-5 font-nunito text-[16px] lg:w-[600px]">
              Với mong muốn mang đến cho quý khách hàng niềm hạnh phúc về làn da sáng đẹp, khỏe mạnh
              cùng mức giá hợp lý
            </span>
          </div>
          <div className="flex items-center justify-end">
            <button className="rounded-full border bg-[#df9896] px-5 py-2 text-white hover:border-[#df9896] hover:bg-white hover:text-[#df9896] lg:px-10">
              <Link to="/filter" className="flex items-center group-hover:underline">
                Xem thêm
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </Link>
            </button>
          </div>
        </article>
        <article className="container mx-auto grid grid-cols-2 gap-5 px-5 md:grid-cols-4 lg:w-[1300px] lg:gap-10 lg:px-0">
          {productSortByStar &&
            productSortByStar?.slice(0, 4)?.map((product) => (
              <div
                key={product._id}
                className="md:bg-4 flex items-center justify-center  lg:mb-8 xl:mb-12"
              >
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
                        {starNoTick(product.product_star, 'text-yellow-500')}
                      </div>
                      <h3 className="text-[16px] font-semibold">{product.product_name}</h3>
                      <div className="mt-3 flex justify-center">
                        {product.product_sale !== 0 && (
                          <span className="mr-5 block text-[16px] font-semibold line-through">
                            {changeDisplayPrices(
                              product.product_sale !== 0 &&
                                product.product_sale < product.product_price
                                ? product.product_price
                                : ''
                            )}
                          </span>
                        )}
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
                        product.product_sale !== 0 && product.product_sale < product.product_price
                          ? product.product_sale
                          : product.product_price,
                        product.product_amount
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </article>
      </section>
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default ProductPageHome;
