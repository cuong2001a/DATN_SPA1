import NotificationStaff from '../Components/Notifications/NotificationStaff';
import NotificationAdmin from '../Components/Notifications/NotificationAdmin';
import { useState, useEffect } from 'react';
import { getPermission } from 'Utils/Utils';
import { userRole } from 'Features/type/enumUser';

const HeaderAdmin = ({ sideBarOpen, setSideBarOpen }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [countNoti, setCountNoti] = useState(0);
  const [role, setRole] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (getPermission() === Number(Object.keys(userRole)[0])) {
      setRole(true);
    }
    return () => {
      setRole(false);
    };
  }, []);

  return (
    <div className="sticky top-0 z-40">
      <div className="flex h-20 w-full items-center justify-between border-b border-gray-300 bg-gray-100 px-6 shadow-sm">
        <div className="flex">
          <div
            onClick={() => setSideBarOpen(!sideBarOpen)}
            className="mr-4 flex items-center lg:hidden"
          >
            <button className="navbar-burger hover:border-white hover:text-blue-500 focus:outline-none">
              <svg className="h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative flex items-center">
          <div className="relative">
            <svg
              onClick={handleClick}
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              className=" mr-3 cursor-pointer fill-current hover:text-[#e77d67]"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
            </svg>
            <span className="absolute -top-1 right-2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-red-500 p-2 text-[13px] text-white duration-500 group-hover:-translate-y-2">
              {countNoti}
            </span>
          </div>
          {role ? (
            <NotificationAdmin
              setCountNoti={setCountNoti}
              handleClose={handleClose}
              open={open}
              anchorEl={anchorEl}
            />
          ) : (
            <NotificationStaff
              setCountNoti={setCountNoti}
              handleClose={handleClose}
              open={open}
              anchorEl={anchorEl}
            />
          )}
          <div>
            <button
              type="button"
              className="flex rounded-full bg-gray-800 text-sm"
              id="user-menu-button"
            >
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
