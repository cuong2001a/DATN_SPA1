import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CreateCate from './CreateCate';
import ListCate from './ListCate';

const Categories = () => {
  const categories = useSelector((state) => state.category.current);
  const [isCheck, setIsCheck] = useState(false);
  const [detailData, setDetailData] = useState(null);
  useEffect(() => {
    if (detailData) {
      setIsCheck(true);
    }
  }, [detailData]);

  return (
    <div className="flex flex-col gap-10 lg:flex-row">
      <CreateCate
        categories={categories}
        detailData={detailData}
        setDetailData={setDetailData}
        isCheck={isCheck}
        setIsCheck={setIsCheck}
      />
      <ListCate categories={categories} setDetailData={setDetailData} />
    </div>
  );
};

export default Categories;
