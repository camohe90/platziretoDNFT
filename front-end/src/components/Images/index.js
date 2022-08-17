import React, { useState } from 'react';

export const UploadAndDisplayImage = ({ setImage }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not fount"
            width={'250px'}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          setSelectedImage(event.target.files[0]);
          setImage(event.target.files[0]);
        }}
      />
    </div>
  );
};
