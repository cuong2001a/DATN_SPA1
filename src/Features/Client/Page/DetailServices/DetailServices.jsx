import React, { Fragment, useEffect, useState } from 'react';

import ContentService from './ContentServices/ContentService';
import AsideServices from './AsideServices/AsideServices';
import SliderResult from './SliderResult/SliderResult';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import FormOrderPhone from 'Features/Client/Components/Component/FormOder/FormOrderPhone';
import BannerFormOrder from 'Features/Client/Components/Header/Banner/BannerFormOrder';
import { Link } from 'react-router-dom';
const DetailServices = () => {
  const params = useParams();
  const [detailService, setDetailService] = useState(null);
  const service = useSelector((item) => item.service.current);
  const { id } = params;
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const getDetailData = () => {
      const detail = service.filter((item) => item._id === id);
      setDetailService(detail);
    };
    getDetailData();
  }, [id, service]);

  return (
    <Fragment>
      <HeaderTop />
      <BannerFormOrder />
      <div className="detailService my-5 font-nunito">
        <nav className="pb-5">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <li>
              <div className="flex items-center">
                <Link to="/" className="mr-2  font-medium text-gray-900">
                  Trang chủ
                </Link>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li>
              <div className="flex items-center">
                <Link to="/service" className="mr-2  font-medium text-gray-900">
                  Dịch vụ+
                </Link>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="">
              <Link
                to=""
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {service && service.service_name}
              </Link>
            </li>
          </ol>
        </nav>
        <div className="container mx-auto lg:w-[1300px]">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 mx-5 lg:col-span-8 lg:mx-0">
              <ContentService detailService={detailService} openModal={openModal} />
            </div>
            <div className="col-span-12 mx-5 lg:col-span-4 lg:mx-0">
              <AsideServices />
            </div>
            <div className="col-span-12 my-5 text-center">
              <SliderResult />
            </div>
          </div>
        </div>
      </div>
      <FormOrderPhone isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} id={id} />
    </Fragment>
  );
};

export default DetailServices;
