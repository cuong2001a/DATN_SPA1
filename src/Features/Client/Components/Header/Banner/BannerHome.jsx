import { Fragment } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const BannerHome = () => {
  return (
    <Fragment>
      <div className="relative z-40">
        <OwlCarousel className="owl-theme" items="1" loop dots={false} autoplayTimeout={3000}>
          <img
            className="z-40 h-[250px] w-full bg-center object-cover object-center md:h-full"
            src="images/banner/home/banner1.jpg"
            alt="Couple on a bed with a dog"
          />
          <img
            className="z-40 h-[250px] w-full bg-center object-cover object-center md:h-full"
            src="images/banner/home/Banner2.png"
            alt="Couple on a bed with a dog"
          />
          {/* <img
            className="z-40 h-[250px] md:h-full w-full object-cover object-center bg-center"
            src="images/banner/home/Banner3.png"
            alt="Couple on a bed with a dog"
          /> */}
        </OwlCarousel>
      </div>
    </Fragment>
  );
};

export default BannerHome;
