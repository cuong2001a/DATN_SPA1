import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactStars from 'react-rating-stars-component';
import { FirebaseUploadPhoto } from 'Helpers/FirebaseUpload';
import Loading from 'Utils/Loading/Loading';

const RatingProductDetail = (props) => {
  const { product, handleEvaluate, onChangeEvaluate } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const [isImage, setIsImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [evaluate, setEvaluate] = useState({
    product_id: product.id,
    star: 0,
    comment: null,
    image: null
  });

  useEffect(() => {
    return () => {
      isImage && URL.revokeObjectURL(isImage.preview);
    };
  }, [isImage]);

  const handleComment = (value) => {
    const data = {
      ...evaluate,
      comment: value
    };
    setEvaluate(data);
    onChangeEvaluate(data);
  };
  const handleStar = (star) => {
    const data = {
      ...evaluate,
      star: star
    };
    setEvaluate(data);
    onChangeEvaluate(data);
  };

  const handlePreviewAvt = async (e) => {
    const file = e.target.files[0];
    const fileUpload = e.target.files;

    file.preview = URL.createObjectURL(file);
    setIsLoading(true);
    const imageEvaluate = await FirebaseUploadPhoto(fileUpload);

    const data = {
      ...evaluate,
      image: imageEvaluate
    };
    setEvaluate(data);
    onChangeEvaluate(data);
    setIsImage(file);
    setIsLoading(false);
  };
  return (
    <div className="border-1 h-[60%] border-b border-red-500 pb-5">
      <div className="mt-5 snap-start space-y-5">
        <div className="flex w-full flex-col items-center justify-start md:flex-row">
          <img className="h-[100px] w-[100px]" src={product.image} alt="" />
          <div className="px-2">
            <p className="font-medium leading-normal text-gray-800">{product.name}</p>
            <p className="block text-sm">
              Số lượng: <span className="px-2">{product.quantity}</span>
            </p>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-center ">
            <ReactStars value={evaluate.star} size={40} half={true} onChange={handleStar} />
          </div>
          <textarea
            onChange={(e) => handleComment(e.target.value)}
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
                onChange={(e) => handlePreviewAvt(e)}
              />
            </label>
            {isImage && <img className="mt-5 h-[100px] w-[100px]" src={isImage.preview} alt="" />}
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default RatingProductDetail;
