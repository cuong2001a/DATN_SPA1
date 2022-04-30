import React, { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { sortText } from 'Utils/Utils';
import moment from 'moment';
import ReactPaginate from 'react-paginate';

const ListNews = () => {
  document.title = 'Tin tức'
  const blogs = useSelector((state) => state.blog.current);
  //phân trang
  const [pageNumber, setPageNumber] = useState(0);
  const newPerPage = 6;
  const pageVisited = pageNumber * newPerPage;
  const countPage = Math.ceil(blogs?.length / newPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Fragment>
      <main className="container mx-auto font-nunito">
        <div className="pt-10">
          <div className="grid grid-cols-1 gap-x-10 md:gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {blogs &&
              blogs?.slice(pageVisited, pageVisited + newPerPage)?.map((blog, index) => (
                <div key={index}>
                  <div className="group h-[510px] px-5 md:px-0">
                    <Link key={blog._id} to={`/new-detail/${blog._id}`}>
                      <div className="overflow-hidden">
                        <img
                          className="h-[220px] w-[455px] transform bg-cover object-center duration-700 group-hover:scale-110 md:w-[405px] lg:h-[255px]"
                          src={blog.album[0]}
                          alt=""
                        />
                      </div>
                    </Link>
                    <div className="p-3">
                      <span className="block bg-opacity-80 text-[22px] font-bold capitalize text-black">
                        {blog.title}
                      </span>
                      <span className="block text-right text-[16px] font-light text-[#df9896]">
                        {' '}
                        {moment(blog?.times).format('DD/MM/YYYY')}
                      </span>
                      <span className="block text-[16px]">{sortText(blog.description, 0, 171)}</span>
                    </div>
                    <div className="group flex items-center justify-end space-x-1 px-3 text-right ">
                      <Link
                        key={blog._id}
                        to={`/new-detail/${blog._id}`}
                        className="translate-x-0 text-[16px] duration-500 group-hover:translate-x-2 group-hover:underline"
                      >
                        Xem thêm
                      </Link>
                      <i className="fal fa-angle-double-right translate-x-0 opacity-0 duration-500 group-hover:translate-x-2 group-hover:opacity-100"></i>
                    </div>
                  </div>
                </div>
              ))}
          </div>
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
    </Fragment>
  );
};

export default ListNews;
