import React from 'react'

function Photos({ list }: { list: string[] | any[] }) {

  const Item = ({ item }: { item: any | string }) => {
    const post = typeof(item) === 'string';

    return (
      <div className='relative group cursor-pointer'>
        <img className='object-cover w-52 h-52' src={post ? item : item.thumbnail!} alt="Something" />
        <div className='absolute w-full h-full group-hover:bg-black/20 top-0 duration-75'></div>
        { !post ?
          <div className='absolute bottom-0 bg-black/70 w-full text-center py-1'>
            <div className='font-bold text-lg'>{item.title}</div>
            <div className='text-gray-400 text-sm'><strong>{item.photos}</strong> photos</div>
          </div> : 
          <div className='absolute top-0 left-0 right-0 bottom-0 m-auto hidden group-hover:block'>
            <div>Shtory bud?</div>
          </div>
        }
      </div>
    )
  }

  return (
    <div aria-label='photo-stream' className='mt-5'>
        <ul className="grid grid-cols-3 gap-5">
            { list.map((p, i) => <Item key={i} item={p} />) }
        </ul>
    </div>
  )
}

export default Photos