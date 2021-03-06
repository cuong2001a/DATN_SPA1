import React, { Fragment } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Customer = () => {
  const state = {
    responsive: {
      0: {
        items: 4
      },
      450: {
        items: 4
      },
      600: {
        items: 3
      },
      1000: {
        items: 3
      },
      1200: {
        autoplay: false,
        items: 4
      }
    }
  };
  return (
    <Fragment>
      <section
        className="mt-20"
        style={{
          backgroundImage: "url('images/backgrounds/customer-home.jpg')",
          backgroundPosition: 'center',
          backgroundSize: '100% 100% ',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto py-20">
          <div className="space-y-3">
            <svg
              className="mx-auto h-20 w-20 stroke-[#df9896] stroke-[15px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 400.898 400.898"
              fill="none"
            >
              <g>
                <path
                  d="M290.573,191.222c17.106,0.501,34.92,0.59,57.472-14.803c23.827-16.263,34.455-49.417,34.404-61.635
		c-47.241,48.824-93.443-21.063-144.93,3.004c8.988-14.566,17.975-29.949,15.92-57.178C251.261,31.843,227.864,6.061,217.261,0
		c18.661,65.32-64.964,70.394-69.864,127.016c-8.121-15.066-16.953-30.541-41.561-42.375c-25.998-12.502-60.022-5.128-70.575,1.025
		c65.901,16.497,28.478,91.456,75.063,124.012c-17.105-0.502-34.919-0.59-57.471,14.803c-23.826,16.265-34.454,49.418-34.403,61.636
		c47.24-48.821,93.441,21.062,144.928-3.001c-8.988,14.564-17.973,29.947-15.918,57.174c2.171,28.768,25.576,54.549,36.178,60.609
		c-18.66-65.32,64.968-70.393,69.865-127.014c8.121,15.065,16.951,30.541,41.555,42.373c26.004,12.504,60.028,5.129,70.58-1.024
		C299.736,298.735,337.16,223.777,290.573,191.222z"
                />
              </g>
            </svg>
            <div className="text-center font-spa uppercase">
              <span className="block text-[38px] text-[#df9896] lg:text-[60px]">
                Kh??ch h??ng c???a
              </span>
              <span className="ml-5 block text-[38px] lg:text-[60px]">Ch??ng t??i</span>
              <span className="mx-auto block w-36 rounded-full border-b-2 border-[#df9896]"></span>
            </div>
            <p className="mx-auto w-[400px] px-5 text-center font-plex-sans text-[16px] normal-case md:w-[600px]">
              V???i s??? m???nh ???????nh th???c v??? ?????p ti???m ???n c???a b???n???, Ch??ng t??i h?????ng ?????n d???ch v??? l??m ?????p
              nh??? nh??ng hi???u qu??? v???i m???c gi?? ph?? h???p cho m???i ng?????i. Nh???n ???????c ni???m tin c???a kh??ch
              h??ng, l?? th??nh t???u l???n nh???t v???i ch??ng t??i
            </p>
          </div>
          <div className="container mx-auto my-10 w-[1300px] px-5 md:px-0">
            <OwlCarousel
              className="owl-theme"
              items="4"
              loop
              margin={15}
              autoplay={true}
              dots={false}
              autoplayTimeout={3000}
              {...state}
            >
              <div className="item h-[495px]">
                <img className="" src="images/page-home/1.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    T??? h???i ??i spa ?????u ?????u, m???i l???n ?????ng tr?????c ???ng k??nh m??nh ch??? ph???i m???t time o??nh
                    ph???n, m?? r??? c?? 100k thui c??? nh?? ??????
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">
                    M???u ???nh Ki???u Trang
                  </span>
                </div>
              </div>
              <div className="item h-[495px]">
                <img className="" src="images/page-home/2.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    B?? quy???t ?????p m?? kh??ng c???n make up, c??? h??ng tu???n qua spa n??y l??m g??i ??? Tr???ng l??
                    da s??ng, c??ng, m???n r???i???
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">
                    Hot FB Ly Ho??ng Nguy???n
                  </span>
                </div>
              </div>
              <div className="item h-[495px]">
                <img className="" src="images/page-home/3.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    H?? l???i m??a thu v???a kh?? v???a b???i, l??m th??? g??i C???p n?????c th???i ch?? xong ??ng d?? man,
                    da m?????t m?? ????? bao nhi??u ?????c t??? tr??n da
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">
                    Hot Mum Loan Ho??ng
                  </span>
                </div>
              </div>
              <div className="item h-[495px]">
                <img className="" src="images/page-home/4.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    B??? ?????a em d??? ??i spa n??y xong nghi???n lu??n r???i, c?? bao nhi??u m???n ?????u ??en bay s???ch,
                    m??i ???ng h??? , iu iu ^^
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">DJ T??t</span>
                </div>
              </div>
              <div className="item h-[495px]">
                <img className="" src="images/page-home/5.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    L??m ??? Tr???ng ??i???n Di xong th???y da s??ng h???n l??n, c??ng m???nh, ??ng d??? s???. S?????ng qu??
                    c??n ng??? qu??n lu??n :))
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">
                    Hot Mum Huy???n B??
                  </span>
                </div>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Customer;
