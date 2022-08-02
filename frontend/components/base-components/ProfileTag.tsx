import React from 'react'

function ProfileTag({ image, name, albumID, optionalText, photoSize="8" }: {
    image: string;
    name: string;
    albumID?: string;
    optionalText?: string;
    photoSize?: string;
}) {
  const link = albumID ? `/album/${albumID}` : `/user/${name}`;

  return (
    <a href={link} className="flex flex-row space-x-2 text-white font-medium">
        <img src={image} className={`rounded-full object-cover h-${photoSize} w-${photoSize} my-auto`} alt="Something" />
        <span className='align-middle inline-block ml-1 mt-0.5'>
          { 
            !albumID ? 
            <>{name} {optionalText}</> :
            <div className='font-normal'>
              <strong>&quot;{name}&quot;</strong> album
            </div>
          }
        </span>
    </a>
  )
}

export default ProfileTag