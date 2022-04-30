import { Fragment, useState, useEffect } from 'react';
import { orderSTT } from 'Features/type/enumStatus';
import { confirmAlert } from 'react-confirm-alert';
import { readOrder } from 'Services/order';
import { useDispatch } from 'react-redux';
import { UpdateOrder } from 'Features/Slice/Order/OrderSlice';

const RoleOrder = (props) => {
  const [roles, setRoles] = useState([]);
  const [itemOrder, setItemOrder] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    for (let key in orderSTT) {
      if (Number(key) > props.role) {
        setRoles((prevState) => [...prevState, key]);
      }
    }
    return () => setRoles([]);
  }, [props]);

  useEffect(async () => {
    if (props.id) {
      const { data } = await readOrder(props.id);
      setItemOrder(data);
    }
  }, [props.id]);

  const confirmUpdate = (item) => {
    confirmAlert({
      title: 'Bạn có chắc muốn thay đổi trang thái đơn hàng?',
      buttons: [
        {
          label: 'Thay đổi',
          onClick: () => {
            const updateData = {
              ...itemOrder,
              status: Number(item)
            };
            dispatch(UpdateOrder(updateData));
            props.setIsLoading(true);
          }
        },
        {
          label: 'Trở lại'
        }
      ]
    });
  };
  return (
    <Fragment>
      <div className=" invisible absolute  z-50 w-full translate-y-full list-none divide-y divide-gray-100  rounded bg-white text-base opacity-0 shadow-xl transition duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-95 ">
        {roles &&
          roles.map((item, index) => {
            return (
              <ul onClick={() => confirmUpdate(item)} key={index} className="py-1">
                <li className="block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-green-100  ">
                  <span className="hover:text-green-800">{orderSTT[item]}</span>
                </li>
              </ul>
            );
          })}
      </div>
    </Fragment>
  );
};

export default RoleOrder;
