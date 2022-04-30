import BannerFooter from 'Features/Client/Components/Header/Banner/BannerFooter';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import React, { Fragment } from 'react';

const TraHang = () => {
  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerFooter />
      </header>
      <main className="container mx-auto space-y-3 px-5 py-10 font-nunito md:w-[1300px]">
        <h2 className="text-center text-3xl font-semibold uppercase">Trả hàng & thanh toán</h2>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">Điều kiện đổi trả:</h3>
          <span className="block indent-8">
            Chúng tôi cam kết không cung cấp thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào.
            Tuy nhiên, chúng tôi có thể tiết lộ thông tin cá nhân của bạn trong một số trường hợp
            dưới đây:
          </span>
          <ul className="space-y-3 pl-5">
            <li className="list-disc">
              Sản phẩm khi nhận lại phải có đầy đủ các chứng từ kèm theo (chứng từ mua hàng, hóa đơn
              VAT nếu có) .
            </li>
            <li className="list-disc">Còn đầy đủ hộp, vỏ bao …. đi kèm sản phẩm.</li>
            <li className="list-disc">Quà khuyến mãi có giá trị (nếu có).</li>
            <li className="list-disc">
              Sản phẩm phải còn nguyên tem niêm phong của HILLSBEAUTY SPA
            </li>
            <li className="list-disc">
              Sản phẩm nhận lại không bị lỗi hình thức (trầy xước, vỡ, móp méo, ố vàng,…)
            </li>
            <li className="list-disc">
              Trường hợp sản phẩm đã được HILLSBEAUTY SPA viết hóa đơn tài chính, khách hàng muốn
              trả lại hàng phải viết trả lại hoá đơn tài chính hoặc làm thủ tục hủy hóa đơn này theo
              quy định của pháp luật.
            </li>
            <li className="list-disc">
              Trường hợp thiếu các điều kiện trên: HILLSBEAUTY SPA có quyền từ chối đổi trả hàng.
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">Trường hợp không được chấp nhận:</h3>
          <span className="block indent-8">
            Chúng tôi cam kết không cung cấp thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào.
            Tuy nhiên, chúng tôi có thể tiết lộ thông tin cá nhân của bạn trong một số trường hợp
            dưới đây:
          </span>
          <ul className="space-y-3">
            <li>Khách hàng muốn thay đổi chủng loại, mẫu mã nhưng không thông báo trước.</li>
            <li>Lỗi hỏng hóc sản phẩm do khách hàng bảo quản không đúng chỉ dẫn.</li>
            <li>
              Khách hàng tự làm ảnh hưởng đến tình trạng bên ngoài sản phẩm như rách bao bì, trầy,
              xước, vỡ,…
            </li>
            <li>
              Lỗi hình thức của sản phẩm (trầy xước, móp méo, ố vàng, vỡ…) sau khi khách hàng đã
              kiểm tra và nhận bàn giao.
            </li>
          </ul>
          <span className="block">
            Ngoài những trường hợp nêu trên nhưng không giới hạn, chúng tôi sẽ không công bố thông
            tin cá nhân của bạn cho bên thứ ba nào khác trừ khi chúng tôi hoàn toàn tin rằng, sự
            công bố này là cần thiết nhằm ngăn chặn những thiệt hại vật chất hoặc tài chính do các
            yếu tố có dấu hiệu phạm pháp có thể gây ra.
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">QUY TRÌNH & THỦ TỤC ĐỔI TRẢ HÀNG:</h3>
          <span className="block indent-8">
            Chúng tôi cam kết không cung cấp thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào.
            Tuy nhiên, chúng tôi có thể tiết lộ thông tin cá nhân của bạn trong một số trường hợp
            dưới đây:
          </span>
          <ul className="space-y-3">
            <li>
              Khách hàng liên hệ trực tiếp tới số{' '}
              <span className="px-1 text-red-600">0938 453 123</span>
            </li>
            <li>
              Sau khi có Giấy xác nhận tình trạng hàng hóa đủ điều kiện đổi trả, việc đổi trả hàng
              sẽ được thực hiện theo đúng quy định của HILLSBEAUTY SPA.
            </li>
            <li>
              Quy trình xử lý thủ tục đổi hoặc trả hàng được thực hiện trong vòng 24 giờ tính từ lúc
              HILLSBEAUTY SPA nhận đủ thông tin và các giấy tờ theo quy định từ phía khách hàng.
            </li>
          </ul>
        </div>
      </main>
    </Fragment>
  );
};

export default TraHang;
