import React, { Fragment } from 'react';

const BannerProduct = () => {
  return (
    <Fragment>
      <img
        className="z-40 h-[250px] w-full bg-cover bg-center md:h-[350px] lg:h-[450px] xl:h-[70%]"
        src="images/banner/product/Banner.png"
        alt=""
      />
    </Fragment>
  );
};

export default BannerProduct;
