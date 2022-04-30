import { lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { pathSlug } from 'Features/type/enumUser';
const StaffSchedule = lazy(() =>
  import('Features/Admin/Components/Components/Schedule/StaffSchedule')
);
const Product = lazy(() => import('Features/Admin/Page/Products/Product'));
const Order = lazy(() => import('Features/Admin/Page/Orders/Order'));
const ScreenProfile = lazy(() => import('Features/Admin/Page/Staffs/Screen/Profile/ScreenProfile'));

const ScreenStaff1 = (props) => {
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
      case pathSlug['product']:
        setLayout(<Product />);
        break;
      case pathSlug['order']:
        setLayout(<Order />);
        break;
      default:
        break;
    }
  }
  return <div>{layout}</div>;
};

export default ScreenStaff1;
