import { Fragment, useState, useEffect, memo } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { newSocket, sortText, notifyDefault } from 'Utils/Utils';
import { rooms, socket } from 'Features/type/notification';
import { notiSTT } from 'Features/type/notification';

const NotificationAdmin = (props) => {
  const id = props.open ? 'simple-popover' : undefined;
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    newSocket.emit(socket[0], rooms[3]);
    newSocket.on(socket[3], (data) => {
      setNoti(() => {
        const notiArrType0 = [];
        const notiArrType1 = [];
        data.forEach((element) => {
          if (element.status === Number(Object.keys(notiSTT)[0])) {
            notiArrType0.push(element);
          }
          if (element.status === Number(Object.keys(notiSTT)[1])) {
            notiArrType1.push(element);
          }
        });
        return [...notiArrType0, ...notiArrType1];
      });
      setCountNoti(data);
    });
    return () => {
      setNoti([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSocket, props]);

  function setCountNoti(noti) {
    let count = 0;
    noti.forEach((element) => {
      if (element.status === Number(Object.keys(notiSTT)[0])) {
        count++;
      }
    });
    props.setCountNoti(count);
  }

  function handleClick(id) {
    newSocket.emit(socket[0], rooms[7], id);
    notifyDefault('Đã được đánh dấu đã đọc', 'success');
  }

  return (
    <Fragment>
      <Popover
        sx={{ mt: 4 }}
        id={id}
        open={props.open}
        anchorEl={props.anchorEl}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Typography component="div" className="relative h-[350px] w-[450px]  p-0" sx={{}}>
          {noti.length !== 0 ? (
            <div className="header border-[rgb(229, 231, 235,0.3)] sticky  top-0 block border-b-2 border-solid bg-white p-3 text-lg font-bold shadow-md">
              Thông báo mới nhận
            </div>
          ) : (
            ''
          )}
          <div className="content overflow-x-auto overflow-y-auto">
            {noti.length !== 0 ? (
              noti.map((item, index) => {
                return (
                  <div
                    onClick={() => handleClick(item._id)}
                    key={index}
                    className={
                      item.status === Number(Object.keys(notiSTT)[0]) ? 'bg-red-100' : ' shadow-xl '
                    }
                  >
                    <div className="item border-[rgb(229, 231, 235)] flex cursor-pointer gap-5 border-b-2 border-solid px-[8px] py-[5px] hover:bg-[rgb(248,248,248,0.9)] ">
                      <div className="img my-4">
                        <img className="h-[40px] w-[40px]" src={item.photo} alt="notification" />
                      </div>
                      <div className="content">
                        <span className=" block text-xl font-bold">
                          {sortText(item.title, 0, 30)}
                        </span>
                        <span className=" block text-sm">{sortText(item.content, 0, 70)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className=" absolute top-1/2 left-1/2 block translate-x-[-50%] text-center text-xl text-gray-500">
                Không có thông báo mới
              </div>
            )}
          </div>
          {noti.length > 3 ? (
            <div className="border-[rgb(229, 231, 235,0.3)] sticky bottom-0  w-full  border-t-[1px] border-solid bg-white p-3  text-center">
              <Link to="/admin" className="hover:text-blue-400">
                Xem tất cả
              </Link>
            </div>
          ) : (
            ''
          )}
        </Typography>
      </Popover>
    </Fragment>
  );
};

export default memo(NotificationAdmin);
