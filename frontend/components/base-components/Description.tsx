import React from 'react'

function Description(props: {
    thumbnail: string;
    profile: boolean;
    follow?: {
        following: number;
        followers: number;
    }
    text: {
        title: string;
        realName?: string;
        description?: string;
    };
    information: {
        posts: number;
        albums?: number;
    }
}) {
  const FollowingOrContributers = () => {
    return props.follow?.followers ?
        <>
          <div><strong>{props.follow.followers}</strong> Followers</div>
          <div><strong>{props.follow.following}</strong> Following</div>
        </> :
        <div><strong>29</strong> contributers</div>
  }

  return (
    <div className='flex flex-col space-y-5'>
        <div className='flex flex-col md:flex-row'>
            <div className='w-52 mx-auto rounded-full'>
              <img className='h-52 w-52 object-cover rounded-full' src={props.thumbnail} alt="Something" />
            </div>
            <div className='text-white max-w-[60%] pl-5 mx-auto md:mx-0'>
              <h1 className='text-3xl font-bold text-center md:text-left'>{props.text.title}</h1>
              { props.text.realName && <h3 className='text-gray-300 text-lg pb-1 text-center md:text-left'>{props.text.realName}</h3> }
              <p className='pb-5'>{props.text.description}</p>
              { props.follow && <button className='bg-blue-600 text-center rounded-lg px-5 py-2 text-xl'>Follow</button> }
            </div>
        </div>
        <div className="flex flex-row justify-center space-x-5">
          <FollowingOrContributers />
          <div><strong>{ props.information.posts }</strong> posts</div>
          { props.information.albums && <div><strong>{ props.information.albums }</strong> albums</div> }
        </div>
    </div>
  )
}

export default Description