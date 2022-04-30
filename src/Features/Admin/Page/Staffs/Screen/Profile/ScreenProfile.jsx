import { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InformationStaff from './InformationStaff/InformationStaff';
import SaleDetailsStaff from '../Profile/SaleDetailsStaff/SaleDetailsStaff';
import ServiceDetailsStaff from '../Profile/ServiceDetailsStaff/ServiceDetailsStaff';
import ReceptionistStaff from '../Profile/ReceptionistStaff/ReceptionistStaff';
import { userRole } from 'Features/type/enumUser';

const ScreenProfile = (props) => {
  const [layout, setLayout] = useState('');

  useEffect(() => {
    switch (Number(props.role)) {
      case Number(Object.keys(userRole)[1]):
        setLayout(<SaleDetailsStaff role={props.role} id={props.id} />);
        break;

      case Number(Object.keys(userRole)[2]):
        setLayout(<ServiceDetailsStaff role={props.role} id={props.id} />);
        break;
      default:
        setLayout(<ReceptionistStaff role={props.role} id={props.id} />);
        break;
    }
  }, [props]);
  return (
    <Fragment>
      <div className="flex flex-col gap-5">
        <ul
          className=" nav nav-justified nav-tabs flex list-none flex-col flex-wrap border-b-0 pl-0 md:flex-row"
          id="tabs-tabJustify"
          role="tablist"
        >
          <li className="nav-item flex-grow text-center" role="presentation">
            <Link
              to="#tabs-informationStaff"
              className="nav-link active my-2 block w-full border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 font-nunito text-base font-semibold uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent"
              id="tabs-information-staff"
              data-bs-toggle="pill"
              role="tab"
              aria-controls="tabs-informationStaff"
              aria-selected="false"
            >
              Thông tin chung
            </Link>
          </li>
          <li className="nav-item flex-grow text-center" role="presentation">
            <Link
              to="#tabs-careerDetailsStaff"
              className="nav-link my-2 block w-full border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 font-nunito text-base font-semibold uppercase leading-tight hover:border-transparent hover:bg-gray-100 focus:border-transparent"
              id="tabs-career-details-staff"
              data-bs-toggle="pill"
              data-bs-target="#tabs-careerDetailsStaff"
              role="tab"
              aria-controls="tabs-careerDetailsStaff"
              aria-selected="false"
            >
              Chi tiết
            </Link>
          </li>
        </ul>
        <div className="tab-content" id="tabs-tabContentJustify">
          <div
            className="active show tab-pane fade"
            id="tabs-informationStaff"
            role="tabpanel"
            aria-labelledby="tabs-information-staff"
          >
            <InformationStaff />
          </div>
          <div
            className="fade tab-pane"
            id="tabs-careerDetailsStaff"
            role="tabpanel"
            aria-labelledby="tabs-career-details-staff"
          >
            {layout}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ScreenProfile;
