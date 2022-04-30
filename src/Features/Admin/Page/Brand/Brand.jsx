import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from 'Utils/Loading/Loading';
import FormBrand from './FormBrand';
import ListBrand from './ListBrand';

const Brand = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const brand = useSelector((item) => item.brand.current);

  useEffect(() => {
    if (detailData) setIsCheck(true);
  }, [detailData]);

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <FormBrand
        brand={brand}
        setIsLoading={setIsLoading}
        detailData={detailData}
        setDetailData={setDetailData}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
      <ListBrand brand={brand} setIsLoading={setIsLoading} setDetailData={setDetailData} />
      {isLoading && <Loading />}
    </div>
  );
};

export default Brand;
