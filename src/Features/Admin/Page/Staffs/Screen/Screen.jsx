import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userRole } from 'Features/type/enumUser';
import { Link } from 'react-router-dom';
import ScreenTab1 from './Screen1/ScreenTab1';
import ScreenTab3 from './Screen3/ScreenTab3';
import ScreenTab4 from './Screen4/ScreenTab4';

const Screen = () => {
  const staffs = useSelector((state) => state.staff.current);
  const [role1, setRole1] = useState([]);
  const [role3, setRole3] = useState([]);
  const [role4, setRole4] = useState([]);

  useEffect(() => {
    if (staffs?.length > 0) {
      staffs.forEach((element) => {
        if (Number(element.user_id.role) === Number(Object.keys(userRole)[1])) {
          setRole1((prevState) => [...prevState, element]);
        } else if (Number(element.user_id.role) === Number(Object.keys(userRole)[2])) {
          setRole3((prevState) => [...prevState, element]);
        } else if (Number(element.user_id.role) === Number(Object.keys(userRole)[3])) {
          setRole4((prevState) => [...prevState, element]);
        }
      });
    }
    return () => {
      setRole1([]);
      setRole3([]);
      setRole4([]);
    };
  }, [staffs]);
  return (
    <div className="flex flex-col gap-5">
      <ul
        className=" nav nav-justified nav-tabs flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
        id="tabs-tabJustify"
        role="tablist"
      >
        <li className="nav-item flex-grow text-center" role="presentation">
          <Link
            to="#tabs-saleAgent"
            className="nav-link active my-2 block w-full border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 font-nunito text-base font-semibold uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-sale-agent"
            data-bs-toggle="pill"
            role="tab"
            aria-controls="tabs-saleAgent"
            aria-selected="false"
          >
            Nhân viên bán hàng
          </Link>
        </li>

        <li className="nav-item flex-grow text-center" role="presentation">
          <Link
            to="#tabs-serviceStaff"
            className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 font-nunito text-base font-semibold uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-service-staff"
            data-bs-toggle="pill"
            role="tab"
            aria-controls="tabs-serviceStaff"
            aria-selected="false"
          >
            Nhân viên dịch vụ
          </Link>
        </li>
        <li className="nav-item flex-grow text-center" role="presentation">
          <Link
            to="#tabs-receptionists"
            className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 font-nunito text-base font-semibold uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-receptionists-staff"
            data-bs-toggle="pill"
            data-bs-target="#tabs-receptionists"
            role="tab"
            aria-controls="tabs-receptionists"
            aria-selected="false"
          >
            Nhân viên lễ tân
          </Link>
        </li>
      </ul>
      <div className="tab-content" id="tabs-tabContentJustify">
        <div
          className="active show tab-pane fade"
          id="tabs-saleAgent"
          role="tabpanel"
          aria-labelledby="tabs-sale-agent"
        >
          <ScreenTab1 data={role1} />
        </div>

        <div
          className="fade tab-pane"
          id="tabs-serviceStaff"
          role="tabpanel"
          aria-labelledby="tabs-service-staff"
        >
          <ScreenTab3 data={role3} />
        </div>
        <div
          className="fade tab-pane"
          id="tabs-receptionists"
          role="tabpanel"
          aria-labelledby="tabs-receptionists-staff"
        >
          <ScreenTab4 data={role4} />
        </div>
      </div>
    </div>
  );
};

export default Screen;
