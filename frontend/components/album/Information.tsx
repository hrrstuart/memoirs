import React from 'react'
import { IAlbum } from '../../util/types/albums/album';

function Information({ album }: { album: IAlbum }) {
  return (
    <div>
        <div className='p-1 w-52 mx-auto bg-gradient-to-tr from-red-700 to-yellow-400 rounded-full'>
            <img className='h-52 w-52 object-cover rounded-full' src={album.posts[0]!.image} alt="Something" />
        </div>
        <div className='text-white text-3xl font-bold pt-5 text-center'>
            <h1>{album.information.title}</h1>
        </div>
        <div className="text-white">
            <h1>{album.information.description}</h1>
        </div>
        {/* Contributers: list of all users who have a photo in the album */}
        <div>

        </div>
    </div>
  )
}

export default Information;