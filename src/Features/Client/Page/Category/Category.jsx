import { Disclosure, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { FilterIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { FilterCategory } from 'Features/Slice/Product/ProductSlice';
import { Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { readCategory } from 'Services/category';
import { filterCategory } from 'Services/product';
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

const Category = () => {
  document.title = 'Danh mục';
  const dispatch = useDispatch();
  const { id: idCategory } = useParams();
  const [category, setCategory] = useState('');
  const [productsByCategory, setProductsByCategory] = useState([]);
  const productsByStore = useSelector((state) => state.product.current);
  // const loading = useSelector((state) => state.product.loading);
  const currentCart = useSelector((state) => state.cart.current);
  const user = useSelector((state) => state.auth.current);
  const [userId, setUserId] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const getCategory = async () => {
      const { data } = await readCategory(idCategory);
      setCategory(data);
    };
    getCategory();

    const productByCate = productsByStore.filter((item) => item.category_id._id === idCategory);
    setProductsByCategory(productByCate);
  }, [idCategory]);

  //phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 6;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(productsByCategory?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const sortOptions = [
    { name: 'Phổ biến nhất' },
    { name: 'Đánh giá tốt nhất' },
    { name: 'Mới nhất' },
    { name: 'Giá: Thấp đến cao' },
    { name: 'Giá: Cao đến thấp' }
  ];
  const subCategories = useSelector((state) => state.category.current);

  const filters = [
    {
      id: '1',
      name: 'Thương hiệu',
      options: [
        { value: 'all', label: 'Tất cả', checked: true },
        { value: 'mac', label: 'M-A-C', checked: false },
        { value: 'wizout', label: 'WizOut', checked: false },
        { value: 'estteeLauder', label: 'ESTEE LAUDER', checked: false },
        { value: 'green', label: 'Green', checked: false },
        { value: 'purple', label: 'Purple', checked: false }
      ]
    }
  ];
  const [selected, setSelected] = useState(sortOptions[0]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserId(user._id);
    } else if (getId() !== null) {
      setUserId(getId());
    }
  }, [user]);

  const addProductCart = async (id, name, image, price, amount) => {
    setIsDisabled(true);
    if (!userId) {
      notifyErrorLogin('Đăng nhập để mua hàng!');
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
        await dispatch(UpdateCart(newCart));

        notifySuccess('Đã thêm vào giỏ hàng!');
      }
    }
    setIsLoading(false);
  };

  const alertOutOfStock = () => {
    setIsDisabled(true);
    notifyErrorLogin('Sản phẩm đã hết hàng, vui lòng chọn sản phẩm khác!');

    setIsDisabled(false);
  };

  const buttonAdd = (id, name, image, price, amount) => {
    if (userId) {
      if (amount < 1) {
        return (
          <button
            onClick={alertOutOfStock}
            className={
              !isDisabled
                ? 'border border-[#252525] px-3 py-1 capitalize text-black drop-shadow-lg hover:text-[#252525]'
                : 'border border-[#252525] px-3 py-1 capitalize text-black drop-shadow-lg '
            }
            disabled={isDisabled}
          >
            hết hàng <i className="far fa-sad-tear"></i>
          </button>
        );
      } else {
        return (
          <button
            onClick={() => {
              addProductCart(id, name, image, price, amount);
            }}
            className={
              !isDisabled
                ? 'border border-[#252525] bg-[#252525] px-3 py-1 capitalize text-white drop-shadow-lg hover:bg-white hover:text-[#252525]'
                : 'border border-[#252525] bg-[#252525] px-3 py-1 capitalize text-white drop-shadow-lg '
            }
            disabled={isDisabled}
          >
            thêm vào giỏ
          </button>
        );
      }
    } else {
      if (amount < 1) {
        return (
          <button
            onClick={() => {
              notifyErrorLogin('Đăng nhập để mua hàng');
            }}
            className={
              !isDisabled
                ? 'border border-[#252525] px-3 py-1 capitalize text-black drop-shadow-lg hover:text-[#252525]'
                : 'border border-[#252525] px-3 py-1 capitalize text-black drop-shadow-lg '
            }
            disabled={isDisabled}
          >
            hết hàng <i className="far fa-sad-tear"></i>
          </button>
        );
      } else {
        return (
          <button
            onClick={() => {
              notifyErrorLogin('Đăng nhập để mua hàng');
            }}
            className={
              !isDisabled
                ? 'border border-[#252525] bg-[#252525] px-3 py-1 capitalize text-white drop-shadow-lg hover:bg-white hover:text-[#252525]'
                : 'border border-[#252525] bg-[#252525] px-3 py-1 capitalize text-white drop-shadow-lg '
            }
            disabled={isDisabled}
          >
            thêm vào giỏ
          </button>
        );
      }
    }
  };

  const noProduct = () => {
    return (
      <>
        <div></div>
        <div className="text-center">
          <div className="text-2xl ">
            Danh mục này chưa có sản phẩm <i className="far fa-sad-tear"></i>
          </div>
          <div className="mt-[20px]">
            <Link to="/product">
              <button className="rounded border border-blue-700 bg-blue-500 py-2 px-4 font-semibold text-white hover:bg-blue-700">
                Trang sản phẩm
              </button>
            </Link>
          </div>
        </div>
        <div></div>
      </>
    );
  };

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerProduct />
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative z-10 flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="font-nunito text-4xl tracking-tight text-gray-900">
            Danh mục <i className="fa-solid fa-angles-right text-2xl "></i> {category.category_name}
          </h1>
          <div className="flex items-center space-x-2">
            <Listbox value={selected} onChange={setSelected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="float-right block text-base font-medium text-gray-700">
                    Sắp xếp
                  </Listbox.Label>
                  <div className="relative mt-1 w-48">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">{selected.name}</span>
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {sortOptions.map((option) => (
                          <Listbox.Option
                            key={option.name}
                            className={({ active }) =>
                              classNames(
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                              )
                            }
                            value={option}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected ? 'font-semibold' : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {option.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
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
                {subCategories?.map((category) => (
                  <Link key={category._id} to={`/category/${category._id}`}>
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
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
                  <h2 className="sr-only">Products</h2>
                  <div className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
                    {productsByCategory.length !== 0
                      ? productsByCategory
                          ?.slice(pageVisited, pageVisited + newPerPage)
                          ?.map((product) => (
                            <li key={product._id} className="list-none overflow-hidden">
                              <Link to={`/product-detail/${product._id}`}>
                                <article
                                  className="relative"
                                  style={{
                                    backgroundImage: `url(${product.product_album[0]})`,
                                    backgroundSize: '100% 100%',
                                    width: '100%',
                                    height: '300px'
                                  }}
                                >
                                  <div className="overflow-hidden ">
                                    <div
                                      className="group relative transform object-cover  
                              opacity-0 
                              transition duration-500 hover:scale-105 hover:opacity-100"
                                    >
                                      <img
                                        className=" mx-auto h-[300px] w-[100%] transform object-cover transition duration-500 hover:scale-105"
                                        src={product.product_album[1]}
                                        alt={product.imageAlt}
                                      />
                                    </div>
                                  </div>
                                </article>
                              </Link>
                              <div className="my-[15px] space-y-2 text-center text-[14px]">
                                <Link to="">
                                  <h3 className="text-[18px] font-extralight hover:text-[#56cfe1]">
                                    {product.product_name}
                                  </h3>
                                </Link>
                                <span className="block">{product.capacity}</span>
                                <div className="flex cursor-alias items-center justify-between">
                                  <span>113 bình luận</span>
                                  <div>
                                    {starTick(product.product_star)}
                                    {starNoTick(product.product_star)}
                                  </div>
                                </div>
                                <div className="flex items-center justify-between text-[16px]">
                                  <span className="block cursor-alias text-[#252525]">
                                    {changeDisplayPrices(
                                      product.product_sale !== 0 &&
                                        product.product_sale < product.product_price
                                        ? product.product_sale
                                        : product.product_price
                                    )}
                                  </span>
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
                            </li>
                          ))
                      : noProduct()}
                  </div>
                </div>
              </div>
              {/* /End replace */}
              <div className="flex justify-center pt-10">
                {productsByCategory?.length > 0 ? (
                  <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pt-6 sm:px-6">
                    <>
                      <ReactPaginate
                        breakLabel="...."
                        previousLabel={'Prev'}
                        nextLabel={'Next'}
                        pageCount={countPage}
                        onPageChange={changePage}
                        containerClassName={
                          'paginationBttns flex justify-end my-5 mx-5 items-center'
                        }
                        previousLinkClassName={
                          'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                        nextLinkClassName={
                          'bg-white border border-gray-300 text-gray-500 text-white hover:bg-blue-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                        pageClassName={
                          'flex justify-center items-center w-[30px] relative h-[35px] mx-1 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg leading-tight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                        pageLinkClassName={'w-full h-full absolute text-center pt-[8px]'}
                        activeClassName={'paginationActive text-white bg-[#f472b6]'}
                      />
                    </>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      {isLoading && <Loading />}
      <NavBottom />
    </Fragment>
  );
};

export default Category;
