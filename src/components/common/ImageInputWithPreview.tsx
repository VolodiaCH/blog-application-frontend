import React, { useState } from "react";

interface IImageInputWithPreview {
  initialImageUrl: string;
  onImageChange: (file: File | null) => void;
}

const ImageInputWithPreview: React.FC<IImageInputWithPreview> = ({
  initialImageUrl,
  onImageChange,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onImageChange(file);
    }
  };

  return (
    <div className='mb-4'>
      {imagePreview || initialImageUrl ? (
        <div className='mb-4'>
          <img
            className='w-full object-cover rounded mb-4'
            src={imagePreview || `${process.env.NEXT_PUBLIC_API_URL}${initialImageUrl}`}
            alt='Preview'
          />
        </div>
      ) : null}

      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='image'>
        Upload New Image (optional)
      </label>
      <input
        id='image'
        type='file'
        onChange={handleImageChange}
        className='border border-gray-300 shadow-sm rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-2'
      />
    </div>
  );
};

export default ImageInputWithPreview;
