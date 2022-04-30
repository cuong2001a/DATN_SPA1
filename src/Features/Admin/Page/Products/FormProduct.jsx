import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { validate } from 'Constants/index.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FirebaseUploadMultiple } from 'Helpers/FirebaseUpload';
import { notifyError } from 'Utils/Utils';
import { UpdateProduct, CreateProduct } from 'Features/Slice/Product/ProductSlice';
import Loading from 'Utils/Loading/Loading';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const FormProduct = (props) => {
  const { detailItem, isEdit, setIsEdit } = props;
  const dispatch = useDispatch();
  const [filesImg, setFilesImg] = useState([]);
  const [description, setDescription] = useState(null);
  const [errImages, setErrImages] = useState(false);
  const [errImagesMessage, setErrImagesMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  //sửa sản phẩm
  const handleEditForm = async (value) => {
    if (description) {
      value.product_description = description;
    } else {
      if (!detailItem.product_description) {
        detailItem.product_description = 'Chưa cập nhật';
      }
      value.product_description = detailItem.product_description;
    }
    if (value.product_sale === '') {
      value.product_sale = 0;
    }
    try {
      const { product_album } = value;
      if (parseInt(value?.product_sale) >= parseInt(value?.product_price)) {
        throw new 'Giá giảm phải nhỏ hơn giá gốc'();
      }
      if (parseInt(value?.product_price) < 0) {
        throw new 'Giá sản phẩm không được âm'();
      }
      if (parseInt(value?.product_sale) < 0) {
        throw new 'Giá giảm không được âm'();
      }
      if (parseInt(value?.product_amount) < 0) {
        throw new 'Số lượng không được âm'();
      }
      setIsLoading(true);
      if (product_album.length === 0) {
        const Editdata = {
          ...detailItem,
          ...value,
          product_album: detailItem?.product_album
        };
        dispatch(UpdateProduct(Editdata));
        props.closeModal();
        setFilesImg([]);
        reset();
      } else {
        const imageService = await FirebaseUploadMultiple(filesImg.map((item) => item.file));

        const Editdata = {
          ...detailItem,
          ...value,
          product_album: imageService
        };
        dispatch(UpdateProduct(Editdata));
        props.closeModal();
        setFilesImg([]);
        reset();
      }
    } catch (error) {
      notifyError(error);
    }
    setIsLoading(false);
  };

  //tạo sản phẩm
  const handleOnSubmit = async (value) => {
    if (!description) {
      value.product_description = 'Chưa cập nhật!';
    } else {
      value.product_description = description;
    }
    if (value.product_sale === '') {
      value.product_sale = 0;
    }

    try {
      if (parseInt(value.product_sale) >= parseInt(value.product_price)) {
        throw new 'Giá giảm phải nhỏ hơn giá gốc'();
      }
      if (parseInt(value?.product_price) < 0) {
        throw new 'Giá sản phẩm không được âm'();
      }
      if (parseInt(value?.product_sale) < 0) {
        throw new 'Giá giảm không được âm'();
      }
      if (parseInt(value?.product_amount) < 0) {
        throw new 'Số lượng không được âm'();
      }
      setIsLoading(true);
      const imageProduct = await FirebaseUploadMultiple(filesImg.map((item) => item.file));
      let dataCreate = {
        ...value,
        product_album: imageProduct
      };
      dispatch(CreateProduct(dataCreate));
      props.closeModal();
      setFilesImg([]);
      reset();
    } catch (error) {
      notifyError(error);
    }
    setIsLoading(false);
  };

  const handleChange = async (e) => {
    const files = Array.from(e.target.files)?.map((item) => {
      return {
        file: item,
        url: URL.createObjectURL(item)
      };
    });
    setFilesImg(files);
  };

  const ExitModel = () => {
    const url = filesImg.map((item) => item.url);
    URL.revokeObjectURL(url);
    setFilesImg([]);
    reset();
    setIsEdit(false);
    props.closeModal();
  };
  useEffect(() => {
    setValue('product_name', detailItem?.product_name);
    setValue('product_price', detailItem?.product_price);
    setValue('product_sale', detailItem?.product_sale);
    setValue('product_amount', detailItem?.product_amount);
    setValue('product_content', detailItem?.product_content);
    setValue('category_id', detailItem?.category_id._id);
    setValue('brand_id', detailItem?.brand_id._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailItem]);

  useEffect(() => {
    handleCheckName();
    setName((prev) => prev.trimLeft().replace(/\s{2,}/g, ' '));
    setContent((prev) => prev.trimLeft().replace(/\s{2,}/g, ' '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, content]);

  function handleCheckName() {
    props.products.forEach((item) => {
      if (name.trim().toLowerCase() === item.product_name.trim().toLowerCase()) {
        notifyError('Tên sản phẩm đã tồn tại');
      }
    });
  }

  return (
    <Fragment>
      <Transition appear show={props.isOpen}>
        <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={() => ExitModel()}>
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
                    {isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}{' '}
                  </h3>
                </div>
                <form
                  className="m-5 bg-white p-5"
                  onSubmit={handleSubmit(isEdit ? handleEditForm : handleOnSubmit)}
                >
                  <div className="grid grid-cols-2  gap-[15px]">
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Tên sản phẩm
                      </label>
                      <input
                        {...register('product_name', {
                          required: validate.required,
                          maxLength: 50,
                          minLength: 2
                        })}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={
                          errors?.product_name
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.product_name && errors?.product_name?.message}
                      </span>
                      <span className="text-[12px] text-red-500">
                        {errors?.product_name?.type === 'maxLength' && 'Kí tự tối đa là 50'}
                      </span>
                      <span className="text-[12px] text-red-500">
                        {errors?.product_name?.type === 'minLength' && 'Kí tự tối thiểu là 2'}
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
                        {...register('category_id', {
                          required: validate.required,
                          validate: validate.validateSelectOption
                        })}
                        id="category_id"
                        className={
                          errors?.category_id
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
                        {errors?.category_id && errors?.category_id?.message}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Giá (VNĐ)
                      </label>
                      <input
                        {...register('product_price', {
                          required: validate.required
                        })}
                        type="number"
                        id="name"
                        className={
                          errors?.product_price
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.product_price && errors?.product_price?.message}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="product_sale"
                      >
                        Giảm giá (VNĐ)
                      </label>
                      <input
                        {...register('product_sale')}
                        defaultValue={isEdit ? detailItem?.product_sale : ''}
                        type="number"
                        id="priceSale"
                        className={
                          errors?.product_sale
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.product_sale && errors?.product_sale?.message}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="product_amount"
                      >
                        Số lượng sản phẩm
                      </label>
                      <input
                        {...register('product_amount', {
                          required: validate.required,
                          min: 1,
                          max: 10000
                        })}
                        defaultValue={isEdit ? detailItem?.product_amount : ''}
                        type="number"
                        id="product_amount"
                        className={
                          errors?.product_amount
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.product_amount && errors?.product_amount?.message}
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
                        {...register('product_album', { required: detailItem ? false : true })}
                        type="file"
                        multiple
                        onChange={handleChange}
                        id="product_album"
                        className={
                          errImages || errors.product_album
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      {detailItem !== null ? (
                        <div className="flex gap-5">
                          {detailItem?.product_album?.map((item, index) => {
                            return (
                              <div key={index} className="h-[50px] w-[50px]">
                                <img src={item} className="" />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-2 flex flex-row gap-5 ">
                          <div className="flex h-[50px] w-[50px] gap-5 object-cover">
                            {filesImg &&
                              filesImg.map((item, index) => (
                                <img key={index} src={item.url} alt="img_product" />
                              ))}
                          </div>
                        </div>
                      )}
                      {errors.product_album && (
                        <span hidden={errImagesMessage} className="text-[12px] text-red-500">
                          Yêu cầu nhập trường này
                        </span>
                      )}
                      <span className="text-[12px] text-red-500">{errImagesMessage}</span>
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Tiêu đề mô tả
                      </label>
                      <input
                        {...register('product_content', {
                          required: validate.required,
                          maxLength: 50,
                          minLength: 2
                        })}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        type="text"
                        id="product_content"
                        className={
                          errors?.product_content
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.product_content && errors?.product_content?.message}
                      </span>
                      <span className="text-[12px] text-red-500">
                        {errors?.product_content?.type === 'maxLength' && 'Kí tự tối đa là 50'}
                      </span>
                      <span className="text-[12px] text-red-500">
                        {errors?.product_content?.type === 'minLength' && 'Kí tự tối thiểu là 2'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="cate"
                      >
                        Thương hiệu
                      </label>
                      <select
                        {...register('brand_id', {
                          required: validate.required,
                          validate: validate.validateSelectOption
                        })}
                        id="brand_id"
                        className={
                          errors?.brand_id
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      >
                        <option value="">Thương hiệu</option>
                        {props.brands?.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.brand_name}
                          </option>
                        ))}
                      </select>
                      <span className="text-[12px] text-red-500">
                        {errors?.category_id && errors?.category_id?.message}
                      </span>
                    </div>
                  </div>
                  <div className="mt-[15px] mb-4 flex flex-col">
                    <label className="mr-4 mb-2 inline-block font-bold text-gray-700">Mô tả</label>
                    {/* <textarea {...register("desc", { required: true })} id="desc" className="border bg-gray-100 py-2 px-4 w-full h-40 outline-none focus:ring-2 focus:ring-indigo-400 rounded resize-none"></textarea> */}

                    <CKEditor
                      editor={ClassicEditor}
                      onChange={async (event, editor) => {
                        const data = editor.getData();
                        await setDescription(data);
                      }}
                      data={isEdit ? detailItem?.product_description : ''}
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
    </Fragment>
  );
};

export default FormProduct;
