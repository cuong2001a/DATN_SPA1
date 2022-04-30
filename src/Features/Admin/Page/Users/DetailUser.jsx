import { Fragment } from 'react';
import { Dialog } from '@headlessui/react';
import { userRole } from 'Features/type/enumUser';

const DetailUser = (props) => {
  const { data } = props;
  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 overflow-y-auto pt-[25vh]"
      >
        <div
          onClick={props.closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            backgroundColor: 'rgb(199, 194, 201)',
            opacity: 0.7
          }}
        ></div>
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
                  data.photoURL ||
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
                  <span>Họ và tên:</span> <span className="mx-4 capitalize">{data.name}</span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Số điện thoại:</span>
                  <span className="mx-4 ">{data?.phoneNumber || 'Chưa cập nhập'}</span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Chức vụ :</span>
                  <span className="mx-4 capitalize">{userRole[data.role]}</span>
                </p>
              </div>
              <div className="flex justify-between border-b px-2 py-2">
                <p className="flex text-gray-700">
                  <svg className="mx-2 w-2 text-gray-500" viewBox="0 0 8 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span>Email:</span> <span className="mx-4">{data.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default DetailUser;
