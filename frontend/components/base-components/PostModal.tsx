import React, { SetStateAction } from 'react'
import { IPost } from '../../util/types/posts/post';
import Modal from '../Modal';
import Comments from './Comments';
import ProfileTag from './ProfileTag';

function PostModal(props: {
    open: boolean,
    post: IPost | null | undefined,
    setShowModal: (value: SetStateAction<boolean>) => void
}) {
  return (
    <Modal open={props.open} onClose={() => { document.body.classList.remove("overflow-hidden"); props.setShowModal(false) }}>
      <div style={{ transform: 'translate(-50%, -50%)', zIndex: 1000 }} className="fixed top-1/2 left-1/2 bg-[#000000] h-[90%] w-[80%] overflow-y-scroll xl:overflow-y-hidden text-white">
        {
          props.post ?
              <div className="flex flex-col xl:flex-row h-full">
                <div className="mx-auto h-full flex items-center justify-center">
                  <img src={props.post.image} alt="Heya" className="object-cover max-h-full" />
                </div>
                <div className="text-white w-[30%] border-l p-5">
                  <div className='pb-5'>
                    <ProfileTag
                      name={props.post.owner}
                      optionalText={"to album \"Something\""}
                      image="https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048"
                    />
                  </div>
                  <div className='flex flex-col'>
                    <span><strong>{props.post.owner}</strong> {props.post.caption}</span>
                    <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-b border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-black px-4 text-sm text-gray-300">Comments</span>
                      </div>
                    </div>
                    <div className='ml-2'>
                      <Comments />
                    </div>
                  </div>
                </div>
              </div>
          : <h1>Oops looks like something went wrong</h1>
        }
      </div>
    </Modal>
  )
}

export default PostModal