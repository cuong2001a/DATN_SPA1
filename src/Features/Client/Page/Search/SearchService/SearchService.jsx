import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchService = ({ service }) => {
  const [hintService, setHintService] = useState(6);

  const addTotalService = () => {
    setHintService((prev) => prev + 6);
  };

  return (
    <section className="services my-5 mx-5 lg:mx-0">
      <h1 className="text-2xl font-medium text-black">Kết quả tìm kiếm dịch vụ</h1>
      <div className="grid grid-cols-12 gap-5">
        {service
          ? service?.slice(0, hintService)?.map((item) => {
              return (
                <div
                  key={item._id}
                  className="col-span-12 px-5 sm:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <Link to={`/detail-services/${item._id}`} className=" w-[300px]">
                    <div className="mx-auto aspect-[250/250] ">
                      <img
                        src={item.service_album[0]}
                        className="h-full w-full rounded-md"
                        alt=""
                      />
                    </div>

                    <div className="text-box mx-[14px] mt-5">
                      <p className="mb-1 text-xl  font-bold">{item.service_name}</p>
                      <p className="mb-3 text-ellipsis text-[16px] line-clamp-2">
                        {item.service_description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })
          : ''}
        <div className="col-span-12 mx-auto">
          {service?.length > 0 ? (
            <button
              className="mr-6 rounded-full bg-blue-500 px-2 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-blue-600"
              onClick={addTotalService}
            >
              Xem thêm{' '}
            </button>
          ) : (
            <p className="text-xl font-bold text-blue-500">Không tìm thấy dịch vụ</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchService;
