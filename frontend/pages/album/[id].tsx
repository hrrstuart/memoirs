import { useRouter } from 'next/router';
import React, { useState } from 'react'
import Posts from '../../components/album/Posts';
import Description from '../../components/base-components/Description';
import { IAlbum } from '../../util/types/albums/album';

function Album() {
  const router = useRouter();
  const { id } = router.query;
  const [album, setAlbum] = useState<IAlbum | null>({
    albumID: id as string,
    information: {
        title: 'Scenic Photos with the Lads',
        createdAt: (new Date()).getTime(),
        updatedAt: (new Date()).getTime(),
    },
    ownerID: '291',
    posts: [
        { caption: "Life must be the craziest things and when you get to enjoy it, it can be pretty mad. Here is a picture of my satellite in the 3rd person POV. Enjoy!", image: "https://64.media.tumblr.com/d28ed0d493a7794b9a7b490e3d6612ea/tumblr_pdrm0xx05J1wvnafdo1_1280.jpg", likes: 841, owner: "hrrstuart" },
        { caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/spy-satellite-orbiting-earth-nasa-public-domain-imagery-picture-id1201649930?s=2048x2048", likes: 1238, owner: "hrrstuart" },
        { caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/uschi-glas-dieter-hermann-and-heidi-kranz-attend-the-bild-place-to-b-picture-id462960080?s=2048x2048", likes: 2922, owner: "hrrstuart" },
        { caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/van-halen-having-a-crazy-party-eating-hamburgers-and-potatoes-tokyo-picture-id593327617?s=2048x2048", likes: 2292, owner: "hrrstuart" },
        { caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/group-of-young-people-having-water-fight-in-field-laughing-picture-id200250724-002", likes: 13812, owner: "hrrstuart" },
    ],
    settings: {}
  });

  return !album ? (
    <div className='p-5 text-2xl text-gray-200'>
        Couldn&quot;t find album with that ID
    </div>
  ) : (
    <div className='flex flex-col space-y-2 text-white max-w-2xl'>
        <div>
            <Description
                information={{ posts: 250 }}
                profile={false}
                text={{ title: album.information.title, description: album.information.description }}
                thumbnail={album.posts[0].image}
            />
        </div>
        <div>
            <Posts posts={album.posts} />
        </div>
    </div>
  );
}

export default Album;