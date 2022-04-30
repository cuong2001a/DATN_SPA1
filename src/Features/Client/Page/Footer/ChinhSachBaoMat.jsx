import BannerFooter from 'Features/Client/Components/Header/Banner/BannerFooter';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import React, { Fragment } from 'react';

const ChinhSachBaoMat = () => {
  return (
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerFooter />
      </header>
      <main className="container mx-auto space-y-3 px-5 py-10 font-nunito md:w-[1300px]">
        <h2 className="text-center text-3xl font-semibold uppercase">chính sách bảo mật</h2>
        <span className="block indent-8">
          Chúng tôi biết rằng sự riêng tư và bảo mật thông tin cá nhân rất quan trọng đối với người
          dùng, vì vậy chúng tôi cam kết nổ lực tối đa bảo vệ sự riêng tư của bạn.
          <br />
          Chính sách bảo mật mô tả cách thức chúng tôi thu thập và xử lý các thông tin cá nhân khi
          bạn sử dụng dịch vụ của HILLSBEAUTY SPA.Vn. Bạn đồng ý sử dụng dịch vụ của HILLSBEAUTY
          SPA, có nghĩa là bạn hoàn toàn đồng ý với các nội dung chúng tôi nếu trong Chính sách bảo
          mật này. Chúng tôi có thể sửa đổi nội dung của chính sách bằng cách đăng một bản sửa đổi
          lên Webkhoinghiep.net, phiên bản sửa đổi có hiệu lực kể từ thời điểm đăng tải.
        </span>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">Thông tin chúng tôi thu thập</h3>
          <ul className="space-y-3 pl-5">
            <li className="list-disc">
              Để có thể sử dụng đầy đủ các tiện ích trên HILLSBEAUTY SPA , bạn cần phải đăng ký
              thành viên và cung cấp các thông tin cá nhân của mình. Chúng tôi có thể thu thập các
              thông tin sau về bạn:
            </li>
            <li className="list-disc">Tên công ty, cửa hàng, đơn vị kinh doanh</li>
            <li className="list-disc">Họ Tên, tuổi, địa chỉ cư trú</li>
            <li className="list-disc">Email, số điện thoại di động, số điện thoại bàn</li>
            <li className="list-disc">
              Địa chỉ IP (Internet Protocol), loại trình duyệt web (Browser), tốc độ đường truyền,
              số trang bạn xem, thời gian bạn viếng thăm, những địa chỉ mà Browser này truy xuất
              đến.
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">
            HILLSBEAUTY SPA bảo vệ và lưu trữ thông tin cá nhân của bạn như thế nào?
          </h3>
          <span className="block indent-8">
            Chúng tôi lưu trữ và xử lý thông tin cá nhân của bạn trên máy chủ, chúng tôi bảo vệ nó
            bằng các biện pháp bảo vệ vật lý, điện tử bao gồm: tường lửa, mã hóa dữ liệu và thủ tục
            áp dụng theo quy định của luật bảo mật thông tin. HILLSBEAUTY SPA thực thi kiểm soát
            truy cập vật lý vào các thông tin, và chúng tôi chỉ cho phép truy cập thông tin cá nhân
            đối với những nhân viên cần nó để hoàn thành trách nhiệm công việc của họ trong hệ thống
            HILLSBEAUTY SPA.
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">Sử dụng thông tin của bạn</h3>
          <span className="block indent-8">
            Mục tiêu của chúng tôi là mang lại cho doanh nghiệp, người dùng một hạ tầng dịch vụ phục
            vụ quảng bá và phát triển thương hiệu, mở rộng kinh doanh trên Internet một cách hiệu
            quả, tối ưu về chi phí và thời gian. Vì vậy, chúng tôi sử dụng thông tin cá nhân của bạn
            nhằm:
          </span>
          <ul className="space-y-3 pl-5">
            <li className="list-disc">
              Cung cấp thông tin, các dịch vụ và sự hỗ trợ theo yêu cầu của bạn
            </li>
            <li className="list-disc">
              Gửi email thông báo các chương trình, sự kiện tiêu biểu của chúng tôi
            </li>
            <li className="list-disc">
              Giải quyết các tranh chấp, các vấn đề phát sinh liên quan đến việc sử dụng website
            </li>
            <li className="list-disc">
              Ngăn chặn các hoạt động phạm pháp hoặc bị cấm được nêu trong Quy định sử dụng
            </li>
            <li className="list-disc">Đo lường và cải thiện các dịch vụ của chúng tôi</li>
            <li className="list-disc">
              So sánh, đối chiếu tính chính xác của thông tin mà bạn cung cấp với bên thứ ba
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">Tiết lộ thông tin của bạn</h3>
          <span className="block indent-8">
            Chúng tôi cam kết không cung cấp thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào.
            Tuy nhiên, chúng tôi có thể tiết lộ thông tin cá nhân của bạn trong một số trường hợp
            dưới đây:
          </span>
          <ul className="space-y-3 pl-5">
            <li className="list-disc">Chúng tôi được bạn đồng ý tiết lộ những thông tin này</li>
            <li className="list-disc">
              Bên thứ ba mà bạn ủy quyền hoặc cho phép có yêu cầu chúng tôi cung cấp thông tin cá
              nhân của bạn
            </li>
            <li className="list-disc">
              Theo yêu cầu pháp lý hay từ một cơ quan chính phủ hoặc nếu chúng tôi tin rằng hành
              động đó là cần thiết nhằm tuân theo các yêu cầu pháp lý hoặc chiếu theo luật pháp
            </li>
            <li className="list-disc">
              Bảo vệ quyền, lợi ích, tài sản, sự an toàn của một ai khác
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
          <h3 className="text-[20px] md:text-[25px]">Quản lý thông tin trên website</h3>
          <span className="block indent-8">
            Bạn có thể truy cập, sửa chữa và cập nhật thông tin trên website của mình bằng cách đăng
            nhập và sử dụng các tính năng quản trị. Chúng tôi hoàn toàn không chịu trách nhiệm liên
            quan đến tính chính xác và hợp pháp của thông tin bạn đưa lên website.
          </span>
        </div>
        <div className="space-y-3">
          <h3 className="text-[20px] md:text-[25px]">Xử lí thông tin khi người dùng yêu cầu xóa</h3>
          <span className="block indent-8">
            Để hỗ trợ tốt nhất cho khách hàng, khi bạn muốn yêu cầu xóa thông tin mà Seoul Spa đã
            thu thập thì vui lòng liên hệ ngay đến mail support@diemnhan.com để được hỗ trợ xóa và
            những thông tin về sau.
          </span>
        </div>
      </main>
    </Fragment>
  );
};

export default ChinhSachBaoMat;
