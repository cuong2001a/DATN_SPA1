import { Dialog, Transition } from '@headlessui/react';
import { FirebaseUploadMultiple } from 'Helpers/FirebaseUpload';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { validate } from 'Constants/index.js';
import { notifyError } from 'Utils/Utils';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreateBlog, UpdateBlog } from 'Features/Slice/Blog/BlogSlice';
import Loading from 'Utils/Loading/Loading';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const FormBlog = (props) => {
  const { isOpen, setIsOpen, closeModal, blog, isEdit, setIsEdit, detailItem } = props;
  const dispatch = useDispatch();
  const [filesImg, setFilesImg] = useState([]);
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
    try {
      setIsLoading(true);
      if (value?.album.length === 0) {
        const Editdata = {
          ...detailItem,
          ...value,
          album: detailItem?.album
        };
        dispatch(UpdateBlog(Editdata));
        closeModal();
        setFilesImg([]);
        reset();
      } else {
        const imageService = await FirebaseUploadMultiple(filesImg.map((item) => item.file));
        const Editdata = {
          ...detailItem,
          ...value,
          album: imageService
        };
        dispatch(UpdateBlog(Editdata));
        closeModal();
        setFilesImg([]);
        reset();
      }
    } catch (error) {
      notifyError(error);
    }
    setIsLoading(false);
  };

  // //tạo sản phẩm
  const handleOnSubmit = async (value) => {
    try {
      await blog?.map((item) => {
        if (item?.title === value?.title) {
          throw new 'Tên tiêu đề bị trùng. Vui lòng nhập lại tiêu đề bài viết !'();
        }
      });
      setIsLoading(true);
      const imageProduct = await FirebaseUploadMultiple(filesImg.map((item) => item.file));
      let dataCreate = {
        content: content,
        ...value,
        album: imageProduct
      };
      dispatch(CreateBlog(dataCreate));
      props.closeModal();
      setFilesImg([]);
      reset('');
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
    setValue('title', detailItem?.title);
    setValue('description', detailItem?.description);
    setValue('author', detailItem?.author);
    setValue('active', detailItem?.active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailItem]);

  useEffect(() => {
    setName((prev) => prev.trimLeft().replace(/\s{2,}/g, ' '));
    setContent((prev) => prev.trimLeft().replace(/\s{2,}/g, ' '));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, content]);

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
                    {isEdit ? 'Sửa bài viết' : 'Thêm bài viết'}{' '}
                  </h3>
                </div>
                <form
                  className="m-5 bg-white p-5"
                  onSubmit={handleSubmit(isEdit ? handleEditForm : handleOnSubmit)}
                >
                  <div className="grid grid-cols-2  gap-[15px]">
                    {/* tên bài viết */}
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Tên bài viết
                      </label>
                      <input
                        {...register('title', {
                          required: validate.required,
                          maxLength: 50,
                          minLength: 2
                        })}
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={
                          errors?.title
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.title && errors?.title?.message}
                      </span>
                      <span className="text-[12px] text-red-500">
                        {errors?.title?.type === 'maxLength' && 'Kí tự tối đa là 50'}
                      </span>
                      <span className="text-[12px] text-red-500">
                        {errors?.title?.type === 'minLength' && 'Kí tự tối thiểu là 2'}
                      </span>
                    </div>
                    {/* ảnh */}
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="image"
                      >
                        Ảnh
                      </label>
                      <input
                        {...register('album', { required: detailItem ? false : true })}
                        type="file"
                        multiple
                        onChange={handleChange}
                        id="album"
                        className={
                          errImages || errors.product_album
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      {detailItem !== null ? (
                        <div className="flex gap-5">
                          {detailItem?.album?.map((item, index) => {
                            return (
                              <div key={index} className="h-[50px] w-[50px]">
                                <img src={item} width="50px" height="50px" />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-2 flex flex-row gap-5 ">
                          <div className="flex h-[50px] w-[50px] gap-5 object-cover">
                            {filesImg &&
                              filesImg.map((item, index) => (
                                <img
                                  key={index}
                                  src={item.url}
                                  className="h-full w-full"
                                  alt="img_product"
                                />
                              ))}
                          </div>
                        </div>
                      )}
                      {errors.album && (
                        <span hidden={errImagesMessage} className="text-[12px] text-red-500">
                          Yêu cầu nhập trường này
                        </span>
                      )}
                      <span className="text-[12px] text-red-500">{errImagesMessage}</span>
                    </div>
                    {/* mô tả */}
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="description"
                      >
                        Mô tả
                      </label>
                      <input
                        {...register('description', {
                          required: true
                        })}
                        type="text"
                        id="description"
                        className={
                          errors?.description
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <div>
                        {errors?.description && errors.description.type === 'required' && (
                          <span className="text-[12px] text-red-500">Không được bỏ trường này</span>
                        )}
                      </div>
                    </div>
                    {/* tác giả */}
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Tên tác giả
                      </label>
                      <input
                        {...register('author', {
                          required: validate.required,
                          maxLength: 30,
                          minLength: 2
                        })}
                        type="text"
                        id="author"
                        className={
                          errors?.author
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {errors?.author && errors?.author?.message}
                      </span>
                      <span className="text-[12px] text-red-500">
                        {errors?.author?.type === 'maxLength' && 'Kí tự tối đa là 50'}
                      </span>
                      <span className="text-[12px] text-red-500">
                        {errors?.author?.type === 'minLength' && 'Kí tự tối thiểu là 2'}
                      </span>
                    </div>
                    {/* trạng thái */}
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Trạng thái
                      </label>
                      <div className="flex items-center justify-start gap-3">
                        <div className="flex-item">
                          <label htmlFor="Show">
                            Công khai
                            <input
                              className="ml-1"
                              type="radio"
                              name="status"
                              value={1}
                              checked
                              {...register('active')}
                            />
                          </label>
                        </div>
                        <div className="flex-item">
                          <label htmlFor="Show">
                            Ẩn danh
                            <input
                              className="ml-1"
                              type="radio"
                              name="status"
                              value={0}
                              {...register('active')}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[15px] mb-4 flex flex-col">
                    <label className="mr-4 mb-2 inline-block font-bold text-gray-700">
                      Nội dung
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={async (event, editor) => {
                        const data = editor.getData();
                        await setContent(data);
                      }}
                      data={isEdit ? detailItem?.content : ''}
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
export default FormBlog;
