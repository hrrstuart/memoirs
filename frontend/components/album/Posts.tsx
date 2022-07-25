import React from 'react'
import { IPost } from '../../util/types/posts/post';
import ImageOverlay from '../base-components/ImageOverlay';

function Posts(props: { posts: IPost[] }) {
    const Item = ({ post }: { post: IPost }) => {
  
      return (
            <ImageOverlay 
              parentStyling={{ gradient: "bg-gradient-to-t from-black/30" }}
              image={post.image}
              alt={`Photo uploaded by ${post.owner}`}
              height='h-52' width='w-52'
            >
              <a href={`/user/${post.owner}`} className="absolute bottom-0 left-0 flex flex-row pb-2 pl-2 text-white font-medium">
                  <img src="https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048" className='rounded-full object-cover h-8 w-8 align-middle mr-2' alt="Something" />
                  <span className='align-middle inline-block ml-1 mt-0.5'>{post.owner}</span>
              </a>
            </ImageOverlay>
      )
    }
  
    return (
      <div aria-label='photo-stream' className='mt-5'>
          <ul className="grid grid-cols-3 gap-5">
              { props.posts.map((p, i) => <Item key={i} post={p} />) }
          </ul>
      </div>
    )
}

export default Posts