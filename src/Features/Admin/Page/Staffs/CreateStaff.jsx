const CreateStaff = () => {
  return (
    <div>
      <h3 className="mb-6 text-2xl font-bold text-gray-900">Thêm mới</h3>
      <div className="mb-6">
        <label className="mr-4 mb-2 inline-block font-bold text-gray-700" htmlFor="name">
          Tên danh mục
        </label>
        <input
          type="text"
          className="rounded border bg-gray-100 py-2 px-4 outline-none focus:ring-2 focus:ring-indigo-400 lg:w-60 xl:w-96"
        />
      </div>
    </div>
  );
};

export default CreateStaff;
