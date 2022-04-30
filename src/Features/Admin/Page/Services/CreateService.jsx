import { Dialog, Transition } from '@headlessui/react';
import { ListService, UpdateService } from 'Features/Slice/Service/ServiceSlice';
import { FirebaseUploadMultiple } from 'Helpers/FirebaseUpload';
import React, { Fragment, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createService, updateService } from 'Services/services';
import { notifyError, notifySuccess } from 'Utils/Utils';
import { validate } from 'Constants/index.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Loading from 'Utils/Loading/Loading';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const CreateServices = (props) => {
  const { isEdit, isLoading, setIsLoading, setIsEdit, dataService, setDataService } = props;
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState(null);
  const [errImages, setErrImages] = useState(false);
  const [errImagesMessage, setErrImagesMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    reset();
  }, [props, reset]);

  const handleChange = async (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      const validateImages = validate.validateImageMultiple(newImage);
      if (validateImages !== false) {
        setErrImages(true);
        setErrImagesMessage(validateImages);
      } else {
        setErrImages(false);
        setErrImagesMessage('');
      }
      newImage['id'] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleOnSubmit = async (data) => {
    try {
      setIsLoading(true);
      const imageService = await FirebaseUploadMultiple(images);
      setIsLoading(false);
      await props.services?.map((item) => {
        if (data?.name.trim() === item?.service_name) {
          throw 'Tên dịch vụ đã tồn tại';
        }
      });

      if (parseInt(data?.priceSale) >= parseInt(data?.price)) {
        throw 'Giá giảm phải nhỏ hơn giá gốc';
      }
      setIsLoading(true);
      try {
        let dataCreate = {
          service_name: data?.name,
          service_price: data?.price,
          service_sale: data?.priceSale === '' ? 0 : data?.priceSale,
          service_description: description ? description : 'Đang cập nhật',
          service_album: imageService,
          category_id: data?.cate,
          service_time: data?.time
        };
        await createService(dataCreate);
        props.closeModal();
        dispatch(ListService([dataCreate]));
        notifySuccess('Thêm mới thành công');
      } catch (error) {
        notifyError('Thêm mới thất bại');
      }
    } catch (error) {
      notifyError(error);
    }
    setIsLoading(false);
  };

  const handleEdit = async (data) => {
    try {
      setIsLoading(true);
      let imageService = dataService.service_album;
      if (images.length > 0) {
        setIsLoading(true);
        imageService = await FirebaseUploadMultiple(images);
        setIsLoading(false);
      }
      await props.services?.map((item) => {
        if (data?.name.trim() === item?.service_name) {
          throw 'Tên dịch vụ đã tồn tại';
        }
      });

      if (parseInt(data?.priceSale) >= parseInt(data?.price)) {
        throw 'Giá giảm phải nhỏ hơn giá gốc';
      }
      setIsLoading(true);
      try {
        let dataEdit = {
          service_name: data?.name,
          service_price: data?.price,
          service_sale: data?.priceSale === '' ? 0 : data?.priceSale,
          service_description:
            description === null || description === ''
              ? dataService?.service_description
              : description,
          service_album: imageService,
          category_id: data?.cate,
          service_time: data?.time
        };
        await updateService(dataService._id, dataEdit);
        props.closeModal();
        dispatch(ListService([dataEdit]));
        await setImages([]);
        setIsLoading(false);
        notifySuccess('Sửa dịch vụ thành công');
      } catch (error) {
        notifyError('Sửa dịch vụ thất bại');
      }
    } catch (error) {
      notifyError(error);
    }
    setIsLoading(false);
  };

  return (
    <Transition appear show={props.isOpen}>
      <Dialog
        as="div"
        className="scroll-custom-side-bar fixed inset-0 z-40 mx-auto w-[70%] overflow-y-auto"
        onClose={props.closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-700 opacity-50" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block transform overflow-hidden rounded-2xl bg-gradient-to-b from-sky-400 to-sky-200 p-6 text-left align-middle shadow-xl transition-all">
              <div className="flex items-center justify-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-700">
                  {isEdit ? 'Sửa dịch vụ' : 'Thêm dịch vụ'}
                </h3>
              </div>
              <form
                className="m-5 bg-white p-5"
                onSubmit={handleSubmit(isEdit ? handleEdit : handleOnSubmit)}
              >
                <div>
                  <div className="grid grid-cols-2 gap-[15px]">
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Tên dịch vụ
                      </label>
                      <input
                        {...register('name', {
                          required: validate.required,
                          validate: validate.validateName
                        })}
                        type="text"
                        id="name"
                        defaultValue={isEdit ? dataService?.service_name : null}
                        className={
                          errors?.name
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.name && errors?.name?.message}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="cate"
                      >
                        Danh mục
                      </label>
                      <select
                        {...register('cate', {
                          required: validate.required,
                          validate: validate.validateSelectOption
                        })}
                        id="cate"
                        defaultValue={isEdit ? dataService?.category_id._id : null}
                        className={
                          errors?.cate
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      >
                        <option value="">Danh mục</option>
                        {props.categories?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.category_name}
                          </option>
                        ))}
                      </select>
                      <span className="text-[12px] text-red-500">
                        {errors?.cate && errors?.cate?.message}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="price"
                      >
                        Giá (VNĐ)
                      </label>
                      <input
                        {...register('price', {
                          required: validate.required,
                          validate: validate.validatePrice
                        })}
                        type="number"
                        id="price"
                        defaultValue={isEdit ? dataService?.service_price : null}
                        className={
                          errors?.price
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.price && errors?.price?.message}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="time"
                      >
                        Thời gian thực hiện (tối thiểu 25 phút)
                      </label>
                      <input
                        {...register('time', {
                          required: validate.required,
                          validate: validate.validateTime,
                          min: 25
                        })}
                        type="number"
                        id="time"
                        defaultValue={isEdit ? dataService?.service_time : null}
                        className={
                          errors?.time
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.time && errors?.time?.message}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="priceSale"
                      >
                        Giảm giá (VNĐ)
                      </label>
                      <input
                        {...register('priceSale')}
                        type="number"
                        id="priceSale"
                        defaultValue={isEdit ? dataService?.service_sale : null}
                        className={
                          errors?.priceSale
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.priceSale && errors?.priceSale?.message}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="image"
                      >
                        Ảnh
                      </label>
                      <input
                        {...register(
                          'imageMultiple',
                          isEdit ? { required: false } : { required: true }
                        )}
                        type="file"
                        multiple
                        id="imageMultiple"
                        onChange={handleChange}
                        className={
                          errImages || errors.imageMultiple
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      {errors.imageMultiple && (
                        <span hidden={errImagesMessage} className="text-[12px] text-red-500">
                          Yêu cầu nhập trường này
                        </span>
                      )}
                      <span className="text-[12px] text-red-500">{errImagesMessage}</span>
                      {dataService?.service_album && images.length === 0 ? (
                        <div className="mt-2 flex flex-row gap-5">
                          <div className="flex h-[50px] w-[50px] gap-5 object-cover">
                            {dataService.service_album.slice(0, 5).map((item, index) => (
                              <img key={index} src={item} alt="img_service" />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2 flex flex-row gap-5 ">
                          <div className="flex h-[50px] w-[50px] gap-5 object-cover">
                            {images.length > 0 &&
                              images
                                .slice(0, 5)
                                .map((item, index) => (
                                  <img
                                    key={index}
                                    src={URL.createObjectURL(item)}
                                    alt="img_service"
                                  />
                                ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-[15px] mb-4 flex flex-col">
                  <label className="mr-4 mb-2 inline-block font-bold text-gray-700">Mô tả</label>
                  {/* <textarea {...register("desc", { required: true })} id="desc" className="border bg-gray-100 py-2 px-4 w-full h-40 outline-none focus:ring-2 focus:ring-indigo-400 rounded resize-none"></textarea> */}

                  <CKEditor
                    data={isEdit ? dataService?.service_description : ''}
                    editor={ClassicEditor}
                    onChange={async (event, editor) => {
                      const data = editor.getData();
                      await setDescription(data);
                    }}
                  />
                </div>

                <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <ButtonComponent
                    type="submit"
                    mes={isEdit ? 'Sửa' : 'Thêm mới'}
                    config="inline-flex justify-center"
                  />
                  <ButtonComponent
                    config="inline-flex justify-center"
                    mes=" Trở lại"
                    callBack={props.closeModal}
                  />
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
      {isLoading && <Loading />}
    </Transition>
  );
};

export default CreateServices;
