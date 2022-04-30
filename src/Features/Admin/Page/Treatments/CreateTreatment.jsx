import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { validate } from 'Constants/index.js';
import {
  CreateTreatment as disPatchTreat,
  UpdateTreatment
} from 'Features/Slice/Treatment/TreatmentSlice';
import Loading from 'Utils/Loading/Loading';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import { pink } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { FirebaseUploadMultiple } from 'Helpers/FirebaseUpload';
import { notifyError } from 'Utils/Utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateTreatment = (props) => {
  const serviceState = useSelector((state) => state.service.current);
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [editImages, setEditImages] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  const [selectedValue, setSelectedValue] = useState(null);
  const [services, setServices] = useState(serviceState);
  const treatments = useSelector((state) => state.treatment.current);
  const [opService, setOpService] = useState(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    reset();
  }, [props, reset]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item }
  });

  useEffect(() => {
    reset({
      name: '',
      numberTreatment: ''
    });
    if (props.typeDialog === 1) {
      initEdit();
    }
    return () => {
      setOpService(undefined);
      setServices(serviceState);
      setSelectedValue(null);
      setEditImages(null);
      setImages([]);
      setIsEdit(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, reset]);

  function handleFindService(id) {
    setServices(services.filter((item) => item._id !== id));
  }
  function initEdit() {
    const data = props.itemEdit;
    setOpService(data.service_id);
    setIsEdit(true);
    setDescription(data?.treatment_id?.treatment_description);
    setEditImages(data?.treatment_id?.album);
    handleFindService(data?.service_id?._id);
    setName(data.treatment_id.treatment_name);
    reset({
      name: data.treatment_id.treatment_name,
      numberTreatment: data.treatment_id.number_of_treatments,
      price: data.treatment_id.treatment_price,
      time: data.treatment_id.treatment_duration,
      priceSale: data.treatment_id.treatment_sale,
      description: data.treatment_id.treatment_description
    });
  }

  useEffect(() => {
    setName((prev) => prev.trimLeft().replace(/\s{2,}/g, ' '));
  }, [name]);

  const handleChangeImage = async (e) => {
    const files = Array.from(e.target.files)?.map((item) => {
      return {
        file: item,
        url: URL.createObjectURL(item)
      };
    });
    setImages(files);
  };

  const handleCloseModal = () => {
    setIsEdit(false);
    setImages([]);
    setEditImages(null);
    props.closeModal();
  };

  const onSubmit = async (data) => {
    try {
      const valid = treatments.find(
        (item) => item.treatment_id?.treatment_name.toLocaleLowerCase() === name.toLocaleLowerCase()
      );
      if (valid) {
        notifyError('Tên liệu trình đã tồn tại');
        return;
      }
      if (parseInt(data?.priceSale) >= parseInt(data?.price)) {
        notifyError('Giá giảm phải nhỏ hơn giá gốc');
        return;
      }
      setIsLoading(true);
      const album = await FirebaseUploadMultiple(images?.map((item) => item.file));

      const dataAll = {
        treatment_name: data.name,
        treatment_price: data.price,
        treatment_sale: data.priceSale ? data.priceSale : 0,
        treatment_duration: data.time,
        album,
        number_of_treatments: data.numberTreatment,
        service_id: data.cate,
        active: selectedValue === null ? true : selectedValue,
        treatment_description: description ? description : 'Đang cập nhật'
      };

      await dispatch(disPatchTreat(dataAll));
      props.closeModal();
      setIsLoading(false);
    } catch (error) {}
  };
  const onEdit = async (value) => {
    const { imageMultiple } = value;

    if (value.treatment_sale === '') {
      value.treatment_sale = 0;
    }
    try {
      if (parseInt(value?.priceSale) >= parseInt(value?.price)) {
        notifyError('Giá giảm phải nhỏ hơn giá gốc');
        return;
      }
      if (parseInt(value?.price) < 0) {
        throw new 'Giá liệu trình không được âm'();
      }
      if (parseInt(value?.priceSale) < 0) {
        throw new 'Giá giảm không được âm'();
      }
      setIsLoading(true);
      if (imageMultiple?.length === 0) {
        const EditData = {
          _id: props.itemEdit?.treatment_id?._id,
          treatment_name: value?.name,
          treatment_price: value?.price,
          treatment_sale: value?.priceSale ? value.priceSale : 0,
          treatment_duration: value?.time,
          album: editImages,
          number_of_treatments: value?.numberTreatment,
          service_id: value?.cate,
          active: selectedValue === null ? true : selectedValue,
          treatment_description: description ? description : 'Đang cập nhật'
        };
        dispatch(UpdateTreatment(EditData));
      } else {
        const album = await FirebaseUploadMultiple(images?.map((item) => item.file));
        const EditData = {
          _id: props.itemEdit?.treatment_id?._id,
          treatment_name: value?.name,
          treatment_price: value?.price,
          treatment_sale: value?.priceSale ? value.priceSale : 0,
          treatment_duration: value?.time,
          album,
          number_of_treatments: value?.numberTreatment,
          service_id: value?.cate,
          active: selectedValue === null ? true : selectedValue,
          treatment_description: description ? description : 'Đang cập nhật'
        };
        dispatch(UpdateTreatment(EditData));
      }
      handleCloseModal();
      setIsLoading(false);
      setName('');
    } catch (error) {}
  };
  return (
    <Transition appear show={props.isOpen}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={handleCloseModal}>
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
            <div className="my-8 inline-block w-4/5 transform overflow-hidden rounded-2xl bg-gradient-to-b from-sky-400 to-sky-200 p-6 text-left align-middle shadow-xl transition-all">
              <div className="flex items-center justify-center">
                <h3 className="mb-2 text-2xl font-bold text-gray-700">
                  {props.typeDialog !== 0 ? 'Sửa liệu trình' : 'Thêm liệu trình'}
                </h3>
              </div>
              <form
                className="m-5 bg-white p-5"
                onSubmit={handleSubmit(props.typeDialog === 0 ? onSubmit : onEdit)}
              >
                <div>
                  <div className="grid grid-cols-2  gap-[15px]">
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Tên liệu trình
                      </label>
                      <input
                        value={name}
                        type="text"
                        id="name"
                        {...register('name', {
                          required: validate.required,
                          maxLength: 50
                        })}
                        onChange={(e) => setName(e.target.value)}
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
                        Dịch vụ
                      </label>
                      <select
                        {...register('cate', {
                          required: validate.required
                        })}
                        id="cate"
                        className={
                          errors?.cate
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      >
                        {opService ? (
                          <option value={opService._id}>{opService.service_name}</option>
                        ) : (
                          <option value="">Dịch vụ</option>
                        )}
                        {services.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.service_name}
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
                          required: validate.required
                        })}
                        type="number"
                        id="price"
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
                          min: 25
                        })}
                        type="number"
                        id="time"
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
                        {...register('imageMultiple', {
                          required: isEdit ? false : true
                        })}
                        type="file"
                        multiple
                        id="imageMultiple"
                        onChange={handleChangeImage}
                        className={
                          errors.imageMultiple
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      {errors.imageMultiple && (
                        <span className="text-[12px] text-red-500">Yêu cầu nhập trường này</span>
                      )}
                      {images?.length === 0 ? (
                        <div className="flex gap-5">
                          {editImages?.map((item, index) => {
                            return (
                              <div key={index} className="h-[50px] w-[50px]">
                                <img src={item} className="" alt="img2" />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-2 flex flex-row gap-5 ">
                          <div className="flex h-[50px] w-[50px] gap-5 object-cover">
                            {images &&
                              images?.map((item, index) => (
                                <img key={index} src={item.url} alt="img_product" />
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="numberTreatment"
                      >
                        Số lần sử dụng
                      </label>
                      <input
                        {...register('numberTreatment', {
                          required: validate.required,
                          min: 1,
                          max: 100,
                          minLength: 1,
                          maxLength: 3
                        })}
                        type="number"
                        id="numberTreatment"
                        className={
                          errors?.numberTreatment
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.numberTreatment && errors?.numberTreatment?.message}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="numberTreatment"
                      >
                        Trạng thái
                      </label>
                      {props.typeDialog === 0 ? (
                        <div>
                          <label>
                            <span className="text-xs"> Hoạt động</span>
                            <Radio {...controlProps('true')} color="primary" />
                          </label>
                          <label>
                            <span className="text-xs"> Vô hiệu hóa</span>
                            <Radio
                              {...controlProps('false')}
                              sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                  color: pink[600]
                                }
                              }}
                            />
                          </label>
                        </div>
                      ) : props.itemEdit.treatment_id.active ? (
                        <label>
                          <span className="text-xs"> Vô hiệu hóa</span>
                          <Radio
                            {...controlProps('false')}
                            sx={{
                              color: pink[800],
                              '&.Mui-checked': {
                                color: pink[600]
                              }
                            }}
                          />
                        </label>
                      ) : (
                        <label>
                          <span className="text-xs"> Kích hoạt lại</span>
                          <Radio {...controlProps('true')} color="primary" />
                        </label>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-[15px] mb-4 flex flex-col">
                  <label className="mr-4 mb-2 inline-block font-bold text-gray-700">Mô tả</label>

                  <CKEditor
                    editor={ClassicEditor}
                    onChange={async (event, editor) => {
                      const data = editor.getData();
                      await setDescription(data);
                    }}
                    data={props.typeDialog === 1 ? description : ''}
                  />
                </div>

                <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <ButtonComponent
                    type="submit"
                    mes={opService ? 'Sửa liệu trình' : 'Tạo liệu trình'}
                    config="inline-flex justify-center"
                  />
                  <ButtonComponent
                    config="inline-flex justify-center"
                    mes=" Trở lại"
                    callBack={handleCloseModal}
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

export default CreateTreatment;
