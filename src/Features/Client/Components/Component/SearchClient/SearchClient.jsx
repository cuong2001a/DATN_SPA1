import React, { Fragment, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { filterProduct, filterServices } from 'Utils/Utils';
import { useHistory } from 'react-router-dom';

const SearchClient = (props) => {
  const { handleSubmit } = useForm();
  const history = useHistory();
  const { current: productArr } = useSelector((item) => item.product);
  const { current: serviceArr } = useSelector((item) => item.service);
  const [arrPro, setArrPro] = useState([]);
  const [arrSer, setArrSer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setProducts(productArr?.filter((item) => item.product_star >= 4));
    setServices(serviceArr?.filter((item) => item.service_star >= 4));
    return () => {
      setProducts([]);
      setServices([]);
    };
  }, [productArr, props, serviceArr]);

  const handleChange = (e) => {
    if (e?.target.value === '') {
      setArrPro([]);
      setArrSer([]);
      setKeyword('');
    } else {
      setKeyword(e?.target.value);
      setIsLoading(true);
    }
  };

  const naviSearch = () => {
    props.closeModal();
    if (keyword.length === 0) {
      history.push(`/search?keyword=`);
      setKeyword('');
    } else {
      history.push(`/search?keyword=${keyword}`);
      setKeyword('');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      const resultPro = filterProduct(keyword.trim(), productArr);
      const resultSer = filterServices(keyword.trim(), serviceArr);
      setArrPro(resultPro);
      setArrSer(resultSer);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden font-nunito"
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            opacity: 0.3,
            backgroundColor: 'black'
          }}
        ></div>
        <div
          className="enter-done fixed inset-0  z-50 flex  transform items-center justify-center px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          onSubmit={handleSubmit()}
        >
          <div className="h-[541px] w-full max-w-2xl overflow-auto rounded-lg bg-white shadow-lg">
            <form className="border-b border-slate-200">
              <div className="relative">
                <input
                  id="search"
                  className="w-full appearance-none border-0 py-3 pl-10 pr-4 placeholder-slate-400 "
                  type="search"
                  value={keyword}
                  onChange={(e) => handleChange(e)}
                  placeholder="Tìm kiếm…"
                />
                <button
                  className="group absolute inset-0 right-auto"
                  type="submit"
                  aria-label="Search"
                >
                  {isLoading ? (
                    <svg
                      fill="none"
                      className="ml-4 mr-2 h-4 w-4 shrink-0 animate-spin fill-current text-slate-400"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      />
                    </svg>
                  ) : (
                    <button onClick={naviSearch}>
                      <svg
                        className="ml-4 mr-2 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path>
                        <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"></path>
                      </svg>
                    </button>
                  )}
                </button>

                <button
                  onClick={props.closeModal}
                  type="button"
                  className="absolute top-2 right-2 z-40 rounded-full stroke-black text-4xl font-bold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="py-4 px-2">
              {keyword.length === 0 ? (
                <div className="mb-3 last:mb-0">
                  <div className="mb-2 px-2 text-xs font-semibold uppercase text-slate-400">
                    Sản phẩm yêu thích
                  </div>
                  <ul className="text-sm">
                    {products?.map((item, index) => {
                      if (index <= 4) {
                        return (
                          <li key={index}>
                            <Link
                              to={`/product-detail/${item._id}`}
                              className="group flex items-center rounded p-2 text-slate-800 hover:bg-indigo-500 hover:text-white"
                            >
                              <svg
                                className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                              </svg>
                              <span className="font-medium capitalize text-slate-800 group-hover:text-white">
                                {item.product_name}
                              </span>
                            </Link>
                          </li>
                        );
                      }
                    })}
                    <p className="cursor-pointer hover:text-blue-500" onClick={naviSearch}>
                      Còn {products.length - 5} sản phẩm nữa
                    </p>
                  </ul>
                </div>
              ) : arrPro.length > 0 ? (
                <div className="mb-3 last:mb-0">
                  <div className="mb-2 px-2 text-xs font-semibold uppercase text-slate-400">
                    Sản phẩm tìm kiếm
                  </div>
                  <ul className="text-sm">
                    {arrPro?.map((item, index) => {
                      if (index <= 4) {
                        return (
                          <li key={index}>
                            <Link
                              to={`/product-detail/${item._id}`}
                              className="group flex items-center rounded p-2 text-slate-800 hover:bg-indigo-500 hover:text-white"
                            >
                              <svg
                                className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                              </svg>
                              <span className="font-medium capitalize text-slate-800 group-hover:text-white">
                                {item.product_name}
                              </span>
                            </Link>
                          </li>
                        );
                      }
                    })}
                    {arrPro?.length > 5 ? (
                      <p onClick={naviSearch} className="cursor-pointer hover:text-blue-500">
                        Còn {arrPro.length - 5} sản phẩm nữa
                      </p>
                    ) : (
                      ''
                    )}
                  </ul>
                </div>
              ) : (
                <div>
                  <p>Không tìm thấy sản phẩm</p>
                  <hr />
                </div>
              )}

              {keyword?.length === 0 ? (
                <div className="mb-3 last:mb-0">
                  <div className="mb-2 px-2 text-xs font-semibold uppercase text-slate-400">
                    Dịch vụ yêu thích
                  </div>
                  <ul className="text-sm">
                    {services?.map((item, index) => {
                      if (index <= 4) {
                        return (
                          <li key={index}>
                            <Link
                              to={`/detail-services/${item._id}`}
                              className="group flex items-center rounded p-2 text-slate-800 hover:bg-indigo-500 hover:text-white"
                            >
                              <svg
                                className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                              </svg>
                              <span className="font-medium capitalize text-slate-800 group-hover:text-white">
                                {item.service_name}
                              </span>
                            </Link>
                          </li>
                        );
                      }
                    })}
                    {services?.length > 5 ? (
                      <p onClick={naviSearch} className="hover:text-blue-500">
                        Còn {services.length - 5} dịch vụ nữa
                      </p>
                    ) : (
                      ''
                    )}
                  </ul>
                </div>
              ) : arrSer.length > 0 ? (
                <div className="mb-3 last:mb-0">
                  <div className="mb-2 px-2 text-xs font-semibold uppercase text-slate-400">
                    Dịch vụ tìm kiếm
                  </div>
                  <ul className="text-sm">
                    {arrSer?.map((item, index) => {
                      if (index <= 4) {
                        return (
                          <li key={index}>
                            <Link
                              to={`/detail-services/${item._id}`}
                              className="group flex items-center rounded p-2 text-slate-800 hover:bg-indigo-500 hover:text-white"
                            >
                              <svg
                                className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z"></path>
                              </svg>
                              <span className="font-medium capitalize text-slate-800 group-hover:text-white">
                                {item.service_name}
                              </span>
                            </Link>
                          </li>
                        );
                      }
                    })}
                    {arrSer?.length > 5 ? (
                      <p onClick={naviSearch} className="hover:text-blue-500">
                        Còn {arrSer.length - 5} dịch vụ nữa
                      </p>
                    ) : (
                      ''
                    )}
                  </ul>
                </div>
              ) : (
                <p>Không tìm thấy dịch vụ</p>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default SearchClient;
