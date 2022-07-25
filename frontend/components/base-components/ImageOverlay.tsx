import React from 'react'

function ImageOverlay(props: {
    image: string;
    alt: string;
    height: string;
    width: string;
    parentStyling?: {
        rounded?: string;
        gradient?: string;
    };
    imageStyling?: {
        rounded?: string;
    }
    children: JSX.Element
}) {
  const parent = props.parentStyling?.gradient + ' ' + props.parentStyling?.rounded;
  const image = props.imageStyling?.rounded + ' ' + props.height + ' ' + props.width;

  return (
    <div className='relative group cursor-pointer'>
        <img className={`object-cover ${image}`} src={props.image} alt={props.alt} />
        <div className={`absolute w-full h-full group-hover:bg-black/20 top-0 duration-75 ${parent}`}>
            { props.children }
        </div>
    </div>
  )
}

export default ImageOverlay