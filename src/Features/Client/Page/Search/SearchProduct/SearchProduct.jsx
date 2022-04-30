import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { changeDisplayPrices } from 'Utils/Utils';

const SearchProduct = ({ options, product }) => {
  const [hintProduct, setHintProduct] = useState(6);

  const addTotalProduct = () => {
    setHintProduct((prev) => prev + 6);
  };
  return (
    <section className="products my-5 mx-5 lg:mx-0">
      <h1 className="text-2xl font-medium text-black">
        Đã tìm thấy <span className="text-red-600">{product?.length}</span> sản phẩm
      </h1>
      <div className="grid grid-cols-12 gap-5">
        {product
          ? product?.slice(0, hintProduct)?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="col-span-12 px-5 sm:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <Link to={`/product-detail/${item._id}`} className="">
                    <div className="mx-auto aspect-[250/250] ">
                      <img
                        src={item.product_album[0]}
                        className="h-full w-full rounded-md"
                        alt=""
                      />
                    </div>
                  </Link>

                  <div className="text-box mt-3 text-right sm:text-left">
                    <p className="mb-1 text-base capitalize text-[#000]">
                      <Link to={`/category/${item.category_id._id}`}>
                        {' '}
                        Danh mục / {item.category_id.category_name}
                      </Link>
                    </p>
                    <p className="mb-1 text-base  font-bold">{item.product_name}</p>
                    <p className="mb-3 text-[18px] font-semibold text-red-500">
                      {changeDisplayPrices(item.product_price)}
                    </p>
                    <Link to="" className="bg- rounded-full bg-[#dc3f5d] px-5 py-1 text-white">
                      {' '}
                      Mua ngay
                    </Link>
                  </div>
                </div>
              );
            })
          : ''}
        <div className="col-span-12 mx-auto">
          {product?.length > 0 ? (
            <button
              className="mr-6 rounded-full bg-blue-500 px-2 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-blue-600"
              onClick={addTotalProduct}
            >
              Xem thêm{' '}
            </button>
          ) : (
            <p className="text-xl font-bold text-blue-500">Không tìm thấy sản phẩm</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchProduct;
