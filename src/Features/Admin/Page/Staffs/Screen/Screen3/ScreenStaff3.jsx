import { lazy, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { pathSlug } from 'Features/type/enumUser';
import ScreenProfile from '../Profile/ScreenProfile';

const StaffSchedule = lazy(() =>
  import('../../../../Components/Components/Schedule/StaffSchedule')
);

const ScreenStaff3 = (props) => {
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
      default:
        break;
    }
  }
  return <div>{layout}</div>;
};

export default ScreenStaff3;
