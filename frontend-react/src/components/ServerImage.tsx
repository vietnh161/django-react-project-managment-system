import React from 'react';

const ServerImage: React.FC<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = (props) => {
  return (
    <img {...props} src={`${process.env.REACT_APP_DJANGO_STATIC_IMAGES_ENDPOINT}/${props.src}`} />
  );
};

export default ServerImage;
