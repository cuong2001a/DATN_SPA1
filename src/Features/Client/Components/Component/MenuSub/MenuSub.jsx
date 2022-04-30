import { useState } from 'react';
import { Fragment } from 'react';
import FormOrderPhone from '../FormOder/FormOrderPhone';

const MenuSub = () => {
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Fragment>
      <section className=" invisible fixed inset-y-0 right-0 z-40 flex items-center font-nunito transition duration-700 ease-in-out xl:visible">
        <div className="space-y-[1px]">
          <button className=" flex w-[50px] items-center justify-center rounded-tl-3xl bg-[#e78fa1] p-2  pt-3 text-[18px] text-white">
            <i className="fab fa-facebook-f duration-700 hover:-translate-y-1"></i>
          </button>
          <div className="group">
            <button className="-mr-28 flex w-[150px] items-center justify-start bg-[#e78fa1] py-2 pr-2 pl-4 text-left text-[18px] text-white duration-1000 group-hover:-translate-x-20">
              <div className="flex items-center space-x-2">
                <i className="far fa-phone-alt font-bold"></i>
                <span className="text-[16px] opacity-0 duration-500 group-hover:opacity-100">
                  1900 6947
                </span>
              </div>
            </button>
          </div>
          <div className="group" onClick={openModal}>
            <button className="-mr-28 flex w-[150px] items-center justify-start bg-[#e78fa1] py-2 pr-2 pl-4 text-left text-[18px] text-white duration-1000 group-hover:-translate-x-20">
              <div className="flex items-center space-x-2">
                <i className="far fa-calendar-alt animate-bounce py-2 font-bold"></i>
                <span className="text-[16px] opacity-0 duration-500 group-hover:opacity-100">
                  Đặt lịch
                </span>
              </div>
            </button>
          </div>
          <button className="flex w-[50px] items-center justify-center rounded-bl-3xl bg-[#e78fa1] p-2 pb-3 text-[18px] text-white">
            <i className="fab fa-instagram duration-700 hover:-translate-y-1"></i>
          </button>
        </div>
      </section>
      <FormOrderPhone isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal} />
    </Fragment>
  );
};

export default MenuSub;
