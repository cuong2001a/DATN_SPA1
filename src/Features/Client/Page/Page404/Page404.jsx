import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="m-auto flex min-h-screen w-9/12 items-center justify-center py-16">
        <div className="overflow-hidden bg-white pb-8 shadow-2xl sm:rounded-[40px]">
          <div className="border-t border-gray-200 pt-8 text-center">
            <h1 className="text-9xl font-bold text-purple-500">404</h1>
            <h1 className="py-8 text-6xl text-[30pt] font-medium">Oops! Không tìm thấy trang</h1>
            <p className="px-12 pb-8 text-2xl text-[18pt] font-medium">
              Trang bạn đang tìm kiếm không tồn tại. Nó có thể đã bị di chuyển hoặc bị xóa.
            </p>
            <Link
              to="/"
              className="mr-6 rounded-md bg-gradient-to-r from-purple-400 to-blue-500 px-6 py-3 font-semibold text-white hover:from-pink-500 hover:to-orange-500"
            >
              TRANG CHỦ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page404;
