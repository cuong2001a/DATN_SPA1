import { Dialog } from '@headlessui/react';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import { treatmentSTT } from 'Features/type/enumStatus';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Loading from 'Utils/Loading/Loading';
import { useDispatch } from 'react-redux';
import { UpdateAppointmentTreatment } from 'Features/Slice/Treatment/AppointmentTreatmentSlice';
import { notifyError, notifySuccess } from 'Utils/Utils';

const EditAppointmentTreatment = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [statusAll, setStatusAll] = useState([]);

  useEffect(() => {
    reset({
      name: props.data.customer_id.customer_name,
      treatment: props.data.treatment_id.treatment_name,
      note: props.data.note
    });
    handleStatus();
    return () => setStatusAll([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, reset]);

  function handleStatus() {
    Object.keys(treatmentSTT).forEach((key, index) => {
      if (
        Number(key) !== Number(props.data.status) &&
        Number(key) > Number(props.data.status) &&
        Number(key) !== Number(Object.keys(treatmentSTT)[3])
      ) {
        setStatusAll((pre) => [...pre, key]);
      }
    });
  }

  async function onSubmit(data) {
    const { status, note } = data;
    const total = {
      status,
      note,
      id: props.data._id
    };
    setIsLoading(true);
    try {
      await dispatch(UpdateAppointmentTreatment(total));
      notifySuccess('Cập nhập thành công');
    } catch (error) {
      notifyError('Cập nhập thất bại');
    }
    props.closeModal();
    setIsLoading(false);
  }

  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            opacity: 0.3,
            backgroundColor: 'black'
          }}
        ></div>
        <section className="relative flex w-1/2 justify-center lg:h-screen lg:items-center">
          <div className="w-full rounded-md bg-gradient-to-b from-sky-400 to-sky-200 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg pb-5 text-center">
              <h1 className="font-nunito text-2xl font-bold sm:text-3xl">Cập nhập liệu trình</h1>
            </div>
            <div className="mt-10 sm:mt-0">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Khách hàng
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            {...register('name', {
                              disabled: true
                            })}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Liệu trình
                          </label>
                          <input
                            type="text"
                            name="treatment"
                            id="treatment"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            maxLength={10}
                            {...register('treatment', {
                              disabled: true
                            })}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label htmlFor="" className="block text-sm font-medium text-gray-700">
                            Trạng thái
                          </label>
                          <select
                            {...register('status', { disabled: true })}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          >
                            <option value={props.data.status}>
                              {treatmentSTT[props.data.status]}
                            </option>
                            {statusAll &&
                              statusAll.map((item, index) => {
                                return (
                                  <option key={index} value={item}>
                                    {treatmentSTT[item]}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Ghi chú
                          </label>
                          <textarea
                            {...register('note')}
                            cols="30"
                            rows="3"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <ButtonComponent
                        type="submit"
                        config="inline-flex justify-center"
                        mes="Cập nhập liệu trình"
                      />

                      <ButtonComponent
                        config="inline-flex justify-center"
                        mes=" Trở lại"
                        callBack={props.closeModal}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Dialog>
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default EditAppointmentTreatment;
