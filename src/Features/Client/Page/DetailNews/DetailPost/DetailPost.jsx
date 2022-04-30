import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const DetailPost = () => {
  const [detailData, setDetailData] = useState({});
  const params = useParams();
  const { id } = params;
  const blog = useSelector((item) => item.blog.current);
  const getDetailData = () => {};

  useEffect(() => {
    const data = blog?.find((item) => item._id === id);
    setDetailData(data);
  }, [id, blog]);

  return (
    <div className="post mx-3">
      <img
        src={detailData?.album?.[0]}
        className="post-img h-[280px] w-full rounded-md object-contain"
        alt=""
      />
      <div className="post__info mt-5">
        <h1 className="text-2xl font-bold text-[#333f38]">{detailData?.title}</h1>
        <p className="mb-4 text-base" style={{ color: '#ec8e5e' }}>
          {moment(detailData?.times).format('MM-DD-YYYY h:mm')}
        </p>
        <p
          className="text-base leading-6 "
          dangerouslySetInnerHTML={{
            __html: detailData && detailData?.content
          }}
        ></p>
        <div className="service mt-5 grid grid-cols-12 gap-5">
          <div className="col-span-12 md:col-span-5"></div>

          <div className="col-span-12 my-5 border-b-2 pb-16">
            <h3 className="mt-4 text-right text-base font-bold text-[#333f38]">
              Tác giả : <span>{detailData?.author}</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
