import LoginWithFacebook from '../../../Auth/Page/LoginWithFacebook';
import LoginWithGoogle from '../../../Auth/Page/LoginWithGoogle';
import LoginWithNumberPhone from '../../../Auth/Page/LoginWithNumberPhone';
import { Dialog } from '@headlessui/react';
import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { getPermission } from 'Utils/Utils';
import { userRole } from 'Features/type/enumUser';
import { LOGO } from 'Constants';

const SignIn = (props) => {
  const history = useHistory();
  function routerTo() {
    if (getPermission() !== Number(Object.keys(userRole)[4])) {
      history.push('/admin');
    }
  }
  return (
    <Fragment>
      <Dialog
        open={props.isOpen}
        onClose={props.setIsOpen}
        className="fixed inset-0 z-50 flex h-screen items-center justify-center"
      >
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100%',
            backgroundColor: 'rgb(199, 194, 201)',
            opacity: 0.5
          }}
        ></div>

        <div className="relative mx-auto flex max-h-screen flex-wrap items-center font-nunito sm:justify-center">
          <button
            onClick={props.closeModal}
            type="button"
            className="absolute top-2 right-2 z-40 rounded-full stroke-black text-4xl font-bold"
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
          <div className="relative h-full w-full sm:max-w-7xl ">
            <div className="relative h-full w-full rounded-3xl bg-gradient-to-r from-rose-100 to-teal-100 px-6 py-4 shadow-md">
              <img className="mx-auto -mb-5" src={LOGO} alt="" />
              <section className="my-7">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <LoginWithFacebook routerTo={routerTo} closeModal={props.closeModal} />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <LoginWithGoogle routerTo={routerTo} closeModal={props.closeModal} />
                  </div>
                </div>
                <div className="mt-7 flex items-center text-center">
                  <hr className="border-1 w-full rounded-md border-gray-300" />
                  <label className="block w-full text-sm font-medium text-gray-600">Hoặc</label>
                  <hr className="border-1 w-full rounded-md border-gray-300" />
                </div>
                <div className="group">
                  <LoginWithNumberPhone routerTo={routerTo} closeModal={props.closeModal} />
                </div>
              </section>
            </div>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default SignIn;
