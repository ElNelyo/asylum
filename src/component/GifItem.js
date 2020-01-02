import React from 'react';
const GifItem = ({gif, onGifSelect}) => {
  return (
   
    <div  onClick={() => onGifSelect(gif)}>
      
      <img src={gif.images.downsized.url}  alt={gif.images.downsized.url}className="gif-item"/>
    </div>
  )
};

export default GifItem;