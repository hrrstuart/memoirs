/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { IPost } from '../../util/types/posts/post'
import ImageOverlay from '../base-components/ImageOverlay'

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
          <a href={`/user/${props.post.owner}`} className="absolute bottom-0 left-0 flex flex-row pb-2 pl-2 text-white font-medium">
              <img src="https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048" className='rounded-full object-cover h-8 w-8 align-middle mr-2' alt="Something" />
              <span className='align-middle inline-block ml-1 mt-0.5'><strong className='text-gray-300'>{props.post.owner}</strong> to album &quot;Something&quot;</span>
          </a>
        </ImageOverlay>
    </div>
  )
}
