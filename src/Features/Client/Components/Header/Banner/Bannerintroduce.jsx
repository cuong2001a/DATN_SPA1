import React, { Fragment } from 'react';

const Bannerintroduce = () => {
  return (
    <Fragment>
      <div className="relative mb-[1190px] md:mb-[770px] lg:mb-[730px] xl:mb-[710px] ">
        <video
          className="z-0"
          loop="1"
          autoPlay="1"
          controls="hidden"
          src="images/banner/intro/hillsbeauty.mp4"
        ></video>
        <div className="absolute inset-x-0 -mt-14 bg-white py-10 md:-bottom-[730px]  md:-mt-0 lg:-bottom-[690px]">
          <div className="container mx-auto grid grid-cols-1 gap-x-10 pt-0 md:grid-cols-2 lg:w-[912px] lg:pt-10">
            <div className="grid grid-cols-2 gap-x-10">
              <div>
                <img
                  className="inline-block aspect-[600/926] h-auto w-full"
                  src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/img12.jpg"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="inline-block aspect-[600/926] h-auto w-full md:mt-10"
                  src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/Hover-1.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="space-y-3 px-5 lg:px-0">
              <h1 className="pt-3 text-center text-[30px] md:pt-0 md:text-left">
                Chào mừng bạn đến với Hillsbeauty
              </h1>
              <span className="block text-justify indent-8 text-[18px]">
                Hãy chăm sóc cơ thể của bạn, nơi duy nhất bạn phải sống! Đó là một ngôi đền sống.
                Hãy tôn trọng nó, chăm sóc nó và tận hưởng cuộc sống của bạn để phát huy hết khả
                năng của nó … Mona Spa chỉ giúp bạn làm điều đó!
              </span>
              <span className="block indent-8 text-[18px]">
                Hãy chăm sóc cơ thể của bạn, nơi duy nhất bạn phải sống! Đó là một ngôi đền sống.
                Hãy tôn trọng nó, chăm sóc nó và tận hưởng cuộc sống của bạn để phát huy hết khả
                năng của nó … Mona Spa chỉ giúp bạn làm điều đó!
              </span>
              <div className="flex items-center justify-center space-x-3 text-justify">
                <img
                  className="h-[50px] w-[50px] rounded-full object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg"
                  alt=""
                />
                <div className="flex flex-col">
                  <h3 className="text-xl font-bold text-[#333f38]">Elon Musk</h3>
                  <p className="text-sm">CEO of salon spa</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto mt-10 grid grid-cols-2 gap-5 md:w-[900px] md:grid-cols-4">
            <div className="text-center">
              <img
                width="70px"
                height="70px"
                className="mx-auto mb-5"
                src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/ic4.png"
                alt=""
              />
              <h3 className="text-3xl font-bold text-[#5f5842]">150+</h3>
              <p className="text-base uppercase text-[#ec8e5e]">Điều trị</p>
            </div>
            <div className="text-center">
              <img
                width="70px"
                height="70px"
                className="mx-auto mb-5"
                src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/ic18.png"
                alt=""
              />
              <h3 className="text-3xl font-bold text-[#5f5842]">2333+</h3>
              <p className="text-base uppercase text-[#ec8e5e]">Khách hàng vui vẻ</p>
            </div>
            <div className="text-center">
              <img
                width="70px"
                height="70px"
                className="mx-auto mb-5"
                src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/ic19.png"
                alt=""
              />
              <h3 className="text-3xl font-bold text-[#5f5842]">32+</h3>
              <p className="text-base uppercase text-[#ec8e5e]">Chi nhánh</p>
            </div>
            <div className="text-center">
              <img
                width="70px"
                height="70px"
                className="mx-auto mb-5"
                src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/ic20.png"
                alt=""
              />
              <h3 className="text-3xl font-bold text-[#5f5842]">100</h3>
              <p className="text-base uppercase text-[#ec8e5e]">Nhân viên</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Bannerintroduce;
