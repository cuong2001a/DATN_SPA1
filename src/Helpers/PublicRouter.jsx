import NavBottom from 'Features/Client/Components/Component/NavBottom/NavBottom';
import { CartByUser } from 'Features/Slice/Cart/CartSlice';
import { OrderByUser } from 'Features/Slice/Order/OrderSlice';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { cartByUser, createCart } from 'Services/cart';
import { getId, getPhoneNumber, getTotalItemOnCart } from 'Utils/Utils';
import Footer from './../Features/Client/Components/Footer/Footer';
import MenuSub from 'Features/Client/Components/Component/MenuSub/MenuSub';
import { useLocation } from 'react-router-dom';
import HeaderShow from './../Features/Client/Components/Header/HeaderShow';
import { ListAppointmentByPhone } from 'Features/Slice/Appointment/AppointmentSlice';

const PublicRouter = ({ ...rest }) => {
  const dispatch = useDispatch();
  const currentCart = useSelector((state) => state.cart.current);
  const user = useSelector((state) => state.auth.current);
  const [userId, setUserId] = useState();
  const [userPhone, setUserPhone] = useState();
  const location = useLocation();
  const [displayMenu, setDisplayMenu] = useState(true);

  useEffect(() => {
    if (location.pathname.includes('appointment')) setDisplayMenu(false);
  }, [location]);

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setUserId(user._id);
    } else if (getId() !== null) {
      setUserId(getId());
    } else {
      setUserId(undefined);
    }

    if (Object.keys(user).length !== 0) {
      let phoneNumberUser = user.phoneNumber;
      phoneNumberUser = phoneNumberUser?.replace('+84', '0');
      setUserPhone(phoneNumberUser);
    } else if (getPhoneNumber() !== null) {
      let phoneNumberUser = getPhoneNumber();
      phoneNumberUser = phoneNumberUser?.replace('+84', '0');
      setUserPhone(phoneNumberUser);
    } else {
      setUserPhone(undefined);
    }
  }, [user]);

  useEffect(() => {
    getCart();
    getOrders();
    getAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getCart = async () => {
    if (userId) {
      try {
        const { data } = await cartByUser(userId);
      } catch (error) {
        await createCart({
          user_id: userId
        });
      }
      dispatch(CartByUser(userId));
      getTotalItemOnCart();
    }
  };

  const getOrders = () => {
    if (userId) {
      dispatch(OrderByUser(userId));
    }
  };
  const getAppointments = () => {
    if (userPhone) {
      dispatch(ListAppointmentByPhone(userPhone));
    }
  };

  return (
    <Fragment>
      <div className="overflow-hidden">
        <HeaderShow />
        <Route {...rest} />
        <NavBottom />
        {displayMenu && <MenuSub />}
        <Footer />
      </div>
    </Fragment>
  );
};

export default PublicRouter;
