import React from 'react'

function ProfileTag({ image, name, optionalText, photoSize="8" }: {
    image: string;
    name: string;
    optionalText?: string;
    photoSize?: string;
}) {
  return (
    <a href={`/user/${name}`} className="flex flex-row text-white font-medium">
        <img src={image} className={`rounded-full object-cover h-${photoSize} w-${photoSize} align-middle mr-2`} alt="Something" />
        <span className='align-middle inline-block ml-1 mt-0.5'>{name} {optionalText}</span>
    </a>
  )
}

export default ProfileTag