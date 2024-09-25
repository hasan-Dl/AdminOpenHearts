import React, { useState } from 'react'

export default function Reports() {
    const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImageSrc(e.target.result); // Устанавливаем источник изображения
      };

      reader.readAsDataURL(file); //  кЧитаем файлак Data URL
    }
  };
  return (
    <div>
          <input type="file" onChange={handleFileChange} accept="image/*" />
          {imageSrc && <img src={imageSrc} alt="Uploaded Preview" style={{ width: '200px' }} />}
    </div>
  )
}
