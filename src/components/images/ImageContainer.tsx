import React from 'react';


interface ImageData {
  imageUrl?: string;
  color?: string;
  description?: string;
}

const ImageContainer: React.FC<ImageData> = ({ imageUrl, color, description }) => {
  return (
    <div
      className="image-container"
      style={{
        display: 'grid',
        placeItems: 'center',        
        overflow: 'hidden',
        width:'fit-content',
        margin:'auto',
        backgroundColor: 'red',
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Grid Item"
          style={{
            // position: 'absolute',
            // top: '50%',
            // left: '50%',
            // transform: 'translate(-50%, -50%)',
            // width: 'auto', 
            // height: 'auto',
            // minWidth: '100%',
            // minHeight: '100%',
            // objectFit: 'cover',
            // alignSelf:'center',
            
            // minWidth: '100%',
            // minHeight: '100%',
            objectFit: 'cover',
            transform: 'scale(1)',
            transition: 'transform 0.3s ease-in-out',
          }}
          className="image-hover"
        />
      )}
      {description && (
        <div
          className="image-description"
          style={{
            position: 'absolute',
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            width: '100%',
            textAlign: 'center',
            padding: '5px',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          {description}
        </div>
      )}
      <style>
        {`
          .image-container:hover .image-hover {
            transform: scale(1.1);
          }
          .image-container:hover .image-description {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default ImageContainer