import React, { Fragment } from 'react';
import ListCategory from './ListCategory/ListCategory';
import DetailPost from './DetailPost/DetailPost';
import Tag from './Tag/Tag';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import BannerBlogs from 'Features/Client/Components/Header/Banner/BannerBlogs';

const DetailNews = () => {
  return (
    <Fragment>
      <HeaderTop />
      <BannerBlogs />
      <div className="DetailNews my-5 ">
        <div className="container mx-auto lg:w-[913px]">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <DetailPost />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <ListCategory />
              <Tag />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailNews;
