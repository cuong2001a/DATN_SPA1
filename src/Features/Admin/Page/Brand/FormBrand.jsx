import { validate } from 'Constants';
import { FirebaseUploadPhoto } from 'Helpers/FirebaseUpload';
import { useForm } from 'react-hook-form';
import { notifyError } from 'Utils/Utils';
import { useDispatch } from 'react-redux';
import { CreateBrand, UpdateBrand } from 'Features/Slice/Brand/BrandSlice';
import { useEffect, useState } from 'react';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const FormBrand = (props) => {
  const { brand, setIsLoading, detailData, setDetailData, isCheck, setIsCheck } = props;
  const dispatch = useDispatch();
  const [filesImg, setFilesImg] = useState([]);
  const [name, setName] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const handleChange = async (e) => {
    const files = Array.from(e.target.files)?.map((item) => {
      return {
        file: item,
        url: URL.createObjectURL(item)
      };
    });
    setFilesImg(files);
  };

  const handleOnSubmit = async (data) => {
    props.setIsLoading(true);
    try {
      const imageCate = await FirebaseUploadPhoto(filesImg.map((item) => item.file));
      await props.brand?.map((item) => {
        if (data?.name.trim() === item?.brand_name) {
          throw 'Tên thương hiệu đã tồn tại';
        }
      });

      try {
        let dataCreate = {
          brand_name: data.name,
          brand_image: imageCate
        };
        dispatch(CreateBrand(dataCreate));
        setFilesImg([]);
        setName('');
        reset();
      } catch (error) {}
    } catch (error) {
      notifyError(error);
    }
    props.setIsLoading(false);
  };

  const handleOnEdit = async (data) => {
    try {
      const { image } = data;
      if (image?.length === 0) {
        setIsLoading(true);
        const editData = {
          _id: detailData?._id,
          brand_name: name,
          brand_image: detailData?.brand_image
        };
        dispatch(UpdateBrand(editData));
        setTimeout(() => {
          setFilesImg([]);
          setName('');
          setIsCheck(false);
          setDetailData(null);
          reset();
          setIsLoading(false);
        }, 1500);
      } else {
        setIsLoading(true);
        const imageService = await FirebaseUploadPhoto(filesImg.map((item) => item.file));
        const Editdata = {
          _id: detailData?._id,
          brand_name: name,
          brand_image: imageService
        };
        dispatch(UpdateBrand(Editdata));
        setTimeout(() => {
          setFilesImg([]);
          setIsCheck(false);
          setDetailData(null);
          reset();
          setIsLoading(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturnAdd = () => {
    setIsLoading(true);
    setIsCheck(false);
    setName('');
    setDetailData(null);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    setName(detailData?.brand_name);
  }, [detailData]);

  useEffect(() => {
    setName((prev) => prev?.trimLeft().replace(/\s{2,}/g, ' '));
  }, [name]);

  return (
    <form onSubmit={handleSubmit(isCheck ? handleOnEdit : handleOnSubmit)}>
      <h3 className="mb-6 text-2xl font-bold text-gray-900">
        {isCheck ? 'Sửa thương hiệu' : 'Thêm mới thương hiệu'}{' '}
      </h3>
      <div className="mb-6 flex flex-col">
        <label className="mr-4 mb-2 inline-block font-bold text-gray-700" htmlFor="name">
          Tên thương hiệu
        </label>
        <input
          {...register('name', {
            required: isCheck ? false : validate.required,
            maxLength: 50,
            minLength: 2
          })}
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={
            errors?.name
              ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
              : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
          }
        />
        <div>
          <span className="mt-2 text-[12px] text-red-500">
            {errors?.name && errors?.name?.message}
          </span>
          <span className="text-[12px] text-red-500">
            {errors?.name?.type === 'maxLength' && 'Kí tự tối đa là 50'}
          </span>
          <span className="text-[12px] text-red-500">
            {errors?.name?.type === 'minLength' && 'Kí tự tối thiểu là 2'}
          </span>
        </div>
      </div>
      <div className="mb-6">
        <label className="mr-4 mb-2 inline-block font-bold text-gray-700" htmlFor="image">
          Ảnh
        </label>
        <input
          {...register('image', {
            required: isCheck ? false : validate.required,
            validate: isCheck ? false : validate.validateImage
          })}
          type="file"
          id="image"
          onChange={handleChange}
          className={
            errors?.image
              ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
              : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
          }
        />
        <div>
          <span className="mt-2 text-[12px] text-red-500">
            {errors?.image && errors?.image?.message}
          </span>
        </div>

        {detailData !== null ? (
          <div className="flex gap-5">
            <div className="h-[50px] w-[50px]">
              <img src={detailData?.brand_image} className="" />
            </div>
          </div>
        ) : (
          <div className="mt-2 flex flex-row gap-5 ">
            <div className="flex h-[50px] w-[50px] gap-5 object-cover">
              {filesImg &&
                filesImg.map((item, index) => <img key={index} src={item.url} alt="img_product" />)}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-start gap-3">
        <ButtonComponent type="submit" mes={isCheck ? 'Sửa' : 'Thêm mới'} />
        {isCheck ? (
          <ButtonComponent
            type="submit"
            mes="Trở lại thêm mới"
            color="red"
            callBack={handleReturnAdd}
          />
        ) : (
          ''
        )}
      </div>
    </form>
  );
};

export default FormBrand;
