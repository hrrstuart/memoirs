import { useRouter } from 'next/router';
import React from 'react';

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
        <section className="inline-block max-w-md">{userInfo.description}</section>
      </div>
    </div>
  )
}

function User() {
  const router = useRouter();
  const userInfo = {
    username: router.query.username,
    realName: "Harry Stuart",
    pfp: "https://media.gettyimages.com/photos/picture-taken-07-october-2004-shows-google-founders-sergey-brin-and-picture-id76737519?s=2048x2048",
    description: "This is all about war, mate and if you even happen to believe otherwise, loike, I'll loike fucking shoot ye loike",
    followers: 910,
    following: 20,
    albums: 20
  }

  return (
    <div className='w-full h-full text-white'>
      <UserDescription userInfo={userInfo} />
      <div className="flex flex-row mt-5 border-t">
        <nav className='flex flex-row mx-auto justify-between w-full pt-2'>
          <a className='uppercase hover:bg-slate-700 rounded-xl px-5 py-2 duration-100' href="/hrrstuart">Photos</a>
          <a className='uppercase hover:bg-slate-700 rounded-xl px-5 py-2 duration-100' href="/hrrstuart">Albums</a>
          <a className='uppercase hover:bg-slate-700 rounded-xl px-5 py-2 duration-100' href="/hrrstuart">Tagged</a>
        </nav>
      </div>
      <div>
        {/* Posts */}
      </div>
    </div>
  )
}

export default User;