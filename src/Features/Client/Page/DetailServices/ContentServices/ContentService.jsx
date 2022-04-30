import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import React, { Fragment } from 'react';
import { changeDisplayPrices, stringToHTML } from 'Utils/Utils';

const ContentService = ({ detailService, openModal }) => {
  return (
    <Fragment>
      {detailService?.map((item) => {
        return (
          <div key={item._id}>
            <div className="detailService__header">
              <img
                src={item?.service_album?.[0]}
                alt=""
                className="header-img h- aspect-[3/2] w-full"
              />
            </div>
            <div className="detailService__body">
              <div className="flex justify-between">
                <div className="body__define">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="define-title mt-5 text-2xl font-bold leading-snug text-[#333f38]">
                        {item?.service_name}
                      </h1>
                      <p>{changeDisplayPrices(item?.service_price)}</p>
                    </div>
                    <div className="mt-5">
                      <ButtonComponent mes="Đặt lịch ngay" color="#f472b6" callBack={openModal} />
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item && item?.service_description
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ContentService;
