import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useState } from 'react'

const Sidebar: NextPage = () => {
  const [pages, setPages] = useState<string[]>(["home", "explore", "notifications", "map", "profile"]);

  const Page = ({ page }: { page: string }) => {
    const router = useRouter();
    const path = router.pathname.split('/').filter(Boolean);
    const bold = path[0] === page;

    return (
      <a href={"/" + page} className="flex items-center p-2 text-white hover:text-gray-300 bg-contain rounded-2xl hover:bg-gray-700 duration-75">
        <span className={`ml-3 ${bold && "font-bold"} capitalize`}>{page}</span>
      </a>
    )
  }

  return (
    <div className='h-screen border-r border-r-gray-700'>
        <aside className="w-64" aria-label="Sidebar">
            <div className="py-4 px-3 text-black font-normal text-xl space-y-2">
                  { pages.map((p, i) => <Page key={i} page={p} />) }
            </div>
        </aside>
    </div>
  )
}

export default Sidebar
