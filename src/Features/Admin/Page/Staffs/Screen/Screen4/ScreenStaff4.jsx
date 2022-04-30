import { pathSlug } from 'Features/type/enumUser';
import { lazy, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ScreenProfile from '../Profile/ScreenProfile';
const StaffSchedule = lazy(() =>
  import('../../../../Components/Components/Schedule/StaffSchedule')
);
const Customers = lazy(() => import('Features/Admin/Page/Customers/Customers'));
const Appointment = lazy(() => import('Features/Admin/Page/Appointment/Appointment'));

const ScreenStaff4 = (props) => {
  let { slug: key } = useParams();
  const [layout, setLayout] = useState();

  useEffect(() => {
    switchScreen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, props]);

  function switchScreen() {
    switch (key) {
      case pathSlug['work']:
        setLayout(<StaffSchedule role={props.role} id={props.id} />);
        break;
      case pathSlug['profile']:
        setLayout(<ScreenProfile role={props.role} id={props.id} />);
        break;
      case pathSlug['customer']:
        setLayout(<Customers />);
        break;
      case pathSlug['appointment']:
        setLayout(<Appointment />);
        break;
      default:
        break;
    }
  }
  return <div>{layout}</div>;
};

export default ScreenStaff4;
