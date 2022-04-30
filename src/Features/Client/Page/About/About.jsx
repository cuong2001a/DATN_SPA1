import { Fragment } from 'react';
import 'animate.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
import Bannerintroduce from 'Features/Client/Components/Header/Banner/Bannerintroduce';
import { LOGO } from 'Constants';
const About = () => {
  document.title = 'Giới thiệu';

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
    <Fragment>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <Bannerintroduce />
      </header>
      <div className="container-fluid">
        <div className="about__staff  bg-[#e78fa1] py-20 text-center">
          <img className="mx-auto" src={LOGO} alt="logo" />
          <h3 className="text-3xl font-bold text-white">Đội ngũ kinh nghiệm</h3>
          <p className="mx-auto mt-4 max-w-lg text-base text-white">
            Hillsbeauty đặc biệt chú trọng xây dựng đội ngũ bác sĩ, chuyên gia giỏi, tâm huyết với
            nghề – Yếu tố then chốt quyết định tới 90% thành công của 1 ca thẩm mỹ. Tại đây, các bác
            sĩ thường xuyên cập nhật kiến thức chuyên môn thông qua các khóa tập huấn, hội thảo khoa
            học, chuyển giao công nghệ,
          </p>
        </div>
        <div className="founder my-20">
          <div className="container mx-auto lg:w-[1070px]">
            <h3 className="my-5 text-center text-3xl font-bold text-[#002603]">
              Đội ngũ nhân viên
            </h3>
            <div className="flex flex-wrap  justify-center">
              <div className="founder__item w-full px-4 md:w-1/2 xl:w-1/3">
                <div className="space-y-3 overflow-hidden rounded-lg bg-white">
                  <img
                    src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/img22.jpg"
                    alt="image2"
                    className="aspect-auto "
                  />
                  <div className="px-8 text-center sm:px-9 md:px-7 xl:px-9">
                    <h2 className="text-lg  font-bold text-[#002603]">Susan Delacour</h2>
                    <p className="text-body-color text-base leading-relaxed">
                      Chuyên viên chăm sóc da
                    </p>
                  </div>
                </div>
              </div>
              <div className="founder__item w-full px-4 md:w-1/2 xl:w-1/3">
                <div className="space-y-3 overflow-hidden rounded-lg bg-white">
                  <img
                    src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/Therapist-1.jpg"
                    alt="image2"
                    className="aspect-auto "
                  />
                  <div className="px-8 text-center sm:px-9 md:px-7 xl:px-9">
                    <h2 className="text-lg  font-bold text-[#002603]">Su Hon Kim</h2>
                    <p className="text-body-color text-base leading-relaxed">Chuyên viên massage</p>
                  </div>
                </div>
              </div>
              <div className="founder__item w-full px-4 md:w-1/2 xl:w-1/3">
                <div className="space-y-3 overflow-hidden rounded-lg bg-white">
                  <img
                    src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/Therapist-4-1.jpg"
                    alt="image2"
                    className="aspect-auto "
                  />
                  <div className="px-8 text-center sm:px-9 md:px-7 xl:px-9">
                    <h2 className="text-lg font-bold text-[#002603]">Melwyn Mccarthy</h2>
                    <p className="text-body-color text-base leading-relaxed">
                      Chuyên viên thảo dược spa
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10 bg-[#FFF5F4] py-10 ">
          <div className="content text-center">
            <h1 className="mb-4 text-xl font-bold uppercase text-[#b6a6a4] sm:text-4xl">
              Hillsbeauty
            </h1>
            <h3 className="mb-4 text-base font-bold capitalize text-[#b6a6a4] sm:text-3xl">
              Phản hồi khách hàng
            </h3>
          </div>
          <div className="container mx-auto lg:w-[912px]">
            <OwlCarousel className="owl-theme " {...options}>
              <div className="item mx-auto text-center">
                <p className="mx-5 mb-4 text-sm sm:mx-auto sm:max-w-xl sm:text-base">
                  Đi đến Spa là cách tốt nhất để vượt qua mọi hình thức căng thẳng. Mona Spa là hạnh
                  phúc thuần túy. Tất cả những điều tốt đẹp đến từ hạnh phúc bên trong. Hãy đối xử
                  tốt với bản thân bằng cách đến Spa ngay hôm nay!
                </p>
                <div className="mx-auto mb-4 h-[100px] w-[100px]">
                  <img
                    width="100px"
                    height="100px"
                    className=""
                    src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/customer-3-150x150.png"
                    alt=""
                  />
                </div>
                <span className="text-xl font-bold text-[#002603]">Thúy Vân</span>
              </div>
              <div className="item mx-auto text-center">
                <p className="mx-auto mb-4 max-w-xl text-sm sm:text-base">
                  Đi đến Spa là cách tốt nhất để vượt qua mọi hình thức căng thẳng. Mona Spa là hạnh
                  phúc thuần túy. Tất cả những điều tốt đẹp đến từ hạnh phúc bên trong. Hãy đối xử
                  tốt với bản thân bằng cách đến Spa ngay hôm nay!
                </p>
                <div className="mx-auto mb-4 h-[100px] w-[100px]">
                  <img
                    width="100px"
                    height="100px"
                    className=""
                    src="http://mauweb.monamedia.net/helenspa/wp-content/uploads/2019/06/customer-3-150x150.png"
                    alt=""
                  />
                </div>
                <span className="text-xl font-bold text-[#002603]">Thúy Vân</span>
              </div>
            </OwlCarousel>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
