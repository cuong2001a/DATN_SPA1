import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import { Fragment } from 'react';
import NewsList from './listNewsItem/ListNews';
import BannerBlogs from './../../Components/Header/Banner/BannerBlogs';

const News = () => {
  return (
    <Fragment>
      <HeaderTop />
      <BannerBlogs />
      <div className=" py-5 font-nunito">
        <div className="container mx-auto lg:w-[1300px]">
          <div className="news__header my-5 text-center">
            <h1 className="news__header-title text-2xl font-bold lg:text-4xl">BLOG LÀM ĐẸP</h1>
            <span className="block font-semibold text-[#945050] my-3">ĐẸP HƠN MỖI NGÀY</span>
            <div className="text-center px-2">
              <span className="block">Bạn cảm thấy chăm sóc da là điều phức tạp? Bạn đang băn khoăn tìm kiếm một phương thức giữ dáng tập luyện hiệu quả?</span>
              <span className="block">Vậy hãy để Hills cùng chia sẻ với bạn nhé!</span>
            </div>
          </div>
          <div className="">
            <NewsList />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default News;
