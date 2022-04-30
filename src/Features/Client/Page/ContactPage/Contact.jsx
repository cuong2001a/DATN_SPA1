import { validate } from 'Constants';
import { useForm } from 'react-hook-form';
import { notifyError, notifySuccess } from 'Utils/Utils';
import { createContact } from 'Services/contact';
import HeaderTop from '../../Components/Header/HeaderTop';
import TextField from '@mui/material/TextField';
import Loading from 'Utils/Loading/Loading';
import { useState } from 'react';
import BannerContact from './../../Components/Header/Banner/BannerContact';

export const Contact = () => {
  document.title = "Liên hệ"
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleOnSubmit = async (data) => {
    try {
      setIsLoading(true);
      let dataCreate = {
        name: data.name,
        content: data.heading_content,
        email: data.email,
        phone: data.phone,
        content_confirm: data.content,
        status: 0
      };
      await createContact(dataCreate);
      await reset();
      await setIsLoading(false);
      notifySuccess('Gửi thông tin liên hệ thành công');
    } catch (error) {
      await setIsLoading(false);
      notifyError('Gửi thông tin liên hệ thất bại');
    }
  };

  return (
    <div>
      <header className="relative z-40 font-nunito">
        <HeaderTop />
        <BannerContact />
      </header>
      <div className="font-nunito">
        <div >
          <div className="container mx-auto px-5 py-10">
            <div className="relative pb-2">
              <img className="mx-auto" src="images/banner/service/hillsbeauty-feedback.png" alt="" />
              <div className="absolute top-10 inset-0 flex item-center justify-center my-auto">
                <div className="text-left pl-2">
                  <span className="block text-[48px] font-bold">HILLSBEAUTY SPA</span>
                </div>
              </div>
            </div>
            <h2 className="text-center text-2xl font-bold text-cyan-900">
              Nếu bạn cần giúp đỡ? Hãy liên lạc với chúng tôi
            </h2>
            <p className="mx-auto mt-4 max-w-6xl text-center opacity-60">
              Bạn sẽ được phân tích làn da của chính mình một cách chi tiết nhất, đầy đủ nhất, với
              toàn bộ ưu nhược điểm. Từ đó, Amadora sẽ chỉ cho bạn thấy tất cả những vấn đề, nguyên
              nhân và tại sao cần khắc phục, khắc phục như thế nào &amp; bằng cách nào để đạt hiệu quả
              tối ưu nhất.
            </p>
          </div>
          <div className="relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.362869995304!2d105.85257961524643!3d21.018161886004105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab39c6c2a559%3A0xc67eddbdee5c602!2sHillsbeauty%20Cosmetics%20%26%20Spa%20L%C3%AA%20V%C4%83n%20H%C6%B0u!5e0!3m2!1svi!2s!4v1651068130970!5m2!1svi!2s"
              className="w-full h-screen"
              allowFullScreen
              loading="lazy">
            </iframe>
            <div className="shadow-1 absolute md:right-20 mx-10 shadow-lg rounded inset-y-0 bg-white md:h-[62%] h-[70%] my-auto px-10">
              <h3 className="my-6 text-center text-xl font-bold text-cyan-900">
                Hãy liên hệ với chúng tôi
              </h3>
              <form onSubmit={handleSubmit(handleOnSubmit)}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    {/* <input
                      type="text"
                      placeholder="Tên"
                      className="rounded-md bg-gray-200 py-2 px-4 w-full"
                      {...register('name', {
                        required: validate.required,
                        validate: validate.validateName,
                        maxLength: 50,
                        minLength: 2
                      })}
                    /> */}
                    <TextField
                      className="w-full rounded-md bg-gray-200 py-2 px-4"
                      id="outlined-basic"
                      label="Tên"
                      size="small"
                      variant="outlined"
                      {...register('name', {
                        required: validate.required,
                        validate: validate.validateName,
                        maxLength: 50,
                        minLength: 2
                      })}
                    />
                    <span className="mt-2 text-[12px] text-red-500">
                      {errors?.name && errors?.name?.message}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {/* <input
                      type="text"
                      placeholder="Tiêu đề"
                      className="rounded-md bg-gray-200 py-2 px-4 w-full"
                      {...register('heading_content', {
                        required: validate.required,
                      })}
                    /> */}
                    <TextField
                      className="w-full rounded-md bg-gray-200 py-2 px-4"
                      id="outlined-basic"
                      label="Tiêu đề"
                      size="small"
                      variant="outlined"
                      {...register('heading_content', {
                        required: validate.required
                      })}
                    />
                    <span className="mt-2 text-[12px] text-red-500">
                      {errors?.heading_content && errors?.heading_content?.message}
                    </span>
                  </div>
                </div>
                <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-6">
                  <div>
                    {/* <input
                      type="email"
                      placeholder="Email"
                      className="ms:mt-4 rounded-md bg-gray-200 py-2 px-4 w-full"
                      {...register('email', {
                        validate: validate.validateEmail,
                      })}
                    /> */}
                    <TextField
                      type="email"
                      className=" w-full rounded-md bg-gray-200 py-2 px-4"
                      id="outlined-basic"
                      label="Email"
                      size="small"
                      variant="outlined"
                      {...register('email', {
                        validate: validate.validateEmail
                      })}
                    />
                    <span className="mt-2 text-[12px] text-red-500">
                      {errors?.email && errors?.email?.message}
                    </span>
                  </div>
                  <div>
                    {/* <input
                      type="text"
                      placeholder="Số điện thoại"
                      className="rounded-md bg-gray-200 py-2 px-4 w-full"
                      {...register('phone', {
                        required: validate.required,
                        validate: validate.validatePhone,
                      })}
                    /> */}
                    <TextField
                      className="w-full rounded-md bg-gray-200 py-2 px-4"
                      id="outlined-basic"
                      label="Số điện thoại"
                      size="small"
                      variant="outlined"
                      {...register('phone', {
                        required: validate.required,
                        validate: validate.validatePhone
                      })}
                    />
                    <span className="mt-2 text-[12px] text-red-500">
                      {errors?.phone && errors?.phone?.message}
                    </span>
                  </div>
                </div>
                <div className="md:my-6">
                  <textarea
                    cols="30"
                    rows="10"
                    maxLength="500"
                    placeholder="Nội dung"
                    className="w-full resize-none rounded-md bg-gray-200 py-2 px-4"
                    {...register('content')}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="mx-auto block cursor-pointer rounded-full bg-red-300 py-2 px-4 font-semibold text-white hover:bg-red-400"
                >
                  Gửi thông tin liên hệ
                </button>
              </form>
            </div>
          </div>
          <div className="mx-auto my-10  max-w-6xl text-center opacity-60">
            <span className="block md:w-[550px] w-[410px] mx-auto">
              Mọi ý kiến đóng góp của khách hàng đều có ý nghĩa giúp Hillsbeauty ngày càng hoàn thiện và phát triển hơn.
            </span>
          </div>
        </div>
      </div>

      {isLoading && <Loading />}
    </div>
  );
};

export default Contact;
