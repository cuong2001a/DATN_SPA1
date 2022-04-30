import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { sortText } from 'Utils/Utils';
import moment from 'moment';

const Blogs = () => {
  const blogs = useSelector((state) => state.blog.current);

  return (
    <Fragment>
      <section className="container mx-auto px-5 pb-10 lg:w-[1300px] lg:px-0">
        <div className="space-y-3">
          <div className="text-center font-spa uppercase">
            <Link to="/new" className="block text-[38px] text-black lg:text-[60px]">
              Blog Sống+
            </Link>
            <span className="mx-auto block w-36 rounded-full border-b-2 border-[#df9896]"></span>
          </div>
        </div>
        <article className="container mx-auto flex snap-x space-x-10 overflow-x-scroll py-10 text-[14px] xl:overflow-hidden">
          {blogs &&
            blogs?.slice(0, 3)?.map((blog) => (
              <Link
                to={`/new-detail/${blog._id}`}
                className="group group h-[600px] w-[350px] flex-none snap-start drop-shadow-2xl lg:w-[375px]"
                key={blog._id}
              >
                <div className="overflow-hidden">
                  <img
                    className="h-[256px] w-full transform rounded-tl-[60px] object-cover duration-700 group-hover:scale-110 group-hover:rounded-tl-[0px]"
                    src={blog.album[0]}
                    alt=""
                  />
                </div>
                <div className="space-y-3 bg-white px-5 py-5">
                  <span className="block bg-opacity-80 font-home-customer text-[22px] font-bold capitalize text-black">
                    {blog.title}
                  </span>
                  <span className="block text-right text-[16px] font-light text-[#df9896]">
                    {' '}
                    {moment(blog?.times).format('DD/MM/YYYY')}
                  </span>
                  <span className="block text-[16px] font-light text-[#df9896]"> {blog.date}</span>
                  <p className="text-[16px]">{sortText(blog.description, 0, 120)}</p>
                </div>
                <button className="w-full rounded-br-[60px] bg-[#f472b6] py-5 font-nunito text-[18px] text-white group-hover:bg-[#00abe1]">
                  Xem thêm
                </button>
              </Link>
            ))}
        </article>
      </section>
    </Fragment>
  );
};

export default Blogs;
