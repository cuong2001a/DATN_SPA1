import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';

const SearchBlog = ({ options }) => {
  return (
    <section className="blogs my-5">
      <h1 className="text-2xl font-medium text-black">Kết quả tìm kiếm trong bài viết</h1>
      <OwlCarousel className="owl-theme my-5" {...options}>
        <div className="item blog-small mx-auto mb-5 w-[300px] ">
          <Link to="" className="">
            <div className="mx-auto h-[300px] w-[300px] ">
              <img
                src="https://cdn.diemnhangroup.com/seoulspa/dsc00619-1.jpg"
                width="300px"
                height="300px"
                className="rounded-md"
                alt=""
              />
            </div>
            <div className="text-box mt-3">
              <p className="mb-1 text-xl  font-bold">Tiêu đề</p>
              <p className="mb-3 text-ellipsis text-[16px] line-clamp-2">
                Nội dung sdfsf sdfsdf sdfsdfsdfs sdfsdf s sdfsdf s dsf sdf sfsdfew qweqw qwe qưe
                dsfsdf dsfsdf sdfsdf
              </p>
            </div>
          </Link>
        </div>
        <div className="item blog-small mx-auto mb-5 w-[300px] ">
          <Link to="" className="">
            <div className="mx-auto h-[300px] w-[300px] ">
              <img
                src="https://cdn.diemnhangroup.com/seoulspa/dsc00619-1.jpg"
                width="300px"
                height="300px"
                className="rounded-md"
                alt=""
              />
            </div>
            <div className="text-box mt-3">
              <p className="mb-1 text-xl  font-bold">Tiêu đề</p>
              <p className="mb-3 text-ellipsis text-[16px] line-clamp-2">
                Nội dung sdfsf sdfsdf sdfsdfsdfs sdfsdf s sdfsdf s dsf sdf sfsdfew qweqw qwe qưe
                dsfsdf dsfsdf sdfsdf
              </p>
            </div>
          </Link>
        </div>
        <div className="item blog-small mx-auto mb-5 w-[300px] ">
          <Link to="" className="">
            <div className="mx-auto h-[300px] w-[300px] ">
              <img
                src="https://cdn.diemnhangroup.com/seoulspa/dsc00619-1.jpg"
                width="300px"
                height="300px"
                className="rounded-md"
                alt=""
              />
            </div>
            <div className="text-box mt-3">
              <p className="mb-1 text-xl  font-bold">Tiêu đề</p>
              <p className="mb-3 text-ellipsis text-[16px] line-clamp-2">
                Nội dung sdfsf sdfsdf sdfsdfsdfs sdfsdf s sdfsdf s dsf sdf sfsdfew qweqw qwe qưe
                dsfsdf dsfsdf sdfsdf
              </p>
            </div>
          </Link>
        </div>
        <div className="item blog-small mx-auto mb-5 w-[300px] ">
          <Link to="" className="">
            <div className="mx-auto h-[300px] w-[300px] ">
              <img
                src="https://cdn.diemnhangroup.com/seoulspa/dsc00619-1.jpg"
                width="300px"
                height="300px"
                className="rounded-md"
                alt=""
              />
            </div>
            <div className="text-box mt-3">
              <p className="mb-1 text-xl  font-bold">Tiêu đề</p>
              <p className="mb-3 text-ellipsis text-[16px] line-clamp-2">
                Nội dung sdfsf sdfsdf sdfsdfsdfs sdfsdf s sdfsdf s dsf sdf sfsdfew qweqw qwe qưe
                dsfsdf dsfsdf sdfsdf
              </p>
            </div>
          </Link>
        </div>
        <div className="item blog-small mx-auto mb-5 w-[300px] ">
          <Link to="" className="">
            <div className="mx-auto h-[300px] w-[300px] ">
              <img
                src="https://cdn.diemnhangroup.com/seoulspa/dsc00619-1.jpg"
                width="300px"
                height="300px"
                className="rounded-md"
                alt=""
              />
            </div>
            <div className="text-box mt-3">
              <p className="mb-1 text-xl  font-bold">Tiêu đề</p>
              <p className="mb-3 text-ellipsis text-[16px] line-clamp-2">
                Nội dung sdfsf sdfsdf sdfsdfsdfs sdfsdf s sdfsdf s dsf sdf sfsdfew qweqw qwe qưe
                dsfsdf dsfsdf sdfsdf
              </p>
            </div>
          </Link>
        </div>
        <div className="item blog-small mx-auto mb-5 w-[300px] ">
          <Link to="" className="">
            <div className="mx-auto h-[300px] w-[300px] ">
              <img
                src="https://cdn.diemnhangroup.com/seoulspa/dsc00619-1.jpg"
                width="300px"
                height="300px"
                className="rounded-md"
                alt=""
              />
            </div>
            <div className="text-box mt-3">
              <p className="mb-1 text-xl  font-bold">Tiêu đề</p>
              <p className="mb-3 text-ellipsis text-[16px] line-clamp-2">
                Nội dung sdfsf sdfsdf sdfsdfsdfs sdfsdf s sdfsdf s dsf sdf sfsdfew qweqw qwe qưe
                dsfsdf dsfsdf sdfsdf
              </p>
            </div>
          </Link>
        </div>
      </OwlCarousel>
    </section>
  );
};

export default SearchBlog;
