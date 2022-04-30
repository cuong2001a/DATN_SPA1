import { Fragment, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { userRole } from 'Features/type/enumUser';
import { checkWorkSTT, staffSTT } from 'Features/type/enumStatus';
import Loading from 'Utils/Loading/Loading';
import { UpdateWorkdayHistory } from 'Features/Slice/WorkdayHistory/WorkdayHistorySlice';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { notifySuccess, notifyError } from 'Utils/Utils';

const CheckInOutStaff = (props) => {
  const dispatch = useDispatch();
  const { data } = props;
  const id = data._id;
  const [loading, setLoading] = useState(false);

  async function checkIn() {
    const data = {
      id,
      time_start: moment().format('YYYY-MM-DD'),
      type: Number(Object.keys(checkWorkSTT)[0]),
      workday_status: Number(Object.keys(staffSTT)[4])
    };
    setLoading(true);
    try {
      await dispatch(UpdateWorkdayHistory(data));
      notifySuccess('Check in thành công');
      props.closeModal();
    } catch (error) {
      notifyError('Check in thất bại');
    }
    setLoading(false);
  }
  async function checkOut() {
    const data = {
      id,
      time_end: moment().format('YYYY-MM-DD'),
      type: Number(Object.keys(checkWorkSTT)[1])
    };
    setLoading(true);
    try {
      await dispatch(UpdateWorkdayHistory(data));
      notifySuccess('Check out thành công');
      props.closeModal();
    } catch (error) {
      notifyError('Check out thất bại');
    }
    setLoading(false);
  }
  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 overflow-y-auto pt-[25vh]"
      >
        <div className="fixed top-0 left-0 h-[100%] w-[100vw] bg-gray-600 opacity-50"></div>
        <div className=" flex flex-wrap items-center justify-center font-nunito ">
          <div className="xl:w-2/7 easy-in-out container relative transform rounded-2xl bg-white shadow-lg duration-200 sm:w-full md:w-2/3 lg:w-2/6">
            <button
              onClick={props.closeModal}
              type="button"
              className="absolute -top-1 -right-1 z-40 rounded-full bg-white stroke-black p-1 text-4xl font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className=" h-32 overflow-hidden">
              <img
                className="w-full rounded-xl"
                src="https://thumbs.dreamstime.com/b/spa-background-spa-concept-white-stone-background-tropical-leaves-flowers-candle-zen-like-grey-stones-top-view-copy-space-187643849.jpg"
                alt=""
              />
            </div>
            <div className="-mt-12 flex justify-center  px-5">
              <img
                className="h-32 w-32 rounded-full bg-white bg-cover bg-center p-2"
                src={
                  data.staff_id.user_id.photoURL ||
                  'https://media.istockphoto.com/vectors/lotus-flower-sign-for-wellness-spa-and-yoga-vector-illustration-vector-id970778424?k=20&m=970778424&s=170667a&w=0&h=PPZpfUIRAyf5xvn84fpCMB1PuayeQ3QBi_lYydLElnY='
                }
                alt=""
              />
            </div>
            <div className="p-5 text-lg">
              <h3 className="text-center text-2xl">Thông tin nhân viên</h3>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Họ và tên:</span>{' '}
                  <span className="mx-4 capitalize">{data.staff_id.user_id.name}</span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Số điện thoại:</span>{' '}
                  <span className="mx-4 ">
                    {data.staff_id.user_id.phoneNumber || 'chưa cập nhật'}
                  </span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Chức vụ :</span>{' '}
                  <span className="mx-4 capitalize">{userRole[data.staff_id.user_id.role]}</span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Ngày:</span>{' '}
                  <span className="relative ml-2 inline-block py-1 px-2 font-semibold leading-tight text-green-900">
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded bg-green-200 opacity-50"
                    ></span>
                    <span className="relative">{data.day}</span>
                  </span>
                </p>
              </div>

              <div className="space-x-3 bg-gray-50 px-4 py-3 text-right sm:px-6">
                {data.type === Number(Object.keys(checkWorkSTT)[2]) ? (
                  <button
                    type="submit"
                    onClick={checkIn}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Điểm danh
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={checkOut}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Kết thúc
                  </button>
                )}

                <button
                  onClick={props.closeModal}
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Trở lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
      {loading && <Loading />}
    </Fragment>
  );
};

export default CheckInOutStaff;
