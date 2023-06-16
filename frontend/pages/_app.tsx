import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const noSidebarRoutes = ['/login'];
  const shouldRenderSidebar = !noSidebarRoutes.includes(router.pathname);

  return (
    <>
      <Head>
        <title>Atorus</title>
        <meta name="description" content="Bring you and your friends' photos together." />
      </Head>
      <div className='bg-[#111111] flex flex-col min-h-screen'>
        <main className='flex flex-grow flex-row'>
          { shouldRenderSidebar &&
            <div className='h-screen sticky top-0 hidden md:block lg:ml-32'>
              <Sidebar />          
            </div>
          }
          <div className='mx-auto p-5'>
            <Component {...pageProps} />
          </div>
        </main>
        <div id="portal"></div>
      </div>
    </>
  );
}

export default MyApp
