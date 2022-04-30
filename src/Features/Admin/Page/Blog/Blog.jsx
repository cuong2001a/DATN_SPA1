import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from 'Utils/Loading/Loading';
import FormBlog from './FormBlog';
import ListBlog from './ListBlog';

const Blog = () => {
  const { loading: isLoading, current: blog } = useSelector((state) => state.blog);
  const [detailItem, setDetailItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);

    setIsEdit(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (isOpen === false) {
      setDetailItem(null);
    }
  }, [isOpen]);
  return (
    <div>
      <Fragment>
        <div className="flex flex-col gap-5 ">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h3>
            <button
              onClick={openModal}
              className="mt-2 rounded border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-base text-gray-100 focus:border-2"
            >
              Thêm mới
            </button>
          </div>

          <FormBlog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            closeModal={closeModal}
            blog={blog}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            detailItem={detailItem}
          />

          <ListBlog
            blog={blog}
            setDetailItem={setDetailItem}
            setIsOpen={setIsOpen}
            setIsEdit={setIsEdit}
          />
        </div>
        {isLoading && <Loading />}
      </Fragment>
    </div>
  );
};

export default Blog;
