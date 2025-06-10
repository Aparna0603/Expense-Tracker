import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='flex justify-center mb-6'>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />

      <div className='flex items-center gap-3'>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className='w-16 h-16 rounded-full object-cover'
          />
        ) : (
          <div className='w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500'>
            <LuUser size={24} />
          </div>
        )}

        <button
          type='button'
          onClick={onChooseFile}
          className='text-sm text-blue-600 flex items-center gap-1'
        >
          <LuUpload /> Upload
        </button>

        {previewUrl && (
          <button
            type='button'
            onClick={handleRemoveImage}
            className='text-sm text-red-600 flex items-center gap-1'
          >
            <LuTrash /> Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
