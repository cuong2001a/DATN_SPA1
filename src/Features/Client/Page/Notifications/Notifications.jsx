import { Fragment, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { newSocket, getId } from 'Utils/Utils';
import { socket, rooms, notiSTT } from 'Features/type/notification';
import { orderSTT } from 'Features/type/enumStatus';
import { useSelector } from 'react-redux';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import BannerHome from 'Features/Client/Components/Header/Banner/BannerHome';
import HeaderTop from 'Features/Client/Components/Header/HeaderTop';
const Notifications = () => {
  const order = useSelector((item) => item.order.current);
  const user = sessionStorage.getItem('user');
  const [pageNumber, setPageNumber] = useState(0);
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(false);
  const newPerPage = 5;
  const pageVisited = pageNumber * newPerPage;
  const [noti, setNoti] = useState([]);
  const countPage = Math.ceil(noti?.length / newPerPage);

  useEffect(() => {
    setNoti(order);
  }, [noti]);
  useEffect(() => {
    newSocket.emit(socket[0], rooms[5], { id: getId() });
    newSocket.on(`${socket[1]}-${getId()}`, (data) => {
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
    });
    return () => {
      setNoti([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newSocket]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const changeShow = () => {
    setShow(!show);
  };
  const noNofication = () => {
    return (
      <div className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-center">
        <img
          src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/4cddac8a462d1f793ceb4194c08ef8ee.png"
          className="mx-auto h-[100px] w-[100px] object-contain "
          alt=""
        />
        <p>Chưa có thông báo nào</p>
      </div>
    );
  };
  return (
    <Fragment>
      <HeaderTop />
      <BannerHome />
      <div className="Nofications w-full bg-slate-100 py-5">
        <div className="container mx-auto px-4 lg:w-[1300px]">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-3 lg:col-span-2">
              <div className="user flex items-center justify-between">
                <div className="btn-dropdown block md:hidden">
                  <button onClick={changeShow} className="text-[24px]">
                    <svg
                      className="ml-2 h-4 w-4 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="stroke-2"
                        style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }}
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              {show && (
                <ul className="flex flex-col">
                  <li className="h-[40px]">
                    <button className="flex items-center justify-start  hover:text-[#ee4d2d]">
                      <div className="mr-3 h-[20px] w-[20px]">
                        <img
                          src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                          alt=""
                        />
                      </div>
                      <div>
                        <span>Đơn Mua</span>
                      </div>
                    </button>
                  </li>
                </ul>
              )}
              <div className="content my-[27px] hidden md:block">
                <div className="order-dropdown mb-[15px]">
                  <button
                    onClick={() => setActive(true)}
                    className={
                      (active ? 'visited:text-[#ee4d2d] ' : '') +
                      'flex items-center  hover:text-[#ee4d2d]'
                    }
                  >
                    <div className="mr-3 h-[20px] w-[20px]">
                      <img
                        src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078"
                        alt=""
                      />
                    </div>
                    <div>
                      <span>Đơn Mua</span>
                    </div>
                  </button>
                </div>

                <div className="voucher-dropdown mb-[15px]">
                  <button className="flex items-center hover:text-[#ee4d2d]">
                    <div className="mr-3 h-[20px] w-[20px]">
                      <img
                        src="https://cf.shopee.vn/file/84feaa363ce325071c0a66d3c9a88748"
                        alt=""
                      />
                    </div>
                    <div>
                      <span>Kho voucher</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="relative col-span-12 bg-white md:col-span-9 lg:col-span-10">
              {noti.length === 0 ? (
                noNofication()
              ) : (
                <>
                  <div className="min-h-full overflow-hidden rounded-[0.125rem]">
                    <div className="header flex h-[41px] items-center justify-end border-b-[1px] border-solid border-[rgb(0,0,0,0.1)] px-[1.25rem] text-right">
                      <button className="hover:text-[#ee4d2d]">Đánh dấu đã đọc tất cả</button>
                    </div>
                    <div className="body-content min-h-[625px]">
                      {noti?.slice(pageVisited, pageVisited + newPerPage)?.map((item) => {
                        // if (item.user === user?.id && item.status === 5){

                        // }
                        return (
                          <div
                            key={item._id}
                            className={
                              `${
                                item.status === Number(Object.keys(notiSTT)[0])
                                  ? 'bg-[#f9a291]'
                                  : 'bg-[#fff2ee]'
                              }` +
                              ' item flex cursor-pointer items-center justify-between border-b-[1px] border-solid border-[rgb(0,0,0,0.1)]  p-[20px] hover:bg-[#f8f8f8]'
                            }
                          >
                            <div className="  flex flex-row items-center">
                              <img
                                className="mb-[5px] mr-[20px] h-[40px] w-[40px] object-cover sm:h-[80px] sm:w-[80px] lg:mb-0"
                                src={item.photo}
                                alt=""
                              />
                              <div className="item-content">
                                <h1 className="status-order mb-[13px] text-[13px] md:text-[16px] ">
                                  <span className="text-base font-bold text-green-500">
                                    {item.title}
                                  </span>
                                </h1>

                                <p className="text-[15px] sm:text-base ">{orderSTT[item.status]}</p>

                                <p className="text-[15px] sm:text-base ">{item.time}</p>
                              </div>
                            </div>

                            <div>
                              <ButtonComponent mes={' Xem chi tiết'} color={'#e78fa1'} />
                              <button className="block lg:hidden">
                                <svg
                                  className="ml-2 h-4 w-4 text-black"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    className="stroke-2"
                                    style={{ strokeLinejoin: 'round', strokeLinecap: 'round' }}
                                    d="M19 9l-7 7-7-7"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="footer">
                      <ReactPaginate
                        breakLabel="...."
                        previousLabel={'Prev'}
                        nextLabel={'Next'}
                        pageCount={countPage}
                        onPageChange={changePage}
                        containerClassName={
                          'paginationBttns flex justify-end my-5 mx-5 items-center'
                        }
                        previousLinkClassName={
                          'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                        nextLinkClassName={
                          'bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                        pageClassName={
                          'flex justify-center items-center w-[30px] relative h-[35px] mx-1 bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-lg leading-tight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }
                        pageLinkClassName={'w-full h-full absolute text-center pt-[8px]'}
                        activeClassName={'paginationActive text-blue-600 bg-blue-100'}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Notifications;
