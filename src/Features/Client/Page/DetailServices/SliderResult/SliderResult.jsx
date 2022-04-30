import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const SliderResult = () => {
  const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    smartSpeed: 1000,
    responsive: {
      320: {
        items: 1
      }
    }
  };
  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold text-[#333f38]">
        Hình ảnh khách hàng sử dụng dịch vụ
      </h1>
      <OwlCarousel className="owl-theme " {...options}>
        <div className="item mx-auto w-1/2 text-center">
          <img
            className="aspect-[500/350] object-contain px-5 "
            src="https://1.bp.blogspot.com/-V2i7nTN-yIM/XUOsEcAp6NI/AAAAAAAACtI/Nwcc0rUA_8k-Ifbn3DJR4qBVY6IJqRNfACLcBGAs/s640/phau-thuat-tham-my-12.jpg"
            alt=""
          />
        </div>
        <div className="item mx-auto w-1/2 text-center">
          <img
            className="aspect-[500/350] object-contain px-5 "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbj37OUd4sCxkiEgcZY6f_25YCvJ7A3Ap00mxT2cMRh5pMGCOJcIMisip9wzwkEmLP5tY&usqp=CAU"
            alt=""
          />
        </div>
      </OwlCarousel>
    </div>
  );
};

export default SliderResult;
