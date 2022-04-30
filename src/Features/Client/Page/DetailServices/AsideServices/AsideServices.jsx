import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ListCategory from '../../DetailNews/ListCategory/ListCategory';
import { sortText } from './../../../../../Utils/Utils';

const AsideServices = () => {
  const blogs = useSelector((state) => state.blog.current);

  return (
    <div>
      <div className="hidden lg:block"></div>

      <ListCategory />
      <div className="mx-3 mt-5">
        <h3 className="text-2xl font-bold text-[#dc3f5d]">Bài viết cùng chủ đề</h3>
        <ol>
          {blogs &&
            blogs?.slice(0, 5)?.map((blog) => (
              <Link
                to={`/new-detail/${blog._id}`}
                className="group grid grid-cols-4 gap-3 py-3 font-light"
                key={blog._id}
              >
                <div className="col-span-1 overflow-hidden">
                  <img
                    className="h-full w-full duration-700 group-hover:scale-110"
                    src={blog.album[0]}
                    alt=""
                  />
                </div>
                <div className="col-span-3">
                  <span className="block">{sortText(blog.title, 0, 25)}</span>
                  <span className="block text-[15px]">{sortText(blog.description, 0, 60)}</span>
                </div>
              </Link>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default AsideServices;
