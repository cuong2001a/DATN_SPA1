export const userRole = {
  0: 'Admin',
  /**
   * @description: Nhân viên bán hàng (Staff) có quyền xem thông tin của nhân viên
   * @param {number} id: id của nhân viên
   * @return: component liên quan đến hàng hóa như là: xem đơn hàng, xem sản phẩm đã bán, xem sản phẩm, xem chi tiết đơn hàng
   * thêm sửa xóa  về phần hàng hóa bao gồm cả đặt hàng và lên đơn
   */
  1: 'Nhân viên bán hàng',
  /**
   * @description: Nhân viên dịch vụ (Staff) có quyền xem thông tin của nhân viên
   * @param {number} id: id của nhân viên
   * @return: component liên quan đến quản lý dịch vụ CRUD, xem thông tin của dịch vụ
   * xem thời gian làm dịch vụ theo lịch có sẵn
   */
  2: 'Nhân viên dịch vụ',
  /**
   * @description: Nhân viên lễ tân (Staff) có quyền xem thông tin của nhân viên
   * @param {number} id: id của nhân viên
   * @return: component liên quan đến quản lý lễ tân như đặt lịch cho khách thêm dịch vụ, cập nhật dịch vụ, xem thông tin khách hàng
   *
   */
  3: 'Nhân viên lễ tân',
  4: 'Khách hàng'
};

export const customerStatus = {
  0: 'Chưa liên hệ',
  1: 'Đã liên hệ',
  2: 'Đã đặt lịch thành công',
  3: 'Đã đặt lịch thất bại',
  4: 'Đã hoàn thành dịch vụ'
};

export const pathSlug = {
  work: 'work',
  profile: 'profile',
  product: 'product',
  order: 'order',
  service: 'service',
  customer: 'customer',
  appointment: 'appointment'
};
