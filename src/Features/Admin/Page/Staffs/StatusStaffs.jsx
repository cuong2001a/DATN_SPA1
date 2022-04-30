import { Fragment, useState, useEffect } from 'react';
import { staffSTT } from 'Features/type/enumStatus';

const StatusStaffs = (props) => {
  const [status, setStatus] = useState([]);
  useEffect(() => {
    for (let key in staffSTT) {
      if (Number(key) !== props.status) {
        setStatus((prevState) => [...prevState, key]);
      }
    }
    return () => setStatus([]);
  }, [props]);

  return (
    <Fragment>
      <div className="invisible absolute top-14 z-50 w-44 translate-y-full list-none divide-y divide-gray-100 rounded  bg-white text-left text-base opacity-0 shadow-xl transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-95 ">
        {status &&
          status.map((item, index) => {
            return (
              <ul key={index} className="py-1">
                <li className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-green-100  ">
                  <span className="hover:text-green-800">{staffSTT[item]}</span>
                </li>
              </ul>
            );
          })}
      </div>
    </Fragment>
  );
};

export default StatusStaffs;
