import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Description from '../../components/base-components/Description';
import GridDisplay from '../../components/profile/GridDisplay';
import { IPost } from '../../util/types/posts/post';

function User() {
  
  // Sample photo list
  const photoList: IPost[] = [
    { createdAt: 1665822600, caption: "Life must be the craziest things and when you get to enjoy it, it can be pretty mad. Here is a picture of my satellite in the 3rd person POV. Enjoy!", image: "https://64.media.tumblr.com/d28ed0d493a7794b9a7b490e3d6612ea/tumblr_pdrm0xx05J1wvnafdo1_1280.jpg", likes: 841, owner: "hrrstuart" },
    { createdAt: 1675699500, caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/spy-satellite-orbiting-earth-nasa-public-domain-imagery-picture-id1201649930?s=2048x2048", likes: 1238, owner: "hrrstuart" },
    { createdAt: 1667771700, caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/uschi-glas-dieter-hermann-and-heidi-kranz-attend-the-bild-place-to-b-picture-id462960080?s=2048x2048", likes: 2922, owner: "hrrstuart" },
    { createdAt: 1673778600, caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/van-halen-having-a-crazy-party-eating-hamburgers-and-potatoes-tokyo-picture-id593327617?s=2048x2048", likes: 2292, owner: "hrrstuart" },
    { createdAt: 1670016000, caption: "Live, love, laugh", image: "https://media.gettyimages.com/photos/group-of-young-people-having-water-fight-in-field-laughing-picture-id200250724-002", likes: 13812, owner: "hrrstuart" }
  ];

  // Sample album list
  const albumList: any[] = [
    { albumID: 'ajd29xmAI', thumbnail: "https://media.gettyimages.com/photos/tourist-visiting-spain-picture-id895081824?s=2048x2048", title: "Holiday to Marbella", photos: 123 },
    { albumID: 'akNal29aa', thumbnail: "https://media.gettyimages.com/photos/man-workout-in-gym-picture-id1070755212?s=2048x2048", title: "Gym Progress", photos: 21 },
    { albumID: 'dfkal29zj', thumbnail: "https://media.gettyimages.com/photos/young-woman-taking-selfie-with-family-and-friends-picture-id1176848423?s=2048x2048", title: "Family get-together 2022", photos: 151 },
    { albumID: 'ak20aj1ha', thumbnail: "https://media.gettyimages.com/photos/festival-freedom-picture-id647232094?s=2048x2048", title: "Longitude 2k22", photos: 2022 },
    { albumID: 'fka02jmzz', thumbnail: "https://media.gettyimages.com/photos/empty-classroom-during-covid19-pandemic-picture-id1282723854?s=2048x2048", title: "Transition Year", photos: 518 },
    { albumID: 'dkalDka2A', thumbnail: "https://media.gettyimages.com/photos/colorful-aurora-borealis-picture-id1049922746?s=2048x2048", title: "Iceland trip", photos: 191 },
  ];
  const router = useRouter();
  const [toDisplay, setToDisplay] = useState<IPost[] | any[]>(photoList.sort((a, b) => b.createdAt - a.createdAt));
  const [activeTab, setActiveTab] = useState<number>(0);

  // Get toDisplay state from local cache. It says 'userID/state' and if there's no matching userID, it defaults to photoList

  
  const tabs = [
    { 
      label: "Photos",
      id: 0,
      onClick: () => {
        setToDisplay(photoList);
        setActiveTab(0);
      }
    },
    { 
      label: "Albums",
      id: 1,
      onClick: () => {
        setToDisplay(albumList);
        setActiveTab(1);
      }
    },
    { 
      label: "Activity",
      id: 2,
      onClick: () => {}
    },
  ]
  const userInfo = {
    username: router.query.username as string,
    realName: "Harry Stuart",
    pfp: "https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048",
    description: "This is all about war, mate and if you even happen to believe otherwise, loike, loike fucking shoot ye loike",
    followers: 910,
    following: 20,
    albums: 20
  }

  return (
    <div className='w-full h-full text-white max-w-2xl'>
      <Description
          information={{ posts: 250, albums: userInfo.albums }}
          profile={true}
          follow={{ followers: userInfo.followers, following: userInfo.following }}
          text={{ title: userInfo.username, realName: userInfo.realName, description: userInfo.description }}
          thumbnail={userInfo.pfp}
      />
      <div className="flex flex-row mt-10">
        <nav className='flex flex-row mx-auto justify-between w-full pt-2'>
            {tabs.map((tab, i) => (
              <div
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'border-b' : 'border-none'} cursor-pointer uppercase hover:bg-slate-700/30 px-5 py-2 duration-100`}
                onClick={() => tab.onClick()}
              >
                {tab.label}
              </div>
            ))}
        </nav>
      </div>
      <div>
        <GridDisplay list={toDisplay} />
      </div>
    </div>
  )
}

export default User;