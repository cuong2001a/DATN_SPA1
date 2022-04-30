import React from 'react';
import { useSelector } from 'react-redux';
import CreateServices from './CreateService';
import ListServices from './ListServices';
import { Fragment, useState } from 'react';

const Services = () => {
  const services = useSelector((state) => state.service.current);
  const categories = useSelector((state) => state.category.current);
  const [isLoading, setIsLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-900">Quản lý dịch vụ</h3>
          <button
            onClick={openModal}
            className="mt-2 rounded border-blue-300 bg-blue-500 p-2 pl-5 pr-5 text-base text-gray-100 focus:border-2"
          >
            Thêm mới
          </button>
        </div>

        <CreateServices
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeModal={closeModal}
          services={services}
          categories={categories}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        <ListServices
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          services={services}
          categories={categories}
        />
      </div>
    </Fragment>
  );
};

export default Services;
