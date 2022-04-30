import { Fragment, useState, useEffect, memo } from 'react';
import { customersSTT } from 'Features/type/enumStatus';
import { useDispatch } from 'react-redux';
import { notifySuccess, notifyError } from 'Utils/Utils';
import { UpdateCustomer } from 'Features/Slice/Customer/CustomerSlice';
import Loading from 'Utils/Loading/Loading';

const StatusCustomer = (props) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState([]);
  const [isLoading, seIsLoading] = useState(false);

  useEffect(() => {
    for (let key in customersSTT) {
      setStatus((prevState) => {
        return [...prevState, key];
      });
    }
    return () => setStatus([]);
  }, [props]);

  async function handleChangeStatus(status) {
    seIsLoading(true);
    try {
      await dispatch(UpdateCustomer({ id: props.id, status: status }));
      notifySuccess('Cập nhật trạng thái thành công');
    } catch (error) {
      notifyError('Cập nhật trạng thái thất bại');
    }
    seIsLoading(false);
  }
  return (
    <Fragment>
      <div className="invisible absolute top-14 z-50 w-44 translate-y-full list-none divide-y divide-gray-100 rounded  bg-white text-left text-base opacity-0 shadow-xl transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-95 ">
        {status &&
          status?.map((item, index) => {
            return (
              <ul key={index} onClick={() => handleChangeStatus(item)} className="py-1">
                <li className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-green-100  ">
                  <span className="hover:text-green-800">{customersSTT[item]}</span>
                </li>
              </ul>
            );
          })}
      </div>
      {isLoading && <Loading />}
    </Fragment>
  );
};

export default memo(StatusCustomer);
