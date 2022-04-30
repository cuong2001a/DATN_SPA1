import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Tag = () => {
  const service = useSelector((item) => item.service.current);
  console.log('service :', service);
  return (
    <div className="tag  mx-3 mt-5 w-full">
      <h3 className="tag__title mb-5 text-xl font-bold text-[#333f38] ">Dịch vụ </h3>
      <div className="flex flex-wrap">
        {service?.slice(0, 4)?.map((item) => {
          return (
            <Link
              key={item?._id}
              to={`/service-detail/${item._id}`}
              className="mr-2 mb-2  rounded-full bg-[#ec8e5e]  px-4 py-2 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-[#d47f54] hover:text-[#333f38]"
            >
              {item?.service_name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tag;
