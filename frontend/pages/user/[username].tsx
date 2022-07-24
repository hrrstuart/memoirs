import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Photos from '../../components/profile/Photos';

function UserDescription({ userInfo }: { userInfo: any }) {
  return (
    <div className="flex flex-col space-y-8">
      <div className='flex flex-row space-x-12'>
        <img src={userInfo.pfp} alt="s" className="h-32 w-32 object-cover rounded-full left-0" />
        <div className="flex flex-col">
          <h1 className='text-3xl font-bold'>{userInfo.username}</h1>
          <h4 className='mb-3'>{userInfo.realName}</h4>
          <button className='bg-blue-600 rounded-lg px-5 py-2 text-xl w-40'>Follow</button>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="flex flex-row space-x-4">
          <div><strong>{userInfo.followers}</strong> Followers</div>
          <div><strong>{userInfo.following}</strong> Following</div>
          <div><strong>{userInfo.albums}</strong> Albums</div>
        </div>
        <section className="inline-block break-words">{userInfo.description}</section>
      </div>
    </div>
  )
}

function User() {
  
  // Sample photo list
  const photoList = [
    "https://media.gettyimages.com/photos/group-of-young-people-having-water-fight-in-field-laughing-picture-id200250724-002",
    "https://media.gettyimages.com/photos/spy-satellite-orbiting-earth-nasa-public-domain-imagery-picture-id1201649930?s=2048x2048",
    "https://media.gettyimages.com/photos/uschi-glas-dieter-hermann-and-heidi-kranz-attend-the-bild-place-to-b-picture-id462960080?s=2048x2048",
    "https://media.gettyimages.com/photos/van-halen-having-a-crazy-party-eating-hamburgers-and-potatoes-tokyo-picture-id593327617?s=2048x2048"
  ];

  // Sample album list
  const albumList = [
    { thumbnail: "https://media.gettyimages.com/photos/tourist-visiting-spain-picture-id895081824?s=2048x2048", title: "Holiday to Marbella", photos: 123 },
    { thumbnail: "https://media.gettyimages.com/photos/man-workout-in-gym-picture-id1070755212?s=2048x2048", title: "Gym Progress", photos: 21 },
    { thumbnail: "https://media.gettyimages.com/photos/young-woman-taking-selfie-with-family-and-friends-picture-id1176848423?s=2048x2048", title: "Family get-together 2022", photos: 151 },
    { thumbnail: "https://media.gettyimages.com/photos/festival-freedom-picture-id647232094?s=2048x2048", title: "Longitude 2k22", photos: 2022 },
    { thumbnail: "https://media.gettyimages.com/photos/empty-classroom-during-covid19-pandemic-picture-id1282723854?s=2048x2048", title: "Transition Year", photos: 518 },
    { thumbnail: "https://media.gettyimages.com/photos/colorful-aurora-borealis-picture-id1049922746?s=2048x2048", title: "Iceland trip", photos: 191 },
  ]
  const router = useRouter();
  const [toDisplay, setToDisplay] = useState<string[] | any[]>(photoList);

  const userInfo = {
    username: router.query.username,
    realName: "Harry Stuart",
    pfp: "https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048",
    description: "This is all about war, mate and if you even happen to believe otherwise, loike, loike fucking shoot ye loike",
    followers: 910,
    following: 20,
    albums: 20
  }

  return (
    <div className='w-full h-full text-white max-w-2xl'>
      <UserDescription userInfo={userInfo} />
      <div className="flex flex-row mt-5 border-t">
        <nav className='flex flex-row mx-auto justify-between w-full pt-2'>
          <button onClick={() => setToDisplay(photoList)} className='uppercase hover:bg-slate-700 rounded-xl px-5 py-2 duration-100'>Photos</button>
          <button onClick={() => setToDisplay(albumList)} className='uppercase hover:bg-slate-700 rounded-xl px-5 py-2 duration-100'>Albums</button>
          <button className='uppercase hover:bg-slate-700 rounded-xl px-5 py-2 duration-100'>Activity</button>
        </nav>
      </div>
      <div>
        <Photos list={toDisplay} />
      </div>
    </div>
  )
}

export default User;