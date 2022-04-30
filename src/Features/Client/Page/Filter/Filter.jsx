import { Disclosure, Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/outline';
import { FilterIcon, MinusSmIcon, PlusSmIcon } from '@heroicons/react/solid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import SignIn from 'Features/Client/Page/SignIn/SignIn';
import { UpdateCart } from 'Features/Slice/Cart/CartSlice';
import { AuthContext } from 'Helpers/AuthProvider';
import qs from 'query-string';
import { Fragment, useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Loading from 'Utils/Loading/Loading';
import { ListProduct } from 'Features/Slice/Product/ProductSlice';
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

const Filter = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  document.title = 'Sản phẩm';
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListProduct());
  }, []);
  const productsByStore = useSelector((state) => state.product.current);
  const subCategories = useSelector((state) => state.category.current);
  const [listProduct, setListProduct] = useState(productsByStore);
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
  const countPage = Math.ceil(listProduct?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  //sortter
  const sortOptions = [
    { name: 'Mặc định' },
    { name: 'Sắp xếp từ A-Z' },
    { name: 'Sắp xếp từ Z-A' },
    { name: 'Giá: Thấp đến cao' },
    { name: 'Giá: Cao đến thấp' }
  ];

  //filter
  const { current: cate } = useSelector((item) => item.category);
  const { current: brand } = useSelector((item) => item.brand);
  const history = useHistory();
  const location = useLocation();
  const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [filter, setFilter] = useState();
  const [price, setPrice] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (listBrand === undefined) {
      setListBrand([]);
    }
    if (listCategory === undefined) {
      setListCategory([]);
    }
  }, [listBrand, listCategory]);

  useEffect(() => {
    const price = [...new Set(productsByStore.map((item) => item.product_price))];
    const priceMaxLength = Math.max.apply(Math, price);
    setPrice(priceMaxLength);
    setValue(priceMaxLength);
  }, [productsByStore]);

  //lấy dữ liệu  giá trị mảng thương hiệu
  const handleSetListBrand = (e) => {
    const targetEl = e.target;
    if (targetEl.checked) {
      setListBrand((prev) => {
        const newList = [...prev, targetEl.value];
        return newList.filter((item, idx) => newList.indexOf(item) === idx);
      });
    } else {
      setListBrand((prev) => {
        const newList = [...prev];
        if (newList.includes(targetEl.value)) {
          return newList.filter((item) => item !== targetEl.value);
        } else {
          return newList;
        }
      });
    }
  };

  // lấy dữ liệu giá trị mảng danh mục
  const handleSetListCate = (e) => {
    const targetEl = e.target;
    if (targetEl.checked) {
      setListCategory((prev) => {
        const newList = [...prev, targetEl.value];
        return newList.filter((item, idx) => newList.indexOf(item) === idx);
      });
    } else {
      setListCategory((prev) => {
        const newList = [...prev];
        if (newList.includes(targetEl.value)) {
          return newList.filter((item) => item !== targetEl.value);
        } else {
          return newList;
        }
      });
    }
  };

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    const a = qs.stringify({ listBrand, listCategory, value });
    if (a) {
      history.push(`/filter?${a}`);
    } else {
      history.push(`/filter`);
    }
  };

  const handleResetFilter = (e) => {
    e.preventDefault();
    history.push('/filter');
  };

  useEffect(() => {
    const a = qs.parse(location.search);
    if (typeof a.listBrand === 'string') {
      setListBrand([a.listBrand]);
    } else {
      setListBrand(a.listBrand);
    }
    if (typeof a.listCategory === 'string') {
      setListCategory([a.listCategory]);
    } else {
      setListCategory(a.listCategory);
    }
    // if (typeof a.value === 'string') {
    //   setValue(Number(a.value));
    // } else {
    //   setValue(a.value);
    // }

    setFilter(a);
  }, [location.search]);

  useEffect(() => {
    const arr = [];
    productsByStore?.map((item) => {
      let count = 0;
      if (filter?.listBrand?.includes(item?.brand_id?._id) || !filter?.listBrand) {
        count++;
      }
      if (filter?.listCategory?.includes(item?.category_id?._id) || !filter?.listCategory) {
        count++;
      }
      if (filter?.value >= item?.product_price || !filter?.value) {
        count++;
      }
      if (count === 3) {
        arr.push(item);
      }
    });
    setListProduct(arr);
  }, [filter, productsByStore]);

  const [selected, setSelected] = useState(sortOptions[0]);

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

  const handleChangeSotter = (value) => {
    if (value.name === 'Giá: Thấp đến cao') {
      setSelected(value);
      setListProduct((prev) => prev.sort((a, b) => a.product_price - b.product_price));
    } else if (value.name === 'Giá: Cao đến thấp') {
      setSelected(value);
      setListProduct((prev) => prev.sort((a, b) => b.product_price - a.product_price));
    } else if (value.name === 'Sắp xếp từ A-Z') {
      setSelected(value);
      setListProduct((prev) => prev.sort((a, b) => a.product_name.localeCompare(b.product_name)));
    } else if (value.name === 'Sắp xếp từ Z-A') {
      setSelected(value);
      setListProduct((prev) => prev.sort((a, b) => b.product_name.localeCompare(a.product_name)));
    } else {
      setSelected(value);
      setListProduct((prev) => prev.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)));
    }
  };

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerProduct />
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative z-10 flex flex-wrap items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
          <h1 className="font-nunito text-2xl tracking-tight text-gray-900 md:text-3xl">
            Sản phẩm
          </h1>
          <div className="flex items-center space-x-2">
            <Listbox value={selected} onChange={(value) => handleChangeSotter(value)}>
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
                        {sortOptions.map((option, index) => (
                          <Listbox.Option
                            key={index}
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
              {/* category */}
              <Disclosure as="div" className="border-b border-gray-200 py-6 font-nunito text-base">
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                        <span className=" pl-3 text-gray-900">Danh mục</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4 pl-3">
                        {subCategories?.map((option, optionIdx) => (
                          <div key={optionIdx} className="flex items-center pl-3">
                            <input
                              id={`${option._id}`}
                              name={`${option.category_name}`}
                              type="checkbox"
                              value={`${option._id}`}
                              checked={listCategory?.includes(option._id)}
                              onChange={(e) => handleSetListCate(e)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-gray-600">{option.category_name}</label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>

              {/*brand*/}
              <Disclosure as="div" className="border-b border-gray-200 py-6 font-nunito text-base">
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-gray-400 hover:text-gray-500">
                        <span className=" pl-3 text-gray-900">Thương hiệu</span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusSmIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4 pl-3">
                        {brand?.map((option, optionIdx) => (
                          <div key={optionIdx} className="flex items-center pl-3">
                            <input
                              id={`${option._id}`}
                              name={`${option.brand_name}`}
                              type="checkbox"
                              checked={listBrand?.includes(option._id)}
                              value={`${option._id}`}
                              onChange={(e) => handleSetListBrand(e)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label className="ml-3 text-gray-600">{option.brand_name}</label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <div className="mt-3 flex flex-row items-center justify-between">
                <span className="pl-3 text-[16px] text-gray-900"> Giá sản phẩm</span>
                <span className="pr-2 text-[16px] text-gray-900">{changeDisplayPrices(value)}</span>
              </div>
              <input
                className="w-full "
                style={{ accentColor: '#e78fa1' }}
                type="range"
                min="0"
                max={price}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div className="mt-5 flex items-center justify-center gap-4 ">
                <ButtonComponent
                  callBack={handleSubmitFilter}
                  mes="Tìm kiếm"
                  size="normal"
                  color="#e78fa1"
                />
                <ButtonComponent callBack={handleResetFilter} mes="Làm mới" size="normal" />
              </div>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3 ">
              {/* Replace with your content */}
              <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
                  <h2 className="sr-only">Products</h2>
                  <div className="grid h-[896px] grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-10">
                    {listProduct.length > 0 ? (
                      listProduct?.slice(pageVisited, pageVisited + newPerPage)?.map((product) => (
                        <div
                          key={product._id}
                          className="md:bg-4 flex items-center justify-center   lg:mb-8 xl:mb-12"
                        >
                          <div
                            className="group relative h-[100%] w-[100%] bg-cover bg-center sm:h-[130px] sm:w-[150px] sm:max-w-full md:h-[170px] md:w-[170px] md:max-w-full lg:h-[200px] lg:w-[200px] lg:max-w-full xl:h-[243px] xl:w-[243px] xl:max-w-full"
                            style={{
                              backgroundImage: `url(${product.product_album[0]})`
                            }}
                          >
                            <Link key={product?._id} to={`/product-detail/${product._id}`}>
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
                                <h3 className="text-[16px] font-semibold">
                                  {product.product_name}
                                </h3>
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
                      ))
                    ) : (
                      <div className="col-span-2 text-center lg:col-span-3">
                        Không tìm thấy sản phẩm
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* /End replace */}
              <div className="flex justify-center pt-10">
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pt-6 sm:px-6">
                  <ReactPaginate
                    breakLabel="...."
                    previousLabel={<span aria-hidden="true">&laquo;</span>}
                    nextLabel={<span aria-hidden="true">&raquo;</span>}
                    pageCount={countPage}
                    onPageChange={changePage}
                    containerClassName={
                      'paginationBttns flex justify-end my-5 gap-4 mx-5 items-center'
                    }
                    previousLinkClassName={
                      'page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none'
                    }
                    nextLinkClassName={
                      'page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 focus:shadow-none'
                    }
                    pageClassName={'page-item'}
                    pageLinkClassName={
                      'page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none '
                    }
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

export default Filter;
