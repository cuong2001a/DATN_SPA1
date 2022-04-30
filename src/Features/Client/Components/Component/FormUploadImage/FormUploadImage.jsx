import { useState } from 'react';
import { FirebaseUploadMultiple } from 'Helpers/FirebaseUpload';
import { notifyError, notifySuccess } from 'Utils/Utils';

const FormUploadImage = () => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage['id'] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    FirebaseUploadMultiple(images)
      .then((urls) => {
        setUrls(urls);
        notifySuccess('Upload thành công');
      })
      .catch(() => {
        notifyError('Upload ảnh thất bại');
      });
  };
  return (
    <div>
      <form>
        <input type="file" multiple onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
      </form>
    </div>
  );
};

export default FormUploadImage;
