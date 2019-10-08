import React from 'react';
import { Image } from 'react-bootstrap'
const GifItem = ({gif, onGifSelect}) => {
  return (
   
    <div  onClick={() => onGifSelect(gif)}>
      
      <img src={gif.images.downsized.url}  className="gif-item"/>
    </div>
  )
};

export default GifItem;