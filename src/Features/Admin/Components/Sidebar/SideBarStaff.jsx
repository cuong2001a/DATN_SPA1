import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userRole } from 'Features/type/enumUser';
import { lazy } from 'react';
import { LOGO } from 'Constants';
const Staff1 = lazy(() => import('../Components/RoleStaff/Staff1'));
const Staff3 = lazy(() => import('../Components/RoleStaff/Staff3'));
const Staff4 = lazy(() => import('../Components/RoleStaff/Staff4'));

const SideBarStaff = ({ sideBarOpen, staffId }) => {
  const [layout, setLayout] = useState('');

  useEffect(() => {
    siwtchStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffId]);

  function siwtchStaff() {
    switch (staffId) {
      case Number(Object.keys(userRole)[1]):
        // Nhân viên ban hàng
        setLayout(<Staff1 id={staffId} />);
        break;

      case Number(Object.keys(userRole)[2]):
        // Nhân viên dịch vụ
        setLayout(<Staff3 id={staffId} />);
        break;
      default:
        // Nhân viên lễ tân
        setLayout(<Staff4 id={staffId} />);
        break;
    }
  }
  return (
    <div>
      <div
        className={`${
          sideBarOpen ? 'fixed md:top-0 md:left-0' : 'fixed hidden md:top-0 md:left-0 lg:block'
        }`}
      >
        <Link
          to="/"
          className="absolute top-0 left-0 mb-8 flex h-20 w-full items-center border-b bg-[#002633] px-4"
        >
          <img className="mx-auto" src={LOGO} alt="logo" />
        </Link>
        <div className="scroll-custom-side-bar h-screen w-1/2 overflow-auto border-r bg-[#002633] px-4 pt-[100px] text-white md:w-64 lg:block lg:w-64">
          {layout}
        </div>
      </div>
    </div>
  );
};

export default SideBarStaff;
