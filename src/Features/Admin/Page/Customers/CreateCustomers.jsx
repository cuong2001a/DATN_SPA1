import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { notifyError, notifySuccess } from 'Utils/Utils';
import { validate } from 'Constants/index.js';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { createCustomer } from 'Services/customer';
import Loading from 'Utils/Loading/Loading';
import { ListCustomer } from 'Features/Slice/Customer/CustomerSlice';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const CreateCustomers = (props) => {
  const dispatch = useDispatch();
  const [isLoading, seIsLoading] = useState(false);
  const [description, setDescription] = useState('');

  const handaleOnSubmit = async (data) => {
    try {
      seIsLoading(true);
      let dataCreate = {
        customer_name: data?.name,
        customer_email: data?.email,
        customer_phone: data?.phone,
        customer_address: data?.address,
        customer_birth: data?.birth,
        customer_description: description,
        customer_gender: data?.gender === '0' ? 0 : data?.gender === '1' && 1,
        status: 0
      };

      await createCustomer(dataCreate);
      props.closeModal();
      props.reset();
      setDescription('');
      dispatch(ListCustomer([dataCreate]));
      seIsLoading(false);
      notifySuccess('Thêm mới thành công');
    } catch (error) {
      seIsLoading(false);
      notifyError('Thêm mới thất bại');
    }
  };

  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-40 overflow-y-auto" onClose={props.closeModal}>
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
                <h3 className="mb-2 text-2xl font-bold text-gray-700">Tạo mới khách hàng</h3>
              </div>
              <form className="m-5 bg-white p-5" onSubmit={props.handleSubmit(handaleOnSubmit)}>
                <div>
                  <div className="grid grid-cols-2 grid-rows-3 gap-[15px]">
                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="name"
                      >
                        Tên *
                      </label>
                      <input
                        {...props.register('name', {
                          required: validate.required,
                          validate: validate.validateName
                        })}
                        type="text"
                        id="name"
                        className={
                          props.errors?.name
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {props.errors?.name && props.errors?.name?.message}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        {...props.register('email', {
                          validate: validate.validateEmail
                        })}
                        type="text"
                        id="email"
                        className={
                          props.errors?.email
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {props?.errors?.email && props?.errors?.email?.message}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="phone"
                      >
                        Số điện thoại *
                      </label>
                      <input
                        {...props.register('phone', {
                          required: validate.required,
                          validate: validate.validatePhone
                        })}
                        type="tel"
                        id="phone"
                        className={
                          props?.errors?.phone
                            ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
                            : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                      <span className="text-[12px] text-red-500">
                        {props?.errors?.phone && props?.errors?.phone?.message}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="address"
                      >
                        Địa chỉ
                      </label>
                      <input
                        {...props.register('address')}
                        type="text"
                        id="address"
                        className={
                          'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="birth"
                      >
                        Ngày sinh
                      </label>
                      <input
                        {...props.register('birth')}
                        type="date"
                        id="birth"
                        className={
                          'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
                        }
                      />
                    </div>

                    <div className="flex flex-col">
                      <label
                        className="mr-4 mb-2 inline-block font-bold text-gray-700"
                        htmlFor="gender"
                      >
                        Giới tính
                      </label>
                      <div className="flex h-[42px] items-center justify-center gap-[30px]">
                        <div className="flex items-center justify-center gap-[10px]">
                          <input
                            {...props.register('gender')}
                            type="radio"
                            id="gender_boy"
                            name="gender"
                            value={0}
                            className={
                              'cursor-pointer border-gray-500 bg-gray-100 p-3 outline-none'
                            }
                          />
                          <label
                            className="inline-block cursor-pointer font-semibold text-gray-700"
                            htmlFor="gender_boy"
                          >
                            Nam
                          </label>
                        </div>
                        <div className="flex items-center justify-center gap-[10px]">
                          <input
                            {...props.register('gender')}
                            type="radio"
                            id="gender_girl"
                            name="gender"
                            value={1}
                            className={
                              'cursor-pointer border-gray-500 bg-gray-100 p-3 outline-none'
                            }
                          />
                          <label
                            className="inline-block cursor-pointer font-semibold text-gray-700"
                            htmlFor="gender_girl"
                          >
                            Nữ
                          </label>
                        </div>
                      </div>
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
                  />
                </div>

                <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <ButtonComponent
                    type="submit"
                    mes="Thêm mới"
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
        {isLoading && <Loading />}
      </Dialog>
    </Transition>
  );
};

export default CreateCustomers;
