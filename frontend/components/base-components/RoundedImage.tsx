import React from 'react'

function RoundedImage(props: {
    heighthAndWidth: number;
    image: string;
    alt: string
}) {
  const size = `h-${props.heighthAndWidth} w-${props.heighthAndWidth}`;

  return (
    <div className={`${size} rounded-full`}>
        <img className='object-cover' src={props.image} alt={props.alt} />
    </div>
  )
}

export default RoundedImage