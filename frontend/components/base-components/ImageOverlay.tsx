import React from 'react'

function ImageOverlay(props: {
    image: string;
    alt: string;
    height: string;
    width: string;
    children: JSX.Element
}) {
  return (
    <div className='relative group'>
        <img className={`object-cover h-${props.height} w-${props.width}`} src={props.image} alt={props.alt} />
        <div className='absolute w-full h-full group-hover:bg-black/20 top-0 duration-75' />
        { props.children }
    </div>
  )
}

export default ImageOverlay