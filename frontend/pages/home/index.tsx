import { useState } from "react";
import PostModal from "../../components/base-components/PostModal";
import Modal from "../../components/Modal";
import Post from "../../components/photo-stream/Post";
import { IPost } from "../../util/types/posts/post";

function Home() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPost, setCurrentPost] = useState<IPost>();

  const setModal = (post: IPost) => {
    setCurrentPost(post);

    document.body.classList.add("overflow-hidden")
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
        <PostModal open={showModal} post={currentPost} setShowModal={setShowModal}  />
    </div>
  );
}

export default Home
