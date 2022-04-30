import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';
import React, { Fragment } from 'react';
import { changeDisplayPrices } from 'Utils/Utils';

const ContentTreatment = ({ detailTreatment, openModal }) => {
  return (
    <Fragment>
      {detailTreatment?.map((item) => {
        return (
          <div key={item._id}>
            <div className="detailService__header">
              <img
                src={item?.treatment_id?.album?.[0]}
                alt=""
                className="header-img aspect-[3/2] w-full"
              />
            </div>
            <div className="detailService__body">
              <div className="flex justify-between">
                <div className="body__define">
                  <div className="flex justify-between">
                    <div>
                      <h1 className="define-title mt-5 text-2xl font-bold leading-snug text-[#333f38]">
                        {item?.treatment_id?.treatment_name}
                      </h1>
                      <p>
                        Giá dịch vụ:{' '}
                        <span className="font-bold text-red-500">
                          {changeDisplayPrices(item?.treatment_id?.treatment_price)}
                        </span>{' '}
                      </p>
                    </div>
                    <div className="mt-5">
                      <ButtonComponent mes="Đặt lịch ngay" color="#f472b6" callBack={openModal} />
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item && item?.treatment_id?.treatment_description
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

export default ContentTreatment;
