import React, { useState } from 'react'
import { IPost } from '../../util/types/posts/post';
import ImageOverlay from '../base-components/ImageOverlay';
import PostModal from '../base-components/PostModal';
import ProfileTag from '../base-components/ProfileTag';

function Posts(props: { posts: IPost[] }) {
    const [showModal, setShowModal] = useState(false);
    const [currentPost, setCurrentPost] = useState<IPost>();

    const handleClick = (item: IPost) => {
      setCurrentPost(item);
      setShowModal(true);
    }

    const Item = ({ post }: { post: IPost }) => {
      return (
            <ImageOverlay 
              onClick={() => handleClick(post)}
              parentStyling={{ gradient: "bg-gradient-to-t from-black/30" }}
              image={post.image}
              alt={`Photo uploaded by ${post.owner}`}
              height='h-52' width='w-52'
            >
              <div className='absolute bottom-0 left-0 p-2'>
                <ProfileTag
                  name={post.owner}
                  image='https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048'
                />
              </div>
            </ImageOverlay>
      )
    }
  
    return (
      <div aria-label='photo-stream' className='mt-5'>
          <ul className="grid grid-cols-3 gap-5">
              { props.posts.map((p, i) => <Item key={i} post={p} />) }
          </ul>
          <PostModal open={showModal} post={currentPost} setShowModal={setShowModal} />
      </div>
    )
}

export default Posts