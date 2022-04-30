import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListOrder } from 'Features/Slice/Order/OrderSlice';
import DetailOrder from './DetailOrder';
import ListOrderTable from './ListOrder';
const Order = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [detailItem, setDetailItem] = useState({});
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order.current);
  function closeModal() {
    setIsOpen(false);
  }

  // useEffect(() => {
  //   dispatch(ListOrder());
  // }, [order]);

  return (
    <div>
      <Fragment>
        <div className="flex flex-col gap-5 ">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h3>
          </div>
          <DetailOrder
            setDetailItem={setDetailItem}
            detailItem={detailItem}
            closeModal={closeModal}
            isOpen={isOpen}
          />
          <ListOrderTable setDetailItem={setDetailItem} order={order} setIsOpen={setIsOpen} />
        </div>
      </Fragment>
    </div>
  );
};

export default Order;
