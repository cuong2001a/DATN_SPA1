const message = {
  required: 'Yêu cầu nhập trường này',
  illegal: 'Định dạng không hợp lệ',
  patternPhone: 'Định dạng số điện thoại không hợp lệ',
  patternEmail: 'Định dạng Email không hợp lệ',
  validateLength: {
    min(min) {
      return `Yêu cầu nhập ít nhất ${min} ký tự`;
    },
    max(max) {
      return `Nhập tối đa ${max} ký tự`;
    }
  }
};

const length = {
  minName: 2,
  maxName: 70
};

// regex
export const regex = {
  phoneNumber: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
};

// validate form
export const validate = {
  required: {
    value: true,
    message: message?.required
  },

  validatePhone: (value) => {
    const valueTrim = value?.trim();
    if (valueTrim?.length === 0) return message?.illegal;
    if (!valueTrim?.match(regex?.phoneNumber)) return message?.patternPhone;
  },

  validateEmail: (value) => {
    const valueTrim = value?.trim();
    if (valueTrim?.length !== 0 && !valueTrim?.match(regex?.email)) return message?.patternEmail;
  },

  validateName: (value) => {
    const valueTrim = value?.trim();
    if (valueTrim?.length === 0) return message?.illegal;
    if (valueTrim?.length < length?.minName) return message?.validateLength?.min(length?.minName);
    if (valueTrim?.length > length?.maxName) return message?.validateLength?.max(length?.maxName);
  },

  validateSelectOption: (value) => {
    if (value?.length === 0) return message?.illegal;
  },

  validatePrice: (value) => {
    const valueTrim = value?.trim();
    if (valueTrim?.length === 0) return message?.illegal;
  },

  validateTime: (value) => {
    const valueTrim = value?.trim();
    if (valueTrim?.length === 0) return message?.illegal;
  },

  validateImage: (value) => {
    if (value?.length === 0) return message?.illegal;
    const image = value[0];
    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      return message?.illegal;
    }
  },

  validateImageMultiple: (value) => {
    if (value?.length === 0) return message?.required;
    if (!value.name.match(/\.(jpg|jpeg|png)$/)) {
      return message?.illegal;
    }
    return false;
  }
};

export const IMAGE_CHANGE_ROLE =
  'http://metierrecruitment.com.au/media/metier/client/Blogs/The%20changing%20role%20of%20a%20personal%20assistant%20-%20featured%20image.png';

export const IMAGE_DEFAULT =
  'https://img5.thuthuatphanmem.vn/uploads/2021/12/15/background-hoa-sen-dep_040706104.jpg';

export const LOGO =
  'https://firebasestorage.googleapis.com/v0/b/datn-spa.appspot.com/o/images%2Flogo.png?alt=media&token=ec142fd9-282c-4e49-9f5f-701b5d9e9354';
