import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';

const ListCategory = () => {
  const category = useSelector((item) => item.category.current);
  return (
    <div className="mx-3">
      <h3 className="text-2xl font-bold text-[#dc3f5d]">Danh mục sản phẩm</h3>
      <ul className="nav-list">
        {category?.slice(0, 5)?.map((item) => {
          return (
            <li key={item?._id} className="nav-item mt-4 h-9 border-b">
              <Link
                to={`/filter?listCategory=${item?._id}`}
                className="nav-link pl-3 decoration-0 hover:text-[#ec8e5e]"
              >
                {item?.category_name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListCategory;
