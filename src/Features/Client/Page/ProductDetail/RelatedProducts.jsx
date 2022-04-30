import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {
  addToCart,
  changeDisplayPrices,
  getTotalItemOnCart,
  notifyErrorLogin,
  notifySuccess,
  starNoTick,
  starTick
} from 'Utils/Utils';
import { Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AuthContext } from 'Helpers/AuthProvider';
import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

const RelatedProducts = (props) => {
  const { products, userId } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  const currentCart = useSelector((state) => state.cart.current);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsOpen(false);
  };
  const [context] = useContext(AuthContext);

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

  const buttonAdd = (id, name, image, price, amount) => {
    if (userId) {
      if (amount < 1) {
        return (
          <label
            className={
              !isDisabled
                ? 'mx-auto flex w-full items-center justify-center space-x-1 rounded-md bg-[#fa5931] py-2 capitalize text-white opacity-0 group-hover:opacity-100'
                : 'mx-auto flex w-full items-center justify-center space-x-1 rounded-md bg-[#2879fe] py-2 capitalize text-white opacity-0 group-hover:opacity-100'
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
                : 'mx-auto flex w-full items-center justify-center space-x-1 rounded-md bg-[#2879fe] py-2 capitalize text-white opacity-0 group-hover:opacity-100'
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

  const state = {
    responsive: {
      0: {
        items: 2
      },
      450: {
        items: 2
      },
      600: {
        items: 2
      },
      900: {
        items: 2
      },
      1000: {
        items: 3
      },
      1200: {
        autoplay: false,
        items: 4
      }
    }
  };

  return (
    <div className="flex items-center justify-center px-4 md:px-6 2xl:container 2xl:mx-auto 2xl:px-0">
      <div className="mb-5 flex w-full flex-col items-start justify-start space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-semibold leading-7 text-gray-800 lg:text-4xl lg:leading-9">
              Sản phẩm liên quan
            </p>
          </div>
        </div>
        <div className="container mx-auto">
          <OwlCarousel
            className="owl-theme"
            items={products.length}
            loop
            {...state}
            autoplay={true}
            dots={false}
            autoplayTimeout={4000}
          >
            {products &&
              products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center justify-center lg:mb-32 xl:mb-40"
                >
                  <div
                    className="group relative h-[100%] w-[100%] bg-cover bg-center sm:h-[300px] sm:w-[150px] sm:max-w-full md:h-[170px] md:w-[170px] md:max-w-full lg:h-[200px] lg:w-[200px] lg:max-w-full xl:h-[243px] xl:w-[243px] xl:max-w-full"
                    style={{
                      backgroundImage: `url(${product.product_album[0]})`
                    }}
                  >
                    <Link key={product?._id} to={`/product-detail/${product._id}`}>
                      <div className="relative w-full">
                        <img
                          className="mx-auto  w-[100%] opacity-0 duration-700 group-hover:opacity-100 md:h-[100%]"
                          src={product.product_album[1]}
                          alt={product.imageAlt}
                        />
                      </div>
                    </Link>
                    <div className="absolute inset-x-0 -bottom-40 z-30 duration-300 group-hover:-translate-y-5">
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
                        <div className="flex justify-center">
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
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
