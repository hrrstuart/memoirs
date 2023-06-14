import React, { SetStateAction } from 'react'
import { IPost } from '../../util/types/posts/post';
import Modal from '../Modal';
import Comments from './Comments';
import ProfileTag from './ProfileTag';
import SectionSplit from './SectionSplit';

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
                <div className="text-white w-full xl:w-[30%] xl:border-t-0 xl:border-l p-5 h-full flex flex-col">
                  <div className='pb-5'>
                    <ProfileTag
                      name={props.post.owner}
                      optionalText={"to album \"Something\""}
                      image="https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048"
                    />
                  </div>
                  <div className='flex flex-col flex-grow'>
                    <span className='pb-5'><strong>{props.post.owner}</strong> {props.post.caption}</span>
                    <SectionSplit title="Comments" />
                    <div className='space-y-5'>
                      <input placeholder='Enter a comment' className='bg-gray-800 w-full text-gray-100 p-2 focus:outline-none rounded-md' />
                      <div className='h-[34rem]'>
                        <Comments />
                      </div>  
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