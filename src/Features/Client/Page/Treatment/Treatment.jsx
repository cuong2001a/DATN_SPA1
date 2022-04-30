import NavBottom from 'Features/Client/Components/Component/NavBottom/NavBottom';
import BannerTreatment from 'Features/Client/Components/Header/Banner/BannerTreatment';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import React, { Fragment, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortText } from 'Utils/Utils';

const Treatment = () => {
  document.title = 'Liệu trình';
  const treatment = useSelector((state) => state.treatment.current);

  //phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 6;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(treatment?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerTreatment />
      </header>
      <main className="container mx-auto py-10 text-center font-nunito md:w-[1300px]">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
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
                <Link to="/treatment" className="mr-2  font-medium text-gray-900">
                  Liệu trình
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        <h2 className="text-[48px] font-bold">
          <Link to="/treatment">Liệu trình chăm sóc</Link>
        </h2>
        <p>Đánh thức vẻ đẹp tiềm ẩn - Áp dụng công nghệ tiên tiến</p>
        <div className="pb-10">
          <ol className="grid grid-cols-1 gap-10 px-5 pt-10 md:grid-cols-2 md:px-0 xl:grid-cols-3">
            {treatment &&
              treatment?.slice(pageVisited, pageVisited + newPerPage)?.map((value) => (
                <li
                  key={value?.treatment_id?.treatment_name}
                  className="h-[270px] w-full rounded shadow-xl"
                  style={{
                    backgroundImage: `url(${value?.treatment_id?.album[0]})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                >
                  <Link
                    to={`/treatment-detail/${value?.treatment_id._id}`}
                    className="group relative capitalize"
                  >
                    <div className="group relative">
                      <img
                        className="h-[270px] w-full rounded opacity-0 duration-700 group-hover:opacity-100"
                        src={value?.treatment_id?.album[1]}
                        alt=""
                      />
                      <div className="absolute inset-0 my-auto flex h-16 items-center justify-center  bg-white bg-opacity-70 text-black duration-700 group-hover:bg-[#e78fa1] group-hover:text-white">
                        <div className="spcae-x-5 flex items-center">
                          <h3 className="lg:text-[20px]">
                            {sortText(value?.treatment_id?.treatment_name, 0, 25)}
                          </h3>

                          <button className="translate-x-0 opacity-0 duration-150 group-hover:translate-x-2 group-hover:opacity-100">
                            <i className="fal fa-angle-double-right text-2xl"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ol>
        </div>

        <div className="flex justify-center pt-10">
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
      </main>

      <NavBottom />
    </Fragment>
  );
};

export default Treatment;
