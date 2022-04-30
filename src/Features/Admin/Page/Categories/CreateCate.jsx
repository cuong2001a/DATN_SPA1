import { validate } from 'Constants';
import { FirebaseUploadPhoto } from 'Helpers/FirebaseUpload';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { notifyError } from 'Utils/Utils';
import { useDispatch } from 'react-redux';
import { CreateCategory, UpdateCategory } from 'Features/Slice/Category/CategorySlice';
import Loading from 'Utils/Loading/Loading';
import ButtonComponent from 'Features/Admin/Components/Components/Button/Button';

const CreateCate = (props) => {
  const { detailData, setDetailData, isCheck, setIsCheck } = props;

  const [filesImg, setFilesImg] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, [isLoading]);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  useEffect(() => {
    setFilesImg([]);
    setValue('category_image', []);
  }, [detailData]);

  const handleChange = (e) => {
    const files = Array.from(e.target.files)?.map((item) => {
      return {
        file: item,
        url: URL.createObjectURL(item)
      };
    });
    setFilesImg(files);
  };

  const handleOnSubmit = async (data) => {
    setIsLoading(true);
    try {
      const imageCate = await FirebaseUploadPhoto(data?.category_image);
      await props.categories?.map((item) => {
        if (data?.name.trim() === item?.category_name) {
          throw new 'Tên danh mục đã tồn tại'();
        }
      });
      let dataCreate = {
        category_name: data.name,
        category_image: imageCate
      };
      await dispatch(CreateCategory(dataCreate));
      reset();
      setName('');
      setFilesImg([]);
    } catch (error) {
      notifyError('Thêm mới thất bại');
    }
    setIsLoading(false);
  };

  const handleOnEdit = async (data) => {
    try {
      const { category_image } = data;
      if (category_image?.length === 0) {
        setIsLoading(true);
        const editData = {
          _id: detailData?._id,
          category_name: name,
          category_image: detailData?.category_image
        };
        await dispatch(UpdateCategory(editData));

        setFilesImg([]);
        setName('');
        setIsCheck(false);
        setDetailData(null);
        reset();
      } else {
        setIsLoading(true);
        const imageService = await FirebaseUploadPhoto(filesImg.map((item) => item.file));
        const Editdata = {
          _id: detailData?._id,
          category_name: name,
          category_image: imageService
        };
        await dispatch(UpdateCategory(Editdata));

        setFilesImg([]);
        setIsCheck(false);
        setDetailData(null);
        reset();
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReturnAdd = () => {
    setIsCheck(false);
    setName('');
    setDetailData(null);
  };

  useEffect(() => {
    setName(detailData?.category_name);
  }, [detailData]);

  useEffect(() => {
    setName((prev) => prev?.trimLeft().replace(/\s{2,}/g, ' '));
  }, [name]);

  return (
    <form onSubmit={handleSubmit(isCheck ? handleOnEdit : handleOnSubmit)}>
      <h3 className="mb-6 text-2xl font-bold text-gray-900">
        {isCheck ? 'Sửa danh mục' : 'Thêm mới danh mục'}
      </h3>
      <div className="mb-6 flex flex-col">
        <label className="mr-4 mb-2 inline-block font-bold text-gray-700" htmlFor="name">
          Tên danh mục
        </label>
        <input
          {...register('name', {
            required: detailData ? false : validate?.required,
            validate: detailData ? '' : validate.validateName,
            maxLength: 50,
            minLength: 2
          })}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          className={
            errors?.name
              ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
              : 'rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
          }
        />
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
      <div className="mb-6">
        <label className="mr-4 mb-2 inline-block font-bold text-gray-700" htmlFor="image">
          Ảnh
        </label>
        <input
          {...register('category_image', {
            required: isCheck ? false : validate?.required,
            validate: isCheck ? '' : validate.validateImage
          })}
          type="file"
          id="category_image"
          onChange={handleChange}
          className={
            errors?.category_image
              ? 'rounded border border-red-500 bg-gray-100 py-2 px-4 outline-none ring-1 ring-red-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 lg:w-60 xl:w-96'
              : 'rounded border border-gray-500 bg-gray-100 py-2 px-4 outline-none focus:outline-none focus:ring-1 focus:ring-indigo-400 lg:w-60 xl:w-96'
          }
        />
        <div>
          <span className="mt-2 text-[12px] text-red-500">
            {errors?.category_image && errors?.category_image?.message}
          </span>
        </div>
        {detailData !== null ? (
          <div className="flex gap-5">
            <div className="h-[50px] w-[50px]">
              <img src={detailData?.category_image} className="" />
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

      {isLoading && <Loading />}
    </form>
  );
};

export default CreateCate;
