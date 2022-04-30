import BannerProduct from 'Features/Client/Components/Header/Banner/BannerProduct';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';
import { useSelector } from 'react-redux';
import { filterProduct, filterServices } from 'Utils/Utils';
import { useLocation } from 'react-router-dom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SearchProduct from './SearchProduct/SearchProduct';
import SearchService from './SearchService/SearchService';
import SearchBlog from './SearchBlog/SearchBlog';
import { useHistory } from 'react-router-dom';
const Search = () => {
  const [keyword, setKeyword] = useState(null);
  const location = useLocation();
  const parse = queryString.parse(location.search);
  const history = useHistory();

  const { current: Arrproduct } = useSelector((item) => item.product);
  const { current: Arrservice } = useSelector((item) => item.service);
  const [product, setProduct] = useState();
  const [blog, setBlog] = useState([]);
  const [service, setService] = useState();
  const { register, handleSubmit } = useForm();
  const onSubmit = (value) => {
    const { search } = value;
    history.push(`/search?keyword=${search}`);
  };
  const getDataByLocal = () => {
    if (keyword) {
      const itemService = filterServices(keyword.trim(), Arrservice);
      const itemProduct = filterProduct(keyword.trim(), Arrproduct);
      setProduct(itemProduct);
      setService(itemService);
    } else {
      const filterProduct = Arrproduct.filter((item) => item.product_star >= 4);
      setProduct(filterProduct);
      setService([]);
    }
  };

  useEffect(() => {
    setKeyword(parse.keyword);
  }, [location.search, keyword]);

  useEffect(() => {
    getDataByLocal();
  }, [location.search, keyword, Arrproduct, Arrservice]);
  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerProduct />
      </header>
      <div className="container mx-auto xl:w-[1300px]">
        <section className="mx-5 lg:mx-0">
          <div className="my-5 w-80 pt-5">
            <div className="rounded border-2 border-[#F9A291] bg-[#F9A291]">
              <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                  <input
                    {...register('search')}
                    type="search"
                    className="m-0 w-full flex-auto rounded-l-xl border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-[#F9A291] focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-[#F9A291]"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                  />
                  <button
                    className="btn flex items-start bg-[#F9A291] px-6 py-2.5 text-white shadow-md transition duration-150 ease-in-out hover:bg-[#fa9d8a] hover:shadow-lg focus:bg-[#fa9d8a] focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#fa846c] active:shadow-lg"
                    type="submit"
                    id="button-addon2"
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="search"
                      className="w-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="title my-5">
            <h3 className="text-2xl font-medium text-black">Kết quả cho tìm kiếm:</h3>
          </div>
          <hr />
        </section>
        <SearchProduct product={product} />
        <hr className="my-5 mx-5 lg:mx-0" />
        <SearchService service={service} />
      </div>
    </Fragment>
  );
};

export default Search;
