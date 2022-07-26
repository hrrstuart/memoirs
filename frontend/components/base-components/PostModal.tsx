import React, { SetStateAction } from 'react'
import { IPost } from '../../util/types/posts/post';
import Modal from '../Modal';

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
                <div className="text-white w-[30%] border-l">
                  <div>
                    <a href={`/user/${props.post.owner}`} className="flex flex-row pl-2 border-b p-5 pb-3">
                        <img src="https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048" className='rounded-full object-cover h-8 w-8 align-middle mr-2' alt="Something" />
                        <span className='align-middle inline-block ml-1 mt-0.5'><strong>{props.post.owner}</strong> to album &quot;Something&quot;</span>
                    </a>
                    <span className="p-5 block"><strong>{props.post.owner}</strong> {props.post.caption}</span>
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