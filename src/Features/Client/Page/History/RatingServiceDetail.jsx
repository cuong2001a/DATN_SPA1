import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Loading from 'Utils/Loading/Loading';

const RatingServiceDetail = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="border-1 h-[60%] border-b border-red-500 pb-5">
      <div className="mt-5 snap-start space-y-5">
        <div className="flex w-full flex-col items-center justify-start md:flex-row">
          <img
            className="h-[100px] w-[100px]"
            src="https://cf.shopee.vn/file/c24e9d1e0a4033cbc8f56bbab0afb86b"
            alt=""
          />
          <div className="px-2">
            <p className="font-medium leading-normal text-gray-800">Tên dịch vụ</p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center ">
            <ReactStars value={5} size={40} half={true} />
          </div>
          <textarea
            // onChange={(e) => handleComment(e.target.value)}
            // {...register('comment', { required: true })}
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Hãy chia sẻ vì sao bạn thích sản phẩm này nhé"
            rows="3"
            cols="200"
          ></textarea>
          <div className="mt-2">
            <label className="cursor-pointer space-x-2 border border-[#ee4d2d] px-2 py-1 text-[#ee4d2d]">
              <i className="fal fa-camera"></i>
              <span>Thêm Hình ảnh</span>
              {/* <input type="file" accept="image/*" classname="sr-only" /> */}
              <input
                type="file"
                multiple
                accept=".jpg, .png, .jpeg"
                className="sr-only w-[200px] "
                // {...register('image', { required: true })}
                // onChange={(e) => handlePreviewAvt(e)}
              />
            </label>
            {/* {isImage && <img className="mt-5 h-[100px] w-[100px]" src={isImage.preview} alt="" />} */}
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default RatingServiceDetail;
