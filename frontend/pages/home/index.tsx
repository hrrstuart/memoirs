import { useState } from "react";
import Modal from "../../components/Modal";
import Post from "../../components/Posts/Post";
import { Post as IPost } from "../../util/types/posts/post";

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost>();

  const setModal = (post: IPost) => {
    setCurrentPost(post);
    setShowModal(true);
  }

  return (
    <div className="w-full max-w-full md:max-w-md">
        <div className="flex">
            <ul className="flex flex-col space-y-6">
                <Post setModal={setModal} post={{ caption: "Life must be the craziest things and when you get to enjoy it, it can be pretty mad. Here is a picture of my satellite in the 3rd person POV. Enjoy!", image: "https://64.media.tumblr.com/d28ed0d493a7794b9a7b490e3d6612ea/tumblr_pdrm0xx05J1wvnafdo1_1280.jpg", likes: 841, owner: "hrrstuart" }} />
                <Post setModal={setModal} post={{ caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/spy-satellite-orbiting-earth-nasa-public-domain-imagery-picture-id1201649930?s=2048x2048", likes: 1238, owner: "hrrstuart" }} />
                <Post setModal={setModal} post={{ caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/uschi-glas-dieter-hermann-and-heidi-kranz-attend-the-bild-place-to-b-picture-id462960080?s=2048x2048", likes: 2922, owner: "hrrstuart" }} />
                <Post setModal={setModal} post={{ caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/van-halen-having-a-crazy-party-eating-hamburgers-and-potatoes-tokyo-picture-id593327617?s=2048x2048", likes: 2292, owner: "hrrstuart" }} />
                <Post setModal={setModal} post={{ caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/group-of-young-people-having-water-fight-in-field-laughing-picture-id200250724-002", likes: 13812, owner: "hrrstuart" }} />
            </ul>
        </div>
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div style={{ transform: 'translate(-50%, -50%)', zIndex: 1000 }} className="fixed top-1/2 left-1/2 bg-[#000000] h-[90%] w-[80%] overflow-y-scroll xl:overflow-y-hidden text-white">
            {
              currentPost ?
                  <div className="flex flex-col xl:flex-row h-full">
                    <div className="mx-auto h-full flex items-center justify-center">
                      <img src={currentPost.image} alt="Heya" className="object-cover max-h-full" />
                    </div>
                    <div className="text-white w-[30%] border-l">
                      <div>
                        <a href='https://google.com' className="flex flex-row pl-2 border-b p-5 pb-3">
                            <img src="https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048" className='rounded-full object-cover h-8 w-8 align-middle mr-2' alt="Something" />
                            <span className='align-middle inline-block ml-1 mt-0.5'><strong>{currentPost.owner}</strong> to album &quot;Something&quot;</span>
                        </a>
                        <span className="p-5 block"><strong>{currentPost.owner}</strong> {currentPost.caption}</span>
                      </div>
                    </div>
                  </div>
              : <h1>Oops looks like something went wrong</h1>
            }
          </div>
        </Modal>
    </div>
  );
}

export default Home
