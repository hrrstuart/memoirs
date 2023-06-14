/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { IPost } from '../../util/types/posts/post'
import ImageOverlay from '../base-components/ImageOverlay'
import ProfileTag from '../base-components/ProfileTag'

export default function Post(props: { post: IPost, setModal: (post: IPost) => void }) {
  return (
    <div onClick={() => props.setModal(props.post)}>
        <ImageOverlay 
          parentStyling={{ gradient: "bg-gradient-to-t from-black/30", rounded: "rounded-lg" }}
          imageStyling={{ rounded: "rounded-lg" }}
          image={props.post.image}
          alt={`Photo uploaded by ${props.post.owner}`}
          height='w-full' width='w-full'
        >
          <div className='absolute bottom-0 left-0 w-full p-2'>
            <ProfileTag image='https://media.gettyimages.com/photos/handsome-young-adult-businessman-with-stubble-picture-id1250238624?s=2048x2048' photoSize='8' name={props.post.owner} optionalText={`to album SOmething`} />
          </div>
        </ImageOverlay>
    </div>
  )
}
