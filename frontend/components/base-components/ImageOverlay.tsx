import React from 'react'

function ImageOverlay(props: {
    image: string;
    alt: string;
    height: string;
    width: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    props.onClick && props.onClick(e);
  }

  return (
    <div onClick={handleClick} className='relative group cursor-pointer'>
        <img className={`object-cover ${image}`} src={props.image} alt={props.alt} />
        <div className={`absolute w-full h-full group-hover:bg-black/20 top-0 duration-75 ${parent}`}>
            { props.children }
        </div>
    </div>
  )
}

export default ImageOverlay