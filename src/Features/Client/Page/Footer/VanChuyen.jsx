import BannerFooter from 'Features/Client/Components/Header/Banner/BannerFooter';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import React, { Fragment } from 'react';

const VanChuyen = () => {
  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerFooter />
      </header>
      <main className="container mx-auto space-y-3 px-5 py-10 font-nunito md:w-[1300px]">
        <h2 className="text-center text-3xl font-semibold uppercase">Vận chuyển - giao hàng</h2>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">
            Toàn bộ đơn hàng được áp dụng vận chuyển qua bên đối tác thứ 3, đảm bảo các quyền lợi và
            yêu cầu của khách hàng:{' '}
          </h3>
          <ul className="space-y-3 pl-5">
            <li className="list-disc">
              Đơn hàng nội thành HCM : dự kiến 1-2 ngày sẽ nhận được kể từ ngày chốt đơn ( do dịch
              vụ GHTK vận chuyển)
            </li>
            <li className="list-disc">
              Đơn hàng nội thành HN : thường sẽ được giao trong ngày bằng dịch vụ ship ngoài, ngoại
              thành HN dự kiến giao 1-2 ngày kể từ ngày chốt đơn ( do dịch vụ GHTK vận chuyển )
            </li>
            <li className="list-disc">
              Đơn hàng tỉnh : dự kiến 3-4 ngày sẽ nhận được kể từ ngày chốt đơn ( dịch vụ GHTK vận
              chuyển )
            </li>
          </ul>
          <span className="block">
            Khách hàng sẽ được kiểm tra sản phẩm thuộc đơn hàng của mình trước khi thanh toán cho
            bên vận chuyển.
          </span>
          <h3 className="text-[20px] md:text-[25px]">
            Chuyển hàng qua bưu điện rồi thu tiền – COD
          </h3>
        </div>
      </main>
    </Fragment>
  );
};

export default VanChuyen;
