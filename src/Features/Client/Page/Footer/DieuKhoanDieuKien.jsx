import BannerFooter from 'Features/Client/Components/Header/Banner/BannerFooter';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import React, { Fragment } from 'react';

const DieuKhoanDieuKien = () => {
  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerFooter />
      </header>
      <main className="container mx-auto space-y-3 px-5 py-10 font-nunito md:w-[1300px]">
        <h2 className="text-center text-3xl font-semibold uppercase">Điều Khoản Và Điều kiện</h2>
        <div className="space-y-3">
          <span className="block indent-8">
            Giá trị “Sống” trong suốt hành trình chăm sóc vẻ đẹp hơn 20 năm qua luôn là điều mà
            HILLSBEAUTY SPA hướng tới – một hành trình “Sống có đam mê, Sống trách nhiệm, Sống gắn
            bó, Sống yêu thương và Sống sẻ chia”. Giá trị nhân văn cốt lõi ẩn chứa trong “Sống”
            chính là “kim chỉ nam’ xuyên suốt cuộc hành trình giúp HILLSBEAUTY SPA giữ vững được
            triết lý kinh doanh của mình. Các dòng sản phẩm mà chúng tôi lựa chọn phân phối là những
            sản phẩm không chỉ làm đẹp mà còn lành, an toàn cho sức khỏe của người dùng, cũng như
            tôn trọng môi trường, có trách nhiệm với cộng đồng.
          </span>
          <span className="block indent-8">
            HILLSBEAUTY SPA sở hữu thương hiệu Anam QT Spa – Là Spa đẳng cấp quốc tế đầu tiên của
            Việt Nam từ năm 1996. Đồng thời, chúng tôi là nhà nhập khẩu và phân phối độc quyền của
            các nhãn hàng chuyên nghiệp hàng cao cấp trên thế giới như:
          </span>
          <ul className="space-y-3 pl-5">
            <li className="list-disc">
              Sản phẩm chăm sóc tóc chuyên nghiệp: Oway, UNA, GENIUS, WIZOUT từ Italy
            </li>
            <li className="list-disc">
              Sản phẩm chăm sóc da chuyên nghiệp: GERnétic international (Pháp), Arbré (Australia)
            </li>
            <li className="list-disc">Sản phẩm kéo cắt tóc chuyên nghiệp: Joewell (Nhật bản)</li>
          </ul>
          <h3 className="text-[20px] md:text-[25px]">
            Sản phẩm kéo cắt tóc chuyên nghiệp: Joewell (Nhật bản)
          </h3>
          <ul className="space-y-3 pl-5">
            <li className="list-disc">
              100% sản phẩm phân phối là những sản phẩm chính hãng được nhập trực tiếp từ Nhà sản
              xuất.
            </li>
            <li className="list-disc">
              Chỉ tư vấn những sản phẩm phù hợp với nhu cầu của khách hàng bởi các Tư vấn viên đã
              được đào tạo kiến thức về tóc và da bởi chúng tôi. Đó là lý do các sản phẩm của chúng
              tôi CHỈ ĐƯỢC phân phối tại các salon/spa được ủy quyền. Chúng tôi KHÔNG phân phối sản
              phẩm đại trà tại các cửa hàng bách hóa mỹ phẩm và/hoặc các website thương mại điện tử
              như: Lazada, Shopee, Sendo, Tiki …. và các website thương mại điện tử tương tự khác
              chưa được kể tên.
            </li>
            <li className="list-disc">
              Luôn tiếp nhận và lắng nghe ý kiến đóng góp của khách hàng một cách chân thành nhất.
              Hotline: 096 101 1999 (tại Hà Nội)
            </li>
            <li className="list-disc">
              Thông tin của khách hàng chỉ được sử dụng với mục đích đem lại dịch vụ khách hàng tốt
              nhất tới Quý khách.
            </li>
            <li className="list-disc">
              Toàn bộ sản phẩm được được dán tem xác thực chống hàng giả. Quý khách vui lòng chỉ mua
              sản phẩm khi còn nguyên tem niêm phong nguyên vẹn; Từ chối nhận hàng nếu thấy tem bị
              rách, bôi, xóa, cắt góc. Vui lòng cà chì để lấy mã xác thực và/hoặc quét mã QR xác
              thực theo hướng dẫn trên tem. Quý khách vui lòng chụp ảnh tem trên sản phẩm trước khi
              mở niêm phong và sau khi đã cà chì để xác thực tem. BTC chỉ cam kết và chịu trách
              nhiệm về sản phẩm với khi được cung cấp đủ 2 ảnh tình trạng tem, và sản phẩm được mua
              tại các spa/salon được ủy quyền.
            </li>
          </ul>
        </div>
      </main>
    </Fragment>
  );
};

export default DieuKhoanDieuKien;
