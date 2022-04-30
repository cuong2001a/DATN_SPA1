import React, { Fragment } from 'react';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGO } from 'Constants';

const Footer = () => {
  const [contact, ShowContact] = useState(false);
  const [info, ShowInfo] = useState(false);
  const [link, ShowLink] = useState(false);
  const [service, ShowService] = useState(false);
  return (
    <Fragment>
      <footer className="">
        <section className="container isolate z-30 mx-auto grid w-[450px] grid-cols-1 space-y-2 rounded-lg bg-[#f9a291] p-5 sm:w-[650px] md:grid-cols-2 md:p-10 lg:w-[1300px] lg:space-y-0">
          <article className="text-white">
            <span className="block font-nunito text-[15px] font-bold lg:text-[25px]">
              Đăng ký nhận email của HILLSBEAUTY SPA
            </span>
            <span className="block text-[12px] lg:text-[16px]">
              Hãy là người đầu tiên biết nhận những thông tin ưu đãi, sản phẩm dịch vụ mới nhất
              tuyệt vời nhất của chúng tôi.
            </span>
          </article>
          <form className="relative flex items-center justify-end text-[12px] lg:text-[18px]">
            <input
              className="w-full rounded-full border-none py-2 placeholder:text-[12px] focus:ring-white lg:w-2/3"
              type="email"
              placeholder="Email ..."
            />
            <button className="absolute right-0 mr-0.5  rounded-full border border-[#002633] bg-[#002633] py-1 px-8 text-white hover:bg-white hover:text-[#002633]">
              Đăng ký
            </button>
          </form>
        </section>
        <section className="z-0 -mt-20 bg-[#002633] pt-36 font-nunito text-white">
          <div className="container mx-auto grid grid-cols-1 gap-x-20 space-y-3 px-5 pb-2 md:w-[1300px] lg:grid-cols-4 lg:px-0">
            <article className="space-y-2">
              <div className="mr-10 flex items-center justify-between lg:hidden">
                <div>
                  <span className="block text-[20px] font-semibold lg:hidden lg:text-[30px]">
                    Liên lạc
                  </span>
                  <span className="block w-12 rounded-full border-b-2 border-[#df9896]"></span>
                </div>
                <button className="cursor-pointer text-2xl" onClick={() => ShowContact(!contact)}>
                  {contact ? '-' : '+'}
                </button>
              </div>
              {contact && (
                <div className="space-y-3 py-4 text-left md:py-0">
                  <img className="" src={LOGO} alt="logo" />
                  <div className="grid grid-cols-9">
                    <div className="col-span-1">
                      <i className="far fa-map-marker-alt font-bold"></i>
                    </div>
                    <div className="col-span-8">
                      84 Huỳnh Phúc Kháng, P.Thanh Xuân, Q.Thanh Xuân, Hà Nội
                    </div>
                  </div>
                  <div className="grid grid-cols-9">
                    <div className="col-span-1">
                      <i className="far fa-mail-bulk font-bold"></i>
                    </div>
                    <div className="col-span-8">contact@company.com</div>
                  </div>
                  <div className="grid grid-cols-9">
                    <div className="col-span-1">
                      <i className="far fa-phone-alt font-bold"></i>
                    </div>
                    <div className="col-span-8">+001 2233 456</div>
                  </div>
                  <ul className="grid grid-cols-9 gap-x-11">
                    <li className="group">
                      <Link
                        to=""
                        className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#3c5a98]"
                      >
                        <i className="fab fa-facebook-f group-hover:text-white"></i>
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        to=""
                        className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#33ccff]"
                      >
                        <i className="fab fa-twitter group-hover:text-white"></i>
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        to=""
                        className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#f9a291]"
                      >
                        <i className="fab fa-instagram group-hover:text-white"></i>
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        to=""
                        className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#cb2124]"
                      >
                        <i className="fab fa-pinterest-p group-hover:text-white"></i>
                      </Link>
                    </li>
                    <li className="group">
                      <Link
                        to=""
                        className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#be2f29]"
                      >
                        <i className="fab fa-youtube group-hover:text-white"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              <div className="hidden space-y-3 py-4 text-left md:py-0 lg:block">
                <img className="" src={LOGO} alt="logo" />
                <div className="grid grid-cols-9">
                  <div className="col-span-1">
                    <i className="far fa-map-marker-alt font-bold"></i>
                  </div>
                  <div className="col-span-8">
                    84 Huỳnh Phúc Kháng, P.Thanh Xuân, Q.Thanh Xuân, Hà Nội
                  </div>
                </div>
                <div className="grid grid-cols-9">
                  <div className="col-span-1">
                    <i className="far fa-mail-bulk font-bold"></i>
                  </div>
                  <div className="col-span-8">contact@company.com</div>
                </div>
                <div className="grid grid-cols-9">
                  <div className="col-span-1">
                    <i className="far fa-phone-alt font-bold"></i>
                  </div>
                  <div className="col-span-8">+001 2233 456</div>
                </div>
                <ul className="grid grid-cols-9 gap-x-11">
                  <li className="group">
                    <Link
                      to=""
                      className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#3c5a98]"
                    >
                      <i className="fab fa-facebook-f group-hover:text-white"></i>
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      to=""
                      className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#33ccff]"
                    >
                      <i className="fab fa-twitter group-hover:text-white"></i>
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      to=""
                      className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#f9a291]"
                    >
                      <i className="fab fa-instagram group-hover:text-white"></i>
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      to=""
                      className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#cb2124]"
                    >
                      <i className="fab fa-pinterest-p group-hover:text-white"></i>
                    </Link>
                  </li>
                  <li className="group">
                    <Link
                      to=""
                      className="flex h-9 w-9 items-center justify-center rounded-full border duration-700 group-hover:-translate-y-2 group-hover:bg-[#be2f29]"
                    >
                      <i className="fab fa-youtube group-hover:text-white"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </article>
            <article className="space-y-2">
              <div className="mr-10 flex items-center justify-between">
                <div>
                  <span className="text-[20px] font-semibold lg:text-[30px]">Thông tin</span>
                  <span className="block w-12 rounded-full border-b-2 border-[#df9896]"></span>
                </div>
                <button
                  className="block cursor-pointer text-2xl lg:hidden"
                  onClick={() => ShowInfo(!info)}
                >
                  {info ? '-' : '+'}
                </button>
              </div>
              {info && (
                <ul className="space-y-3">
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/about">Về chúng tôi</Link>
                  </li>
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/contact">Liên hệ chúng tôi</Link>
                  </li>
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/dieu-khoan-dieu-kien">Điều khoản và điều kiện</Link>
                  </li>
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/tra-hang-thanh-toan">Trả hàng & thanh toán</Link>
                  </li>
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/van-chuy-giao-hang">Vận chuyển & Giao hàng</Link>
                  </li>
                </ul>
              )}
              <ul className="hidden space-y-3 lg:block">
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/about">Về chúng tôi</Link>
                </li>
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/contact">Liên hệ chúng tôi</Link>
                </li>
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/dieu-khoan-dieu-kien">Điều khoản và điều kiện</Link>
                </li>
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/tra-hang-thanh-toan">Trả hàng & thanh toán</Link>
                </li>
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/van-chuy-giao-hang">Vận chuyển & Giao hàng</Link>
                </li>
              </ul>
            </article>
            <article className="space-y-2">
              <div className="mr-10 flex items-center justify-between">
                <div>
                  <span className="text-[20px] font-semibold lg:text-[30px]">Liên kết hữu ích</span>
                  <span className="block w-12 rounded-full border-b-2 border-[#df9896]"></span>
                </div>
                <button
                  className="block cursor-pointer text-2xl lg:hidden"
                  onClick={() => ShowLink(!link)}
                >
                  {link ? '-' : '+'}
                </button>
              </div>
              {link && (
                <ul className="space-y-3">
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/contact">Vị trí spa</Link>
                  </li>
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/new">Tin mới nhất</Link>
                  </li>
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/service">Dịch vụ</Link>
                  </li>
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/filter">Sản phẩm độc quyền</Link>
                  </li>
                  <li className="duration-500 hover:-translate-y-2 hover:underline">
                    <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
                  </li>
                </ul>
              )}
              <ul className="hidden space-y-3 lg:block">
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/contact">Vị trí spa</Link>
                </li>
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/new">Tin mới nhất</Link>
                </li>
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/service">Dịch vụ</Link>
                </li>
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/filter">Sản phẩm độc quyền</Link>
                </li>
                <li className="duration-500 hover:-translate-y-2 hover:underline">
                  <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
                </li>
              </ul>
            </article>
            <article className="space-y-2">
              <div className="mr-10 flex items-center justify-between">
                <div>
                  <span className="text-[20px] font-semibold lg:text-[30px]">Dịch vụ</span>
                  <span className="block w-12 rounded-full border-b-2 border-[#df9896]"></span>
                </div>
                <button
                  className="cursor-pointer text-2xl lg:hidden"
                  onClick={() => ShowService(!service)}
                >
                  {service ? '-' : '+'}
                </button>
              </div>
              {service && (
                <Link to="/services" className="space-y-3">
                  <ol className="grid grid-cols-3 gap-1">
                    <li className="group relative">
                      <img
                        className="h-full w-full cursor-pointer rounded-lg object-center"
                        src="https://5.imimg.com/data5/DI/UY/MY-59447058/creative-haircut-loreal-hair-spa-28-mid-lenght-29-hair-wash-post-hair-spa-blast-dry-eyebrows-500x500.jpg"
                        alt=""
                      />
                    </li>
                    <li className="group relative">
                      <img
                        className="h-full w-full cursor-pointer rounded-lg object-center"
                        src="https://image.thanhnien.vn/w1024/Uploaded/2022/puqgfdmzs.co/2021_01_20/maihan/mai-han-spa-4_rzcg.jpg"
                        alt=""
                      />
                    </li>
                    <li className="group relative">
                      <img
                        className="h-full w-full cursor-pointer rounded-lg object-center"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy47-AE5po2IPszYU-Q2W67PXTCHK5R8gQF3RItwhoCZOrEwrk-7Qz_A9Jubb6gmw0vwY&usqp=CAU"
                        alt=""
                      />
                    </li>
                    <li className="group relative">
                      <img
                        className="h-full w-full cursor-pointer rounded-lg object-center"
                        src="https://vietyouth.vn/wp-content/uploads/2020/07/sai-gon-xinh-spa-1.jpeg"
                        alt=""
                      />
                    </li>
                    <li className="group relative">
                      <img
                        className="h-full w-full cursor-pointer rounded-lg object-center"
                        src="https://vietreview.vn/wp-content/uploads/2020/09/Taza-Spa.jpg"
                        alt=""
                      />
                    </li>
                    <li className="group relative">
                      <img
                        className="h-full w-full cursor-pointer rounded-lg object-center"
                        src="https://cdn.jamja.vn/blog/wp-content/uploads/2019/01/10-spa-uy-tin-nhat-ha-noi-3.jpg"
                        alt=""
                      />
                    </li>
                  </ol>
                  <img
                    src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/icon-pay-7-1_480x.png?v=1637918722"
                    alt=""
                  />
                </Link>
              )}

              <Link to="/services" className="hidden space-y-3 lg:block">
                <ol className="grid grid-cols-3 gap-1">
                  <li className="group relative">
                    <img
                      className="h-full w-full cursor-pointer rounded-lg object-center"
                      src="https://5.imimg.com/data5/DI/UY/MY-59447058/creative-haircut-loreal-hair-spa-28-mid-lenght-29-hair-wash-post-hair-spa-blast-dry-eyebrows-500x500.jpg"
                      alt=""
                    />
                  </li>
                  <li className="group relative">
                    <img
                      className="h-full w-full cursor-pointer rounded-lg object-center"
                      src="https://image.thanhnien.vn/w1024/Uploaded/2022/puqgfdmzs.co/2021_01_20/maihan/mai-han-spa-4_rzcg.jpg"
                      alt=""
                    />
                  </li>
                  <li className="group relative">
                    <img
                      className="h-full w-full cursor-pointer rounded-lg object-center"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy47-AE5po2IPszYU-Q2W67PXTCHK5R8gQF3RItwhoCZOrEwrk-7Qz_A9Jubb6gmw0vwY&usqp=CAU"
                      alt=""
                    />
                  </li>
                  <li className="group relative">
                    <img
                      className="h-full w-full cursor-pointer rounded-lg object-center"
                      src="https://vietyouth.vn/wp-content/uploads/2020/07/sai-gon-xinh-spa-1.jpeg"
                      alt=""
                    />
                  </li>
                  <li className="group relative">
                    <img
                      className="h-full w-full cursor-pointer rounded-lg object-center"
                      src="https://vietreview.vn/wp-content/uploads/2020/09/Taza-Spa.jpg"
                      alt=""
                    />
                  </li>
                  <li className="group relative">
                    <img
                      className="h-full w-full cursor-pointer rounded-lg object-center"
                      src="https://cdn.jamja.vn/blog/wp-content/uploads/2019/01/10-spa-uy-tin-nhat-ha-noi-3.jpg"
                      alt=""
                    />
                  </li>
                </ol>
                <img
                  src="https://cdn.shopify.com/s/files/1/0332/6420/5963/files/icon-pay-7-1_480x.png?v=1637918722"
                  alt=""
                />
              </Link>
            </article>
          </div>
          <div className="mt-5">
            <span className="block w-full rounded-full border-b-[1px] border-[#df9896]"></span>
            <span className="flex items-center justify-center py-3 text-center text-white">
              © 2022 QAPT2D Spa Company Ltd.
            </span>
          </div>
        </section>
      </footer>
    </Fragment>
  );
};

export default Footer;
