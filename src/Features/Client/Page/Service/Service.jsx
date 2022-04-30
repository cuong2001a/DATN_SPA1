import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import NavBottom from '../../Components/Component/NavBottom/NavBottom';
import BannerService from '../../Components/Header/Banner/BannerService';
import HeaderTop from '../../Components/Header/HeaderTop';
import { useSelector } from 'react-redux';
import { sortText } from 'Utils/Utils';
import ReactPaginate from 'react-paginate';

const Index = () => {
  document.title = 'Dịch vụ';
  const services = useSelector((state) => state.service.current);

  //phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 6;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(services?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerService />
      </header>
      <main className="container mx-auto py-10 text-center font-nunito md:w-[1300px]">
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
                <Link to="/service" className="mr-2  font-medium text-gray-900">
                  Dịch vụ+
                </Link>
              </div>
            </li>
          </ol>
        </nav>
        <div className="relative">
          <img className="mx-auto" src="images/banner/service/icon-leaf-small.png" alt="" />
          <div className="item-center absolute inset-0 top-5 my-auto flex justify-center">
            <div>
              <span className="block text-[48px] font-bold">HILLSBEAUTY SPA</span>
              <span className="block font-semibold text-[#945050]">NÂNG NIU LÀN DA BẠN</span>
            </div>
          </div>
        </div>
        <span className="mx-auto block max-w-5xl px-5 text-center">
          Bạn đang tìm kiếm địa chỉ làm đẹp chất lượng?
          <br />
          Áp lực cuộc sống bộn bề khiến bạn căng thẳng mệt mỏi? Vậy bạn đường quên ghé Hillsbeauty
          Spa – nơi khách hàng gửi trọn niềm tin.
        </span>
        <div className="pb-10">
          <ol className="grid grid-cols-1 gap-10 px-5 pt-10 md:grid-cols-2 md:px-0 xl:grid-cols-3">
            {services &&
              services?.slice(pageVisited, pageVisited + newPerPage)?.map((service) => (
                <li
                  key={service.service_name}
                  className="h-[270px] w-full rounded shadow-xl"
                  style={{
                    backgroundImage: `url(${service.service_album[0]})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                >
                  <Link to={`/service-detail/${service._id}`} className="group relative capitalize">
                    <div className="group relative">
                      <img
                        className="h-[270px] w-full rounded-xl opacity-0 duration-700 group-hover:opacity-100"
                        src={service.service_album[1]}
                        alt=""
                      />
                      <div className="absolute inset-0 my-auto flex h-16 items-center justify-center  bg-white bg-opacity-70 text-black duration-700 group-hover:bg-[#e78fa1] group-hover:text-white">
                        <div className="spcae-x-5 flex items-center">
                          <h3 className="lg:text-[20px]">
                            {sortText(service.service_name, 0, 25)}
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
      </main>

      <NavBottom />
    </Fragment>
  );
};

export default Index;
