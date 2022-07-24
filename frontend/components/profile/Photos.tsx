import React from 'react'

function Photos() {
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
            { albumList.map((p, i) => <Item key={i} item={p} />) }
        </ul>
    </div>
  )
}

export default Photos