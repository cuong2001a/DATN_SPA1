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
                Khách hàng của
              </span>
              <span className="ml-5 block text-[38px] lg:text-[60px]">Chúng tôi</span>
              <span className="mx-auto block w-36 rounded-full border-b-2 border-[#df9896]"></span>
            </div>
            <p className="mx-auto w-[400px] px-5 text-center font-plex-sans text-[16px] normal-case md:w-[600px]">
              Với sứ mệnh “đánh thức vẻ đẹp tiềm ẩn của bạn”, Chúng tôi hướng đến dịch vụ làm đẹp
              nhẹ nhàng hiệu quả với mức giá phù hợp cho mọi người. Nhận được niềm tin của khách
              hàng, là thành tựu lớn nhất với chúng tôi
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
                    Từ hồi đi spa đều đều, mỗi lần đứng trước ống kính mình chả phải mất time oánh
                    phấn, mà rẻ có 100k thui cả nhà ạ…
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">
                    Mẫu Ảnh Kiều Trang
                  </span>
                </div>
              </div>
              <div className="item h-[495px]">
                <img className="" src="images/page-home/2.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    Bí quyết đẹp mà không cần make up, cứ hàng tuần qua spa này làm gói Ủ Trắng là
                    da sáng, căng, mịn rồi…
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">
                    Hot FB Ly Hoàng Nguyễn
                  </span>
                </div>
              </div>
              <div className="item h-[495px]">
                <img className="" src="images/page-home/3.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    Hà lội mùa thu vừa khô vừa bụi, làm thử gói Cấp nước thải chì xong ưng dã man,
                    da mướt mà đỡ bao nhiêu độc tố trên da
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">
                    Hot Mum Loan Hoàng
                  </span>
                </div>
              </div>
              <div className="item h-[495px]">
                <img className="" src="images/page-home/4.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    Bị đứa em dụ đi spa này xong nghiện luôn rồi, có bao nhiêu mụn đầu đen bay sạch,
                    mãi ủng hộ , iu iu ^^
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">DJ Tít</span>
                </div>
              </div>
              <div className="item h-[495px]">
                <img className="" src="images/page-home/5.jpg" alt="" />
                <div className="space-y-3 bg-[#343740] p-5 font-plex-sans text-[14px] text-white">
                  <p>
                    Làm Ủ Trắng Điện Di xong thấy da sáng hẳn lên, căng mịnh, ưng dễ sợ. Sướng quá
                    còn ngủ quên luôn :))
                  </p>
                  <span className="block w-16 rounded-full border-b-2 border-[#df9896]"></span>
                  <span className="block font-home-customer text-[20px] capitalize">
                    Hot Mum Huyền Bé
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
