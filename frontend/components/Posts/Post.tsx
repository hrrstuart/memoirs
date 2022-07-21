/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Post as IPost } from '../../util/types/posts/post'

export default function Post(props: { post: IPost }) {
  return (
    <div className="relative group hover:cursor-pointer">
        <img className='object-cover rounded-lg' src={props.post.image} alt={`Photo uploaded by ${props.post.owner}`} />
        <div className="text-gray-300 absolute h-full w-full bottom-0 rounded-lg bg-gradient-to-t from-black/50 group-hover:bg-black/20 duration-75">
            <div className='w-full h-full relative'>
                <a href='https://google.com' className="absolute bottom-0 left-0 flex flex-row pb-2 pl-2">
                    <img src="https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048" className='rounded-full object-cover h-8 w-8 align-middle mr-2' alt="Something" />
                    <span className='align-middle inline-block ml-1 mt-0.5'><strong>{props.post.owner}</strong> to album &quot;Something&quot;</span>
                </a>
            </div>
        </div>
    </div>
  )
}
