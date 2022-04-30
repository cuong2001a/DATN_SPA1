import { userRole } from 'Features/type/enumUser';
import { useSelector } from 'react-redux';
import { useEffect, useState, lazy } from 'react';
import { getId } from 'Utils/Utils';
const Screen = lazy(() => import('Features/Admin/Page/Staffs/Screen/Screen'));
const ScreenStaff1 = lazy(() => import('Features/Admin/Page/Staffs/Screen/Screen1/ScreenStaff1'));
const ScreenStaff3 = lazy(() => import('Features/Admin/Page/Staffs/Screen/Screen3/ScreenStaff3'));
const ScreenStaff4 = lazy(() => import('Features/Admin/Page/Staffs/Screen/Screen4/ScreenStaff4'));

const Staffs = () => {
  const [layout, setLayout] = useState();
  const user = useSelector((state) => state.user.current);

  useEffect(() => {
    return new Promise((resolve) => {
      user.forEach((element) => {
        if (element._id === getId()) {
          resolve({
            id: element._id,
            role: element.role
          });
        }
      });
    }).then((data) => switchScreen(data.id, data.role));
  }, [user]);

  function switchScreen(id, role) {
    switch (Number(role)) {
      case Number(Object.keys(userRole)[1]):
        setLayout(<ScreenStaff1 id={id} role={role} />);
        break;

      case Number(Object.keys(userRole)[2]):
        setLayout(<ScreenStaff3 id={id} role={role} />);
        break;
      case Number(Object.keys(userRole)[3]):
        setLayout(<ScreenStaff4 id={id} role={role} />);
        break;
      default:
        setLayout(<Screen />);
        break;
    }
  }
  return <div>{layout}</div>;
};

export default Staffs;
