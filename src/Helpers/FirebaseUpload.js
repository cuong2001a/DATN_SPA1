import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export const FirebaseUploadPhoto = (image) => {
  if (image.length === 0) return '';
  if (
    image[0].type !== 'image/png' &&
    image[0].type !== 'image/jpeg' &&
    image[0].type !== 'image/jpg'
  )
    return '';
  const photo = image[0];
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${photo.name}`);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, photo).then(() => {
      getDownloadURL(ref(storage, `images/${photo.name}`)).then((url) => {
        resolve(url);
      });
    });
  });
};

/**
 *
 * @param {*} images nhận vào 1 mảng file ảnh từ local
 * @returns trả về 1 mảng link ảnh online sau khi upload lên firebase
 */
export const FirebaseUploadMultiple = (images) => {
  const storage = getStorage();
  const urls = [];
  return new Promise((resolve, reject) => {
    images.forEach((photo) => {
      const storageRef = ref(storage, `images/${photo.name}`);
      uploadBytes(storageRef, photo).then(() => {
        getDownloadURL(ref(storage, `images/${photo.name}`))
          .then((url) => {
            urls.push(url);
            if (urls.length === images.length) {
              resolve(urls);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  });
};

/**
 *
 * @param {*} url nhận vào 1 link ảnh online
 * xóa ảnh trên firebase
 */
export const DeletePhotoUpload = (url) => {
  const storage = getStorage();
  const photoURL = url.split('%')[1].split('2F')[1].split('?')[0].toLowerCase();
  // Create a reference to the file to delete
  const desertRef = ref(storage, `images/${photoURL}`);
  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      console.log('File deleted successfully');
    })
    .catch((error) => {
      console.log(error);
    });
};
