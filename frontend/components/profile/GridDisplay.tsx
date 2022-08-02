import { useRouter } from 'next/router';
import React, { useState } from 'react'
import ImageOverlay from '../base-components/ImageOverlay';
import PostModal from '../base-components/PostModal';
import ProfileTag from '../base-components/ProfileTag';

function GridDisplay({ list }: { list: string[] | any[] }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState()

  const handleClick = (item: any) => {
    if (item.albumID) {
      router.push(`/album/${item.albumID}`)
    } else {
      setCurrentPost(item);
      setShowModal(true);
    }
  }

  const Item = ({ item }: { item: any }) => {
    const post = item.image !== undefined;

    return (
      <ImageOverlay onClick={() => handleClick(item)} image={post ? item.image : item.thumbnail} alt="Something" height='h-52' width='w-52'>
        {
          !post ?
            <div className='absolute bottom-0 bg-black/70 w-full text-center py-1'>
              <div className='font-bold text-lg'>{item.title}</div>
              <div className='text-gray-400 text-sm'><strong>{item.photos}</strong> photos</div>
            </div> :
            <div className='absolute bottom-0 hidden group-hover:block w-full'>
              <div className="p-2">
                <ProfileTag image='https://media.gettyimages.com/photos/handsome-young-adult-businessman-with-stubble-picture-id1250238624?s=2048x2048' name='Something is weird' albumID='291' />
              </div>
            </div>
        }
      </ImageOverlay>
    )
  }

  return (
    <div aria-label='photo-stream' className='mt-5'>
        <ul className="grid grid-cols-3 gap-5">
            { list.map((p, i) => <Item key={i} item={p} />) }
        </ul>
        <PostModal open={showModal} post={currentPost} setShowModal={setShowModal} />
    </div>
  )
}

export default GridDisplay