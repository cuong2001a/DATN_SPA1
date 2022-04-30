import { Fragment, useState, useEffect } from 'react';
import { userRole } from 'Features/type/enumUser';

const RoleStaffs = (props) => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    for (let key in userRole) {
      if (Number(key) !== props.role) {
        setRoles((prevState) => [...prevState, key]);
      }
    }
    return () => setRoles([]);
  }, [props]);
  return (
    <Fragment>
      <div className=" invisible absolute top-14 z-50 w-40 translate-y-full list-none divide-y divide-gray-100  rounded bg-white text-base opacity-0 shadow-xl transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-95 ">
        {roles &&
          roles.map((item, index) => {
            return (
              <ul key={index} className="py-1">
                <li className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-green-100  ">
                  <span className="hover:text-green-800">{userRole[item]}</span>
                </li>
              </ul>
            );
          })}
      </div>
    </Fragment>
  );
};

export default RoleStaffs;
